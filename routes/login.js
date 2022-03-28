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

  if(user === undefined) {

    return  res.render('login-signup/login', { title: 'Log in to Photoboard', login_error: 'Incorrect username or password.' });

  }

  try {

    if(await bcrypt.compare(req.body.password, user.password)) {

      console.log('success');
      res.render('admin/admin-channel', { title: 'admin'})

    }

    else {

      res.render('login-signup/login', { title: 'Log in to Photoboard', login_error: 'Incorrect username or password.' });

    }

  } catch {

    res.render('login-signup/login', { title: 'Log in to Photoboard', login_error: 'Incorrect username or password.' });

  }


})

module.exports = router;
