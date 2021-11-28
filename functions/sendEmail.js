const path = require('path');
const nodemailer = require("nodemailer")
const fs = require("fs");

var userEmail = 'testusersd4353@gmail.com'
var pass = 'fxqxadqojxnptkuq'

var transport = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: userEmail,
       pass: pass // get this password from the peer evaluation sheet we turned in 
     }
   });

function sendMail(req) {
     var pathstring = req.body.checkedFile;
     var dynamicAttachments = [];
     console.log(pathstring)
     if (pathstring == undefined) {

          var message = {
               from: userEmail,
               to: req.body.to,
               subject: req.user.name +" says: "+ req.body.subject,
               text: req.body.body,
          };
     }

     else if (pathstring[0].length == 1) {

          var message = {
               from: userEmail,
               to: req.body.to,
               subject: req.user.name +" says: "+ req.body.subject,
               text: req.body.body,
               attachments: [
                    {
                         path: path.join("uploads/" + req.body.checkedFile.trim())
                    }
               ]
          };
     }

     else {
          for (i = 0; i < pathstring.length; ++i) {
               pathstring[i] = path.join("uploads/" + pathstring[i].trim())
               dynamicAttachments.push(
                    {
                         path: pathstring[i]
                    }
               )
          }
          var message = {
               from: userEmail,
               to: req.body.to,
               subject: req.user.name + req.body.subject,
               text: req.body.body,
               attachments: dynamicAttachments
          };
     }

     transport.sendMail(message, function (err) {
          if (err) {
               console.log("there was an error", err);
               res.send("there was an error sending your message ")
               return;
          }
          console.log("email sent");
     })
     return message;
}
module.exports = sendMail