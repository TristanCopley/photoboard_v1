const express = require('express');
let router = express.Router();

router.get('/class/:classCode', async (req, res) => {

    res.render('student/channel', { title: 'Photoboard Classroom'});

});

module.exports = router;