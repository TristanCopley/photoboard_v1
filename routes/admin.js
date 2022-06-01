const express = require('express');
const fs = require("fs");
const jwt = require("jsonwebtoken");
const {consoleMessage} = require("../util-dir/utils");
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

router.get('/classes', async (req, res) => {

    let Classes = [];

    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        fs.readFile(`./users/${payload.email}.txt`, 'utf8', async function(err, data){

            if(data === undefined) return res.render('login-signup/login', { title: 'Log in to Photoboard'});

            let user = JSON.parse(data);

            if(user.password !== payload.password) {

                return res.render('error/unauth');

            }

            let usrlen = user.classes.length;
            let x = 0;

            for (let Class of user.classes) {

                if (Class === 'admin') {x++;continue;}

                fs.readFile(`./classrooms/${Class}.txt`, 'utf8', function (err, data) {

                    if(data === undefined) return res.render('login-signup/login', { title: 'Log in to Photoboard'});

                    let ClassData = JSON.parse(data);

                    Classes.push({name: ClassData.name, period: ClassData.period, classCode: Class, bannerColor: ClassData.bannerColor});

                    x++;

                    if(x === usrlen) {

                        if(payload.auth === 'true') {

                            return res.render('admin/classes', {title: 'Class Dashboard', Classes: Classes});

                        } else {

                            return res.redirect('/student/class/' + Class)

                        }

                    }

                })
            }
        });

    }
    catch (error) {
        consoleMessage('Failed to log in with cookie', 'red');
        res.render('login-signup/login', { title: 'Log in to Photoboard'});
    }

});

router.get('/create', (req, res) => {

    res.render('login-signup/createClass', { title: 'Create class'});

});

router.post('/class/:classCode/announce', async (req, res) => {

    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        if(req.body.announcementTitle !== '' && req.body.announcementTitle !== undefined && req.body.announcementContent !== '' && req.body.announcementContent !== undefined && req.body.announcementContent.length < 2750 && req.body.announcementTitle.length < 500) {

            fs.readFile(`./classrooms/${req.params.classCode}.txt`, 'utf8', function (err, data) {

                if(data === undefined) return res.redirect('/');

                let ClassData = JSON.parse(data);

                fs.readFile(`./users/${payload.email}.txt`, 'utf8', function (err, data) {

                    if(data === undefined) return res.render('login-signup/login', { title: 'Log in to Photoboard'});

                    let user = JSON.parse(data);

                    if(user.password !== payload.password) {

                        return res.redirect('/');

                    }

                    let msgType = 'announcement'

                    if(req.body.assignmentSwitch) {

                        msgType = 'assignment'

                    }

                    ClassData.messages.unshift(
                        {
                            author: user.firstName + " " + user.lastName,
                            title: req.body.announcementTitle,
                            content: req.body.announcementContent,
                            comments: [],
                            date: new Date(parseInt(Date.now())).toDateString(),
                            id:  Math.round(Date.now()) + 'x' + Math.round(Math.random() * 999),
                            type: msgType
                        }
                    )

                    fs.writeFile(`./classrooms/${req.params.classCode}.txt`, JSON.stringify(ClassData), function(err, data){});

                    return res.redirect('/admin/class/' + req.params.classCode);

                });

            });

        } else {

            return res.redirect('/admin/class/' + req.params.classCode);

        }

    } catch(e) {

        return res.redirect('/admin/class/' + req.params.classCode)

    }

});

router.post('/class/:classCode/comment/:messageid', async (req, res) => {

    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        if(req.body.comment !== '' && req.body.comment !== undefined && req.body.comment.length < 1500) {

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

        } else {

            return res.redirect('/admin/class/' + req.params.classCode)

        }

    } catch(e) {

        return res.redirect('/admin/class/' + req.params.classCode)

    }

});

module.exports = router;