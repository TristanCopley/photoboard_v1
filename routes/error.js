let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {

    res.render('error/404', { title: 'error' });

});


module.exports = router;