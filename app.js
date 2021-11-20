const express = require('express');
var app = express();

const path = require('path');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const flash = require('express-flash');
const session = require('express-session')
const bcrypt = require('bcrypt')
const passport = require('passport')
const dotenv = require('dotenv').config()
const methodOverride = require('method-override')
const multer = require("multer")
const nodemailer = require("nodemailer")
const fs = require("fs");

const users = []

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '/public/')));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs', {
    name: ''
  })
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  var errorString = ''
  try {
    if (req.body.password != req.body.confirmPassword) {
      console.log("passwords didnt match")
      errorString = 'Please enter matching passwords'
      throw ('error')
    }
    for (i = 0; i < users.length; ++i) {
      if (req.body.email == users[i].email) {
        errorString = "An account with that email already exists"
        throw "error"
      }
    }
    uid = Math.floor(100000 + Math.random() * 900000)
    for (i = 0; i < users.length; ++i) {
      if (uid == users[i].id) {
        uid = Math.floor(100000 + Math.random() * 900000)
      }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: uid,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    var message = {
      from: userEmail,
      to: req.body.email,
      subject: "Thanks for signing up!",
      text: ":)",
    };

    transport.sendMail(message, function(err) {
      if (err) {
        console.log("there was an error", err);
        res.send("there was an error sending your message ")
        return;
      }
      console.log("email sent");
    });

    res.redirect('/login')
    console.log(users)

  } catch (e) {
    console.log("error caught")
    res.render('register.ejs', {
      name: errorString
    })
  }
})

app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


// set the destination multer sends files to as the uploads folder 	
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "uploads")
  },
  filename: function(req, file, cb) {
    // with multiple users file.fieldname will be replaced with each user's
    // unique username inorder to seperate one user's file from the next.
    cb(null, req.user.id + "-" + Date.now() + "-" + file.originalname)
  }
})

// Define the maximum size for uploading
// we choose 10 MB arbitrarly 
const maxSize = 1 * 1000 * 1000 * 10;

var upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  }, //10 MB max size
  fileFilter: function(req, file, cb) {

    // Set the filetypes a user can upload, this can be tweaked as necessary
    var filetypes = /pdf|png|jpg|jpeg/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(
      file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the " +
      "following filetypes - " + filetypes);

  }

  // userDoc is the name of file attribute
}).array("userDoc");


// gets homepage of site, alos the page to upload docs
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', {
    name: req.user.name
  })
})

// after a doc is uploaded this get is called 
app.get('/redirect', checkAuthenticated, (req, res) => {
  res.render('redirect.ejs', {
    name: req.user.name
  })
})

// once a user clicks submit when uploading a file this post method is called which 
// subsequently calls the multer function upload() to save file to upload folder
app.post('/uploadFile', checkAuthenticated, (req, res, next) => {
  // Error MiddleWare for multer file upload, so if any
  // error occurs, the file wont be uploaded
  upload(req, res, function(err) {
    if (err) {
      // ERROR occured (here it can be occured due
      // to uploading image of size greater than
      // 10MB or uploading different file type)
      res.send(err);
    } else {
      // SUCCESS, image successfully uploaded
      // render redirect page
      res.redirect(301, 'redirect');
    }
  })
})

var userEmail = 'testusersd4353@gmail.com'
var pass = 'xxxx'

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: userEmail,
    pass: pass // get this password from the peer evaluation sheet we turned in 
  }
});

// gets user request to render email page
app.get('/email', checkAuthenticated, async function(req, res) {

  let directory_name = "uploads";

  // Function to get current filenames
  // in directory
  let filenames = fs.readdirSync(directory_name);
  var arr = [];
  var uid = req.user.id;

  console.log("\nFilenames in directory:");
  for (i = 0; i < filenames.length; ++i) {
    console.log("File:", filenames[i]);
    if (filenames[i] == ".DS_Store") {
      continue;
    }
    if (filenames[i].substr(0, 6) == uid) {
      console.log(filenames[i].substr(0, 6), uid, "User's document")
      arr.push(filenames[i])
    }

  }
  // first we figure out which files are in the uploads directory then 
  // display them on the page allowing the user to select one file to send 
  res.render('email', {
    fileArr: arr,
    name: req.user.name
  });
});

// post called once the user clicks the submit email button, creates new nodemialer email 
// and sends it to the desired email address
app.post("/sendEmail", checkAuthenticated, (req, res) => {
  var pathstring = req.body.radioFile;
  console.log(req.body);
  var message = {
    from: userEmail,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.body,
    attachments: [{
      path: path.join("uploads/" + pathstring.trim())
    }]
  };

  transport.sendMail(message, function(err) {
    if (err) {
      console.log("there was an error", err);
      res.send("there was an error sending your message ")
      return;
    }
    console.log("email sent");
    res.redirect(301, "redirectEmail")
  });
});

// called after send email is sent
app.get("/redirectEmail", checkAuthenticated, function(req, res) {
  res.render("redirectEmail", {
    name: req.user.name
  });
})

app.get('/download', checkAuthenticated, async function(req, res, next) {

  let directory_name = "uploads";

  // Function to get current filenames
  // in directory
  let filenames = fs.readdirSync(directory_name);
  var arr = [];
  uid = req.user.id;
  console.log("\nFilenames in directory:");
  for (i = 0; i < filenames.length; ++i) {
    console.log("File:", filenames[i]);

    if (filenames[i] == ".DS_Store") {
      continue;
    }
    if (filenames[i].substr(0, 6) == uid) {
      console.log(filenames[i].substr(0, 6), uid, "User's document")
      arr.push(filenames[i])
    }
  }
  // first we get all files in directory (Except D.S_Store file) then send them to the 
  // download.ejs file to display
  res.render('download', {
    fileArr: arr,
    name: req.user.name
  });
});

// when a user clicks a file link this function is called and the file they
// requested is downloaded on download page 
app.get("/download/:file", (req, res) => {
  res.download(
    path.join(__dirname, "uploads/" + req.params.file),
    (err) => {
      if (err) res.status(404).send("<h1>Not found: 404</h1>");
    }
  );
});

app.listen(8080, function(error) {
  if (error) throw error
  console.log("Server created Successfully on PORT 8080")
})

module.exports = app;