const express = require("express")
const router = express.Router()

const path = require('path');
const fs = require("fs");
var open = require('open');

var url = require('url');


const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")

var numberOfFiles = require('../functions/getNumFiles')
var getUploads = require('../functions/getUploads')


router.get('/', checkAuthenticated, async function (req, res, next) {

  console.log(numberOfFiles(req.user.id))
  var arr = getUploads(req.user.id)

  console.log(arr)
  // first we get all files in directory (Except D.S_Store file) then send them to the 
  // download.ejs file to display
  res.render('manage', {
    fileArr: arr,
    name: req.user.name,
  });
});

// when a user clicks a file link this function is called and the file they
// requested is downloaded on download page 
router.get("/download/:file", checkAuthenticated, (req, res) => {
  console.log(req.params.file)
  res.download(
    path.join("uploads/" + req.params.file),
    (err) => {
      if (err) res.status(404).send("<h1>Not found: 404 my error</h1>");
    }
  );
});

router.get("/delete/:file", checkAuthenticated, (req, res) => {
  pathToFile = path.join("uploads/" + req.params.file)
  fs.unlink(pathToFile, function (err) {
    if (err) {
      throw err
    } else {
      console.log("Successfully deleted the file.")
      res.redirect(303, '/manage')
    }
  })
});

router.get("/open", checkAuthenticated, (req, res) => {
  var fileToOpen = url.parse(req.url, true).query
  
  const filepath = path.join("uploads/" + fileToOpen.file.toString())
  
  if (fs.existsSync(filepath)) {
    fs.createReadStream(filepath).pipe(res)
  } else {
    res.status(500)
    console.log('File not found')
    res.send('File not found')
  }
  
});

//when user clicks a file link this function will allow the user to view 
//the file in a pdf viewer to view the document
router.get("/view/:file", checkAuthenticated, (req, res) => {
    open('http://localhost:8080/manage/open?file=' + req.params.file, 'browser')
    res.redirect('/manage')
});


module.exports = router, { getUploads, numberOfFiles }
