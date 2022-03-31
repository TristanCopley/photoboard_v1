const express = require('express');
const bcrypt = require('bcrypt');
const env = require('../environment');
const jwt = require('jsonwebtoken');
let router = express.Router();
let { users } = require('../mockDB.js'); // Where db should be
const { tokenCreate } = require("../utils");

/* Render Login page */
router.get('/', function(req, res) {

  res.render('login-signup/login', {

    title: 'Log in to Photoboard',
    populateEmail: req.body.email,
    populatePassword: req.body.password

  });

});

router.post('/', async function(req, res) {

  const user = users.find(user => user.email === req.body.email);

  if( user === undefined ) {

    return res.render('login-signup/login', {

      title: 'Log in to Photoboard',
      login_error: 'Incorrect email or password.',
      populateEmail: req.body.email,
      populatePassword: req.body.password,
      emailColor: 'red',
      passwordColor: 'red'

    });

  }

  try {

    if(await bcrypt.compare(req.body.password, user.password)) {

      // Sets session token on login
      tokenCreate(req);

      res.cookie('important', 3, { maxAge: 900000, httpOnly: true })

      if ( user.classCode[0] === 'admin') {

        return res.redirect('/admin/classes/') // Send to admin page

      } else {

        return res.redirect('/student/') // Send to student page

      }

    }

    else {

      return res.render('login-signup/login', {

        title: 'Log in to Photoboard',
        login_error: 'Incorrect email or password.',
        populateEmail: req.body.email,
        populatePassword: req.body.password,
        emailColor: 'red',
        passwordColor: 'red'

      });

    }

  } catch {

    return res.render('login-signup/login', {

      title: 'Log in to Photoboard',
      login_error: 'Failed login. Try again.',
      populateEmail: req.body.email,
      populatePassword: req.body.password

    });

  }


})

module.exports = router;
