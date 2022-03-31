const express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
let { users } = require('../mockDB.js'); // Where db should be
const { tokenCreate, createLoginCookie, loginWithCookie } = require("../utils");

/* Render Login page */
router.get('/', async function(req, res) {

  loginWithCookie(users, req, res).then(() => {}).catch(() => {

    res.render('login-signup/login', { title: 'Log in to Photoboard'});

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

      req.session.user = user;

      console.log(user)

      // Sets session token on login
      tokenCreate(req);

      createLoginCookie(user, req, res);

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
