const express = require("express")
const router = express.Router()

const path = require('path');
const fs = require("fs");

const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")

var numberOfFiles = require('../functions/getNumFiles')
var getUploads = require('../functions/getUploads')


  router.get('/', checkAuthenticated, async function(req, res, next) {

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
  router.get("/download/:file", (req, res) => { 
    console.log(req.params.file)
    res.download(
      path.join("uploads/" + req.params.file),
      (err) => {
        if (err) res.status(404).send("<h1>Not found: 404 my error</h1>");
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

  //when user clicks a file link this function will allow the user to view 
  //the file in a pdf viewer to view the document
  router.get("/view/:file", (req, res) => {

    //res.render("uploads/" + req.params.file)

    var myState = {
      pdf: null,
      currentPage: 1,
      zoom: 1
  }

  pdfjsLib.getDocument('./my_document.pdf').then((pdf) => {

      myState.pdf = pdf;
      render();

  });

  function render() {
      myState.pdf.getPage(myState.currentPage).then((page) => {
    
          var canvas = document.getElementById("pdf_renderer");
          var ctx = canvas.getContext('2d');

          var viewport = page.getViewport(myState.zoom);

          canvas.width = viewport.width;
          canvas.height = viewport.height;
    
          page.render({
              canvasContext: ctx,
              viewport: viewport
          });
      });
  }
  });

  
  module.exports = router, {getUploads, numberOfFiles}
