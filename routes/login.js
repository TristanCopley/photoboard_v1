let express = require('express');
let router = express.Router();

/* Login page */
router.get('/', function(req, res) {

  res.render('login-signup/login');

});

module.exports = router;
