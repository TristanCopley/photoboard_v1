let express = require('express');
let router = express.Router();

/* Render Login page */
router.get('/', function(req, res) {

  res.render('login-signup/login', { title: 'Log into Photoboard' });

});

router.post('/login', function(req, res) {

  // Get body properties, check hashed stuff with bcrypt yada yada
  res.render('admin/admin-channel', { title: 'Log into Photoboard' });

})

module.exports = router;
