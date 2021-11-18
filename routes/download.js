const express = require("express")
const router = express.Router()
const fs = require("fs");
const path = require("path")

router.get('/', async function(req, res, next) {
  
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
// requested is downloaded on download page 
router.get("/:file", (req, res) => {
	res.download(
	  path.join("uploads/" + req.params.file),
	  (err) => {
		if (err) res.status(404).send("<h1>Not found: 404</h1>");
	  }
	);
});

module.exports = router