let express = require('express');
let router = express.Router();
let { classes } = require('../mockDB.js'); // Where db should be

router.get('/classes', function(req, res) {

    const Class = req.session.user;

    res.render('admin/classes', {

        title: 'Classes',
     /*   classes: classes*/

    });

});

router.get('/class/:class', function(req, res) {

    res.render('admin/channel', {
        title: 'Temporary'

    });

});

module.exports = router;

// Unused file so far // Some of this code was refactored from a previous project so code might be out of place potentially until we write more
