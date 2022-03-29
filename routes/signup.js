let express = require('express');
const bcrypt = require("bcrypt");
let router = express.Router();
let users = require('../mockDB.js'); // Where db should be

/* GET users listing. */
router.get('/', function(req, res) {

  res.render('login-signup/signup', {

    title: 'Join Photoboard'

  });

});

router.post('/', async (req, res) => {

  // Guard Clause

  if(

      !(req.body.firstName.length > 1 &&
      req.body.lastName.length > 1 &&
      req.body.email.length === 7 &&
      req.body.password.length > 3 &&
      req.body.confirmPassword === req.body.password)

  ) return res.render('login-signup/signup', {

      title: 'Join Photoboard',
      signup_error: 'One or more invalid forms.',
      firstNameColor: 'red' // For example

    });

  try {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let user = {

      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      classCode: req.body.classCode

    };

    users.push(user)

    return res.redirect('/');

  } catch {

    return res.render('login-signup/signup', {

      title: 'Join Photoboard',
      signup_error: 'An error occurred while creating account. Please try again.'

    });

  }

});

module.exports = router;

// Unused file so far // Some of this code was refactored from a previous project so code might be out of place potentially until we write more