const express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
let users = require('../mockDB.js'); // Where db should be

/* Render Login page */
router.get('/', function(req, res) {

  res.render('login-signup/login', { title: 'Log into Photoboard' });

});

router.post('/login', async function(req, res) {

  const user = users.find(user => user.username === req.body.username);

  if(user === undefined) {

    console.log('User not found');

  }

  try {

    if(await bcrypt.compare(req.body.password, user.password)) {

      console.log('success');

    }

    else {



    }

  } catch {

    res.status(500).send();

  }


})

module.exports = router;
