const express = require("express")
const router = express.Router()

const path = require('path');
const nodemailer = require("nodemailer")
const fs = require("fs");


const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")

var userEmail = 'testusersd4353@gmail.com'
var pass = 'Remember1!'

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: userEmail,
    pass: pass // get this password from the peer evaluation sheet we turned in 
  }
});

// gets user request to render email page
router.get('/', checkAuthenticated, async function(req, res) {

  let directory_name = "uploads";

  // Function to get current filenames
  // in directory
  let filenames = fs.readdirSync(directory_name);
  var arr = [];
  var uid = req.user.id;

  for (i = 0; i < filenames.length; ++i) {
    if (filenames[i] == ".DS_Store") {
      continue;
    }
    if (filenames[i].substr(0, 6) == uid) {
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
router.post("/sendEmail", checkAuthenticated, (req, res) => {
  var pathstring = req.body.checkedFile;
  console.log(pathstring[0].length)
  var dynamicAttachments = [];

if(pathstring[0].length == 1) {

    var message = {
        from: userEmail,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
        attachments: [
            {
                path: path.join("uploads/" + req.body.checkedFile.trim())
            }
        ]
    };
}
  
else {
    for(i = 0; i < pathstring.length; ++i) {
        pathstring[i] =  path.join("uploads/" + pathstring[i].trim())
        dynamicAttachments.push(
            {
                path: pathstring[i]
            }
        )
    }
    var message = {
        from: userEmail,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
        attachments: dynamicAttachments
    };
}

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
router.get("/redirectEmail", checkAuthenticated, function(req, res) {
  res.render("redirectEmail", {
    name: req.user.name
  });
})

module.exports = router