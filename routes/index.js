const express = require("express")
const checkAuthenticated = require("../functions/checkAuth")
const router = express.Router()

router.get('/', checkAuthenticated, (req, res) => {
  console.log(req.body)
    res.render('index', {name: req.user.name})
  })

  module.exports = router