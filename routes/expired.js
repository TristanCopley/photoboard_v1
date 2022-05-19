let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {

    res.render('expired/expired', { title: 'expired' });

});


module.exports = router;