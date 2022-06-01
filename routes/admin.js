const express = require('express');
const fs = require("fs");
const jwt = require("jsonwebtoken");
let router = express.Router();

router.get('/class/:classCode', async (req, res) => {

    let classCode = req.params.classCode;
    try{

        fs.readFile(`./classrooms/${classCode}.txt`, 'utf8', function (err, data) {

            if(data === undefined) return res.redirect('/')

            let ClassData = JSON.parse(data);

            return res.render('admin/channel', { title: 'Photoboard Classroom', Class: classCode, ClassData: ClassData});

        })

    } catch(e) {}

});

router.post('/class/:classCode/announce', async (req, res) => {

    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        if(req.body.announcement !== '' && req.body.announcement !== undefined) {

            fs.readFile(`./classrooms/${req.params.classCode}.txt`, 'utf8', function (err, data) {

                if(data === undefined) return res.redirect('/');

                let ClassData = JSON.parse(data);

                fs.readFile(`./users/${payload.email}.txt`, 'utf8', function (err, data) {

                    if(data === undefined) return res.render('login-signup/login', { title: 'Log in to Photoboard'});

                    let user = JSON.parse(data);

                    if(user.password !== payload.password) {

                        return res.redirect('/');

                    }

                    ClassData.messages.unshift(
                        {
                            author: user.firstName + " " + user.lastName,
                            title: 'Announcement!',
                            content: req.body.announcement,
                            comments: [],
                            date: new Date(parseInt(Date.now())).toDateString(),
                            id:  Math.round(Date.now()) + 'x' + Math.round(Math.random() * 999),
                            type: 'announcement'
                        }
                    )

                    fs.writeFile(`./classrooms/${req.params.classCode}.txt`, JSON.stringify(ClassData), function(err, data){});

                    return res.redirect('/admin/class/' + req.params.classCode);

                });

            });

        }

    } catch(e) {

        return res.redirect('/admin/class/' + req.params.classCode)

    }

});

router.post('/class/:classCode/comment/:messageid', async (req, res) => {

    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        if(req.body.comment !== '' && req.body.comment !== undefined) {

            fs.readFile(`./classrooms/${req.params.classCode}.txt`, 'utf8', function (err, data) {

                if(data === undefined) return res.redirect('/');

                let ClassData = JSON.parse(data);

                fs.readFile(`./users/${payload.email}.txt`, 'utf8', function (err, data) {

                    if(data === undefined) return res.render('login-signup/login', { title: 'Log in to Photoboard'});

                    let user = JSON.parse(data);

                    if(user.password !== payload.password) {

                        return res.redirect('/');

                    }

                    let MessageIndex = ClassData.messages.indexOf(ClassData.messages.find(message => message.id === req.params.messageid));

                    ClassData.messages[MessageIndex].comments.push({

                        author: user.firstName + ' ' + user.lastName,
                        content: req.body.comment

                    });

                    fs.writeFile(`./classrooms/${req.params.classCode}.txt`, JSON.stringify(ClassData), function(err, data){});

                    return res.redirect('/admin/class/' + req.params.classCode);

                });

            });

        }

    } catch(e) {

        return res.redirect('/admin/class/' + req.params.classCode)

    }

});

module.exports = router;