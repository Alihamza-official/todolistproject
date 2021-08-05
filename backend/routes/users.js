var express = require('express');
var router = express.Router();

var login = require('../actions/user/login.action');
var register = require('../actions/user/register.action');

// register user
router
  .route('/register')
  .post( register );

// login user
router
  .route('/login')
  .post( login );

module.exports = router;
