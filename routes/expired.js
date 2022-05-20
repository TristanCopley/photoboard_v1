let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {

    res.render('error/expired', { title: 'expired' });

});


module.exports = router;