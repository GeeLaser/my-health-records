const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const fs = require("fs");


var userEmail = 'testusersd4353@gmail.com'
var pass = 'xxxx'

var transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: userEmail,
		pass: pass	// get this password from the peer evaluation sheet we turned in 
	}
});

// gets user request to render email page
router.get('/', async function(req, res)
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
router.post("/sendEmail", (req, res) => {
	var pathstring = req.body.radioFile;
	console.log(req.body);
	var message = {
		from: userEmail,
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.body,
		attachments: [
			{
				path: path.join("uploads/" + pathstring.trim())
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
router.get("/redirectEmail",function(req,res){
	res.render("redirectEmail");
})

module.exports = router