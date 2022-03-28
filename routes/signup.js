let express = require('express');
const bcrypt = require("bcrypt");
let router = express.Router();
let users = require('../mockDB.js'); // Where db should be

/* GET users listing. */
router.get('/', function(req, res) {

  res.render('login-signup/signup', { title: 'Join Photoboard' });

});

router.post('/signup', async (req, res) => {

  console.log(req.body)

  try {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let user = {

      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      classCode: req.body.classCode

    };

    users.push(user)

    console.log(user);

    console.log(users)

    res.redirect('/');

  } catch {

    res.status(500).send();

  }

});

module.exports = router;

// Unused file so far // Some of this code was refactored from a previous project so code might be out of place potentially until we write more