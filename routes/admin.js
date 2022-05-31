const express = require('express');
let router = express.Router();

router.get('/class/:classCode', async (req, res) => {

    let classCode = req.params.classCode;

    res.render('admin/channel', { title: 'Photoboard Classroom'});

});

module.exports = router;