const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()
const fs = require("fs");

const { Sequelize, DataTypes } = require('sequelize');
const { QueryTypes } = require('sequelize');

var db = require('./routes/database');
	
// View Engine Setup
app.set("views",'./views')
app.set("view engine","ejs")

app.use(express.static(__dirname + '/public/'));
	
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
	
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Uploads is the Upload_folder_name
		cb(null, "uploads")
	},
	filename: function (req, file, cb) {
	    cb(null, file.fieldname + "-" + Date.now()+ "-" + file.originalname)
	}
})
	
// Define the maximum size for uploading
// picture i.e. 10 MB. it is optional
const maxSize = 1 * 1000 * 1000 * 10;
	
var upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function (req, file, cb){
	
		// Set the filetypes, it is optional
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

// mypic is the name of file attribute
}).array("userDoc");	


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

app.get('/database', async function(req, res, next) {
  
	var query = "SELECT * FROM documentData";
	var columnsObject;
  
	results = await executeQuery(query);
	console.log(results);
  
	res.render('database', { results: JSON.stringify(results) });
  
  });

app.get("/",function(req,res){
	res.render("index");
})

app.get("/redirect",function(req,res){
	res.render("redirect");
})
	
app.post("/uploadProfilePicture",function (req, res, next) {
		
	// Error MiddleWare for multer file upload, so if any
	// error occurs, the image would not be uploaded!
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
			res.render('redirect');
		}
	})
})

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

	res.render('download', { fileArr: arr });
});

/*app.get("/uploads/:file", (req, res) => {
	res.download(
	  path.join(__dirname, "uploads/" + req.params.file),
	  (err) => {
		if (err) res.status(404).send("<h1>Not found: 404</h1>");
	  }
	);
});*/
  
  
// Take any port number of your choice which
// is not taken by any other process
app.listen(8080,function(error) {
	if(error) throw error
		console.log("Server created Successfully on PORT 8080")
})

module.exports = app;
