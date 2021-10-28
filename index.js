const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()
const fs = require("fs");
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser');

const { Sequelize, DataTypes } = require('sequelize');
const { QueryTypes } = require('sequelize');

var db = require('./routes/database');

var userEmail = 'testusersd4353@gmail.com'

var transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: userEmail,
		pass: "Remember1!"	// note that this password would not be included in any  
							// public release of this application  but since we are 
							// in the classroom setting it is required
	}
});
	
// View Engine Setup
app.set("views",'./views') // ./views is the directory express will use for views
app.set("view engine","ejs") // we use ejs to create views

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: true })); 

// set the destination multer sends files to as the uploads folder 	
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Uploads is the Upload_folder_name
		cb(null, "uploads")
	},
	filename: function (req, file, cb) {
		// with multiple users file.fieldname will be replaced with each user's
		// unique username inorder to seperate one user's file from the next.
	    cb(null, file.fieldname + "-" + Date.now()+ "-" + file.originalname)
	}
})
	
// Define the maximum size for uploading
// we choose 10 MB arbitrarly 
const maxSize = 1 * 1000 * 1000 * 10;
	
var upload = multer({
	storage: storage,
	limits: { fileSize: maxSize }, //10 MB max size
	fileFilter: function (req, file, cb){
	
		// Set the filetypes a user can upload, this can be tweaked as necessary
		var filetypes = /pdf|png|jpg|jpeg/;
		var mimetype = filetypes.test(file.mimetype);

		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
		
		if (mimetype && extname) {
			return cb(null, true);
		}
	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes);
		
	}

// userDoc is the name of file attribute
}).array("userDoc");	

// pull from the DB, we are not useing this fuction in the current release
/*
async function executeQuery(query) {
	const results = await db.query(query, {
		logging: console.log,
		plain: false,
		raw: true,
		type: QueryTypes.SELECT
	});
  
	//console.log(results);
	console.log(JSON.stringify(results));
	return results;
}
*/

// get request for database page, we do not use this get currently 
/*
app.get('/database', async function(req, res, next) {
  
	var query = "SELECT * FROM documentData";
	var columnsObject;
  
	results = await executeQuery(query);
	console.log(results);
  
	res.render('database', { results: JSON.stringify(results) });
  
});
*/
// gets homepage of site, alos the page to upload docs
app.get("/",function(req,res){
	res.render("index");
})

// after a doc is uploaded this get is called 
app.get("/redirect",function(req,res){
	res.render("redirect");
})

// after an email is sent this get is called
app.get("/redirectEmail",function(req,res){
	res.render("redirectEmail");
})

// once a user clicks submit when uploading a file this post method is called which 
// subsequently calls the multer function upload() to save file to upload folder
app.post("/uploadFile",function (req, res, next) {
		
	// Error MiddleWare for multer file upload, so if any
	// error occurs, the file wont be uploaded
	upload(req,res,function(err) {

		if(err) {
			// ERROR occured (here it can be occured due
			// to uploading image of size greater than
			// 10MB or uploading different file type)
			res.send(err);
		}
		else {
			// SUCCESS, image successfully uploaded
			res.status(200);
			// render redirect page
			res.render('redirect');
		}
	})
})

// gets /download page
app.get('/download', async function(req, res, next) {
  
	let directory_name = "uploads";
  
	// Function to get current filenames
	// in directory
	let filenames = fs.readdirSync(directory_name);
	var arr = [];
	console.log("\nFilenames in directory:");
	for( i = 0; i < filenames.length; ++i) {
		console.log("File:", filenames[i]);
		if(filenames[i] == ".DS_Store") {
			continue;
		}
		arr.push(filenames[i])
	}
	// first we get all files in directory (Except D.S_Store file) then send them to the 
	// download.ejs file to display
	res.render('download', { fileArr: arr });
});

// when a user clicks a file link this function is called and the file they
// requested is downloaded 
app.get("/uploads/:file", (req, res) => {
	res.download(
	  path.join(__dirname, "uploads/" + req.params.file),
	  (err) => {
		if (err) res.status(404).send("<h1>Not found: 404</h1>");
	  }
	);
});

// gets user request to render email page
app.get('/email', async function(req, res)
{
	let directory_name = "uploads";
  
	// Function to get current filenames
	// in directory
	let filenames = fs.readdirSync(directory_name);
	var arr = [];
	console.log("\nFilenames in directory:");
	for( i = 0; i < filenames.length; ++i) {
		console.log("File:", filenames[i]);
		if(filenames[i] == ".DS_Store") {
			continue;
		}
		arr.push(filenames[i])
	}
	// first we figure out which files are in the uploads directory then 
	// display them on the page allowing the user to select one file to send 
	res.render('email', { fileArr: arr });
});
  
// post called once the user clicks the submit email button, creates new nodemialer email 
// and sends it to the desired email address
app.post("/sendEmail", (req, res) => {
	var pathstring = req.body.radioFile;
	console.log(req.body);
	var message = {
		from: userEmail,
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.body,
		attachments: [
			{
				path: path.join(__dirname, "uploads/" + pathstring.trim())
			}
		]
	};

	transport.sendMail(message, function(err) {
		if(err) {
			console.log("there was an error", err);
			res.send("there was an error sending your message ")
			return;
		}
		console.log("email sent");
		res.render("redirectEmail")
	});
});

// called after send email is sent
app.get("/redirectEmail",function(req,res){
	res.render("redirectEmail");
})

// Take any port number of your choice which
// is not taken by any other process
app.listen(8080,function(error) {
	if(error) throw error
		console.log("Server created Successfully on PORT 8080")
})

module.exports = app;
