const express = require('express');
const {consoleMessage} = require("../utils");
const fs = require("fs");
const jwt = require("jsonwebtoken");
let router = express.Router();


/* Render Login page */
router.get('/', (req, res) =>{

    res.render('login-signup/signup', { title: 'Join Photoboard'});

});

router.post('/', async (req, res) => {

    let invalidFormError="",firstNameColor="lightgrey",lastNameColor="lightgrey",emailColor="lightgrey",passwordColor="lightgrey",confirmPasswordColor="lightgrey",classCodeColor="lightgrey";req.body.firstName.length<1&&(invalidFormError="First name is not filled out.",firstNameColor="red"),req.body.lastName.length<1&&(lastNameColor="red",invalidFormError=""!==invalidFormError?"Multiple invalid forms.":"Last name is not filled out."),req.body.email<6?(emailColor="red",invalidFormError=""!==invalidFormError?"Multiple invalid forms.":"Your email is not filled out."):req.body.email.includes("@")&&req.body.email.includes(".")||(emailColor="red",invalidFormError=""!==invalidFormError?"Multiple invalid forms.":"Email is invalid."),req.body.password.length<5&&(passwordColor="red",invalidFormError=""!==invalidFormError?"Multiple invalid forms.":"Your password is too short."),(req.body.confirmPassword!==req.body.password||req.body.confirmPassword<5)&&(confirmPasswordColor="red",invalidFormError=""!==invalidFormError?"Multiple invalid forms.":"Your passwords do not match."),5!==req.body.classCode.length&&(classCodeColor="red",invalidFormError=""!==invalidFormError?"Multiple invalid forms.":"That class does not exist.");

    if(invalidFormError !== '') return res.render('login-signup/signup', {

        title: 'Join Photoboard',
        signup_error: invalidFormError,

        populateFirstName: req.body.firstName,
        populateLastName: req.body.lastName,
        populateEmail: req.body.email,
        populatePassword: req.body.password,
        populateConfirmPassword: req.body.confirmPassword,
        populateClassCode: req.body.classCode,
        firstNameColor: firstNameColor,
        lastNameColor: lastNameColor,
        emailColor: emailColor,
        passwordColor: passwordColor,
        confirmPasswordColor: confirmPasswordColor,
        classCodeColor: classCodeColor

    });

    if (fs.existsSync(`./users/${req.body.email}.txt`)) {

        return res.render('login-signup/signup', {

            title: 'Join Photoboard',
            signup_error: 'E-mail is already in use.',

            populateFirstName: req.body.firstName,
            populateLastName: req.body.lastName,
            populateEmail: req.body.email,
            populatePassword: req.body.password,
            populateConfirmPassword: req.body.confirmPassword,
            populateClassCode: req.body.classCode,
            firstNameColor: firstNameColor,
            lastNameColor: lastNameColor,
            emailColor: 'red',
            passwordColor: passwordColor,
            confirmPasswordColor: confirmPasswordColor,
            classCodeColor: classCodeColor

        });

    }

    try {

        let data = JSON.stringify({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            classes: [req.body.classCode]
        })

        fs.writeFile(`./users/${req.body.email}.txt`, data, function(err, data){});

        let token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.JWT_SECRET);

        let options = {
            maxAge: 7 * 24 * 60 * 60 * 1000, // would expire after 15 minutes // in ms // 7 days
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        }

        res.cookie('login', token, options) // options is optional

        if (req.body.classCode === 'admin') return res.render('login-signup/createClass', { title: 'Create class'});

        return res.render('login-signup/login', { title: 'Log in to Photoboard'});

    } catch(e) {
        consoleMessage('Failed to create user data', 'red');
    }

});

router.post('/createClass', async (req, res) => {

    let invalidFormError = '';
    let classNameColor = 'lightgrey';
    let periodColor = 'lightgrey';

    if(req.body.period.length !== 1) {

        let periodColor = 'red';
        invalidFormError = "Period doesn\'t exist"

        if(req.body.className.length <= 3) {

            let classNameColor = 'red';
            invalidFormError = "Both forms are invalid"

        }

    } else {

        if(req.body.className.length <= 3) {

            let classNameColor = 'red';
            invalidFormError = "Class name is to short"

        }

    }

    if(invalidFormError !== '') return res.render('login-signup/createClass', {

        title: 'Join Photoboard',
        signup_error: invalidFormError,
        populateClassName: req.body.className,
        populatePeriod: req.body.period,
        classNameColor: classNameColor,
        periodColor: periodColor

    });

    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        fs.readFile(`ratchet.txt`, 'utf8', function(err, data) {

            let classCodeGen = (parseInt(data) % 33554431).toString(32).padStart(5, 'e').toUpperCase();
            fs.writeFile(`./ratchet.txt`, (parseInt(data)+1).toString(), function(err, data){});

            let classData = {

                name: req.body.className,
                period: req.body.period,
                enrollmentList: [{

                    firstName: 'Tristan',
                    lastName: 'Tristan',
                    email: 'admin@photoboard.com'

                }],
                mainMessages: [
                    {
                        author: 'admin@photoboard.com',
                        title: 'Welcome!',
                        content: 'This is the first message to your classroom.',
                        comments: [],
                        date: Math.round(Date.now()),
                        type: 'announcement'
                    }
                ],

            }

            fs.writeFile(`./classrooms/${classCodeGen}.txt`, JSON.stringify(classData), function(err, data){});
            fs.readFile(`./users/${payload.email}.txt`, 'utf8', function(err, data){

                if (data === undefined) {return res.render('login-signup/login', { title: 'Log in to Photoboard'});}

                let user = JSON.parse(data);

                if(user.password !== payload.password) {

                    return res.render('login-signup/createClass', { title: 'Create class'})

                }

                user.classes.push(classCodeGen)

                fs.writeFile(`./users/${user.email}.txt`, JSON.stringify(user), function(err, data){});

            });

            return res.render('login-signup/login', { title: 'Log in to Photoboard'});

        });
    } catch(e) {
        consoleMessage('Failed to create classroom data', 'red');
    }

});


module.exports = router;
