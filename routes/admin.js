let express = require('express');
let router = express.Router();

router.get('/classes/', function(req, res) {

    res.render('admin/classes', { title: 'Classes' });

});

router.get('/', function(req, res) {

    res.render('admin/channel', { title: 'Admin view' });

});

module.exports = router;

// Unused file so far // Some of this code was refactored from a previous project so code might be out of place potentially until we write more