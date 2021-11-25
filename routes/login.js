const express = require("express")
const router = express.Router()

const passport = require('passport')
const checkAuthenticated = require("../functions/checkAuth")
const checkNotAuthenticated = require("../functions/checkNotAuth")


const initializePassport = require('../passport-config')
initializePassport(
  passport,
  email => global.users.find(user => user.email === email),
  id => global.users.find(user => user.id === id)
)

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  module.exports = router