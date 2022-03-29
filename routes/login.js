const express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
let users = require('../mockDB.js'); // Where db should be

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

    return  res.render('login-signup/login', {

      title: 'Log in to Photoboard',
      login_error: 'Incorrect email or password.',
      populateEmail: req.body.email,
      populatePassword: req.body.password,
      emailColor: 'red',
      passwordColor: 'red'

    });

  }

  try {

    if( await bcrypt.compare(req.body.password, user.password) ) {

      res.render('admin/admin-channel', { title: 'admin'})

    }

    else {

      return  res.render('login-signup/login', {

        title: 'Log in to Photoboard',
        login_error: 'Incorrect email or password.',
        populateEmail: req.body.email,
        populatePassword: req.body.password,
        emailColor: 'red',
        passwordColor: 'red'

      });

    }

  } catch {

    return  res.render('login-signup/login', {

      title: 'Log in to Photoboard',
      login_error: 'Failed login. Try again.',
      populateEmail: req.body.email,
      populatePassword: req.body.password

    });

  }


})

module.exports = router;
