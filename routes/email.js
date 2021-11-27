const express = require("express")
const router = express.Router()


const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")

var numberOfFiles = require('../functions/getNumFiles')
var getUploads = require('../functions/getUploads')
var sendEmail = require('../functions/sendEmail')


// gets user request to render email page
router.get('/', checkAuthenticated, async function (req, res) {
  var arr = getUploads(req.user.id)
  // first we figure out which files are in the uploads directory then 
  // display them on the page allowing the user to select one file to send 
  res.render('email', {
    fileArr: arr,
    name: req.user.name
  });
});

// post called once the user clicks the submit email button, creates new nodemialer email 
// and sends it to the desired email address
router.post("/sendEmail", checkAuthenticated, (req, res) => {
  console.log(req)
  var message = sendEmail(req.body)

  res.redirect(301, "redirectEmail")
});

// called after send email is sent
router.get("/redirectEmail", checkAuthenticated, function (req, res) {
  res.render("redirectEmail", {
    name: req.user.name
  });
})

module.exports = router