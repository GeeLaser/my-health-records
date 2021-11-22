const express = require("express")
const router = express.Router()

const path = require('path');
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const fs = require("fs");


const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")


router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs', {name: ''})
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
  
  router.post('/', checkNotAuthenticated, async (req, res) => {
    var errorString = '';
    try {
      if (req.body.password != req.body.confirmPassword) {
        console.log("passwords didnt match")
        errorString = 'Please enter matching passwords'
        throw ('error')
      }
      for (i = 0; i < users.length; ++i) {
        if (req.body.email == global.users[i].email) {
          errorString = "An account with that email already exists"
          throw "error"
        }
      }
      uid = Math.floor(100000 + Math.random() * 900000)
      for (i = 0; i < users.length; ++i) {
        if (uid == global.users[i].id) {
          uid = Math.floor(100000 + Math.random() * 900000)
          i = 0
        }
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      global.users.push({
        id: uid,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      var textBody = `Hi ${req.body.name}, we hope you enjoy using our application. \r\n\r\n -The MHR team`
  
    var message = {
        from: userEmail,
        to: req.body.email,
        subject: "Thanks for signing up for my health records!",
        text: textBody ,
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
      console.log(global.users)
  
    } catch (e) {
      console.log("error caught", e)
      res.render('register.ejs', {
        name: errorString
      })
    }
  })
  
  

  module.exports = router