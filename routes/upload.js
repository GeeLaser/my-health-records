const express = require("express")
const router = express.Router()

const path = require('path');

const multer = require("multer")
const fs = require("fs");


const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")

// set the destination multer sends files to as the uploads folder 	
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // Uploads is the Upload_folder_name
      cb(null, "uploads")
    },
    filename: function(req, file, cb) {
      console.log(file)
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
  router.get('/', checkAuthenticated, (req, res) => {
    res.render('upload.ejs', {
      name: req.user.name
    })
  })
  
  // after a doc is uploaded this get is called 
  router.get('/redirectUpload', checkAuthenticated, (req, res) => {
    res.render('redirectUpload', {
      name: req.user.name
    })
  })
  
  // once a user clicks submit when uploading a file this post method is called which 
  // subsequently calls the multer function upload() to save file to upload folder
  router.post('/uploadFile', checkAuthenticated, (req, res, next) => {
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
        res.redirect(301, 'redirectUpload');
      }
    })
  })

  module.exports = router