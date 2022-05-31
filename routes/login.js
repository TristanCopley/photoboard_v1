const express = require('express');
const {consoleMessage} = require("../utils");
const fs = require("fs");
const jwt = require('jsonwebtoken');
let router = express.Router();

/* Render Login page */
router.get('/', async (req, res) => {

    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        let Classes = [];

        fs.readFile(`./users/${payload.email}.txt`, 'utf8', async function(err, data){

            let user = JSON.parse(data);

            if(user.password !== payload.password) {

                return badLogin(req, res)

            }

            let usrlen = user.classes.length;
            let x = 0;

            for (let Class of user.classes) {

                if (Class === 'admin') {x++;continue;}

                fs.readFile(`./classrooms/${Class}.txt`, 'utf8', function (err, data) {

                    let ClassData = JSON.parse(data);

                    Classes.push({name: ClassData.name, period: ClassData.period, classCode: Class})

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

router.post('/', async (req, res) => {
    try {

        fs.readFile(`./users/${req.body.email}.txt`, 'utf8', async function(err, data){

            if (data === undefined) {return badLogin(req, res)}

            let user = JSON.parse(data);

            if(user.password !== req.body.password) {

                return badLogin(req, res)

            }

            let auth = user.classes[0] === 'admin' ? 'true' : 'false';

            let token = jwt.sign({ email: req.body.email, password: req.body.password, auth: auth }, process.env.JWT_SECRET);

            let options = {
                maxAge: 7 * 24 * 60 * 60 * 1000, // would expire after 15 minutes // in ms // 7 days
                httpOnly: true, // The cookie only accessible by the web server
                signed: true // Indicates if the cookie should be signed
            }

            res.cookie('login', token, options) // options is optional

            let usrlen = user.classes.length;
            let x = 0;
            let Classes = [];

            for (let Class of user.classes) {

                if (Class === 'admin') {x++;continue;}

                fs.readFile(`./classrooms/${Class}.txt`, 'utf8', function (err, data) {

                    let ClassData = JSON.parse(data);

                    Classes.push({name: ClassData.name, period: ClassData.period, classCode: Class})

                    x++;

                    if(x === usrlen) {

                        if(auth === 'true') {

                            return res.render('admin/classes', {title: 'Class Dashboard'});

                        } else {

                            return res.redirect('/student/class/' + Class)

                        }
                    }

                })
            }
        });

    }
    catch (error) {
        consoleMessage('Failed to read user data', 'red');
    }
})

function badLogin(req, res) {

    return res.render('login-signup/login', {

        title: 'Log in to Photoboard',
        login_error: 'Incorrect email or password.',
        populateEmail: req.body.email,
        populatePassword: req.body.password,
        emailColor: 'red',
        passwordColor: 'red'

    });

}

module.exports = router;
