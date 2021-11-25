const express = require("express")
const router = express.Router()

const path = require('path');
const fs = require("fs");

const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")


  router.get('/', checkAuthenticated, async function(req, res, next) {

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
    res.render('manage', {
      fileArr: arr,
      name: req.user.name,
    });
  });
  
  // when a user clicks a file link this function is called and the file they
  // requested is downloaded on download page 
  router.get("/download/:file", (req, res) => { 
    res.download(
      path.join("uploads/" + req.params.file),
      (err) => {
        if (err) res.status(404).send("<h1>Not found: 404</h1>");
      }
    );
  });

  router.get("/delete/:file", (req, res) => {
    pathToFile = path.join("uploads/" + req.params.file)
    fs.unlink(pathToFile, function(err) {
        if (err) {
          throw err
        } else {
          console.log("Successfully deleted the file.")
          res.redirect(303, '/manage')
        }
      })
  });

  
  
  

  module.exports = router
