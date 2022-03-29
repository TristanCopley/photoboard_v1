const express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
let users = require('../mockDB.js'); // Where db should be

/* Render Login page */
router.get('/', function(req, res) {

  res.render('login-signup/login', { title: 'Log in to Photoboard' });

});

router.post('/login', async function(req, res) {

  const user = users.find(user => user.username === req.body.username);

  if( user === undefined ) {

    return  res.render('login-signup/login', {

      title: 'Log in to Photoboard',
      login_error: 'Incorrect username or password.',
      populateUsername: req.body.username,
      populatePassword: req.body.password,
      usernameColor: 'red',
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
        login_error: 'Incorrect username or password.',
        populateUsername: req.body.username,
        populatePassword: req.body.password,
        usernameColor: 'red',
        passwordColor: 'red'

      });

    }

  } catch {

    return  res.render('login-signup/login', {

      title: 'Log in to Photoboard',
      login_error: 'Failed login. Try again.',
      populateUsername: req.body.username,
      populatePassword: req.body.password

    });

  }


})

module.exports = router;
