let express = require('express');
let router = express.Router();

/* Login page */
router.get('/', function(req, res) {

  res.render('login-signup/login', { title: 'Log into Photoboard' });

});

module.exports = router;
