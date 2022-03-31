const jwt = require('jsonwebtoken');
const env = require('./environment');
const Cryptr = require('cryptr');
const bcrypt = require("bcrypt");

function tokenCreate(req) {

    req.session.token = jwt.sign({
        authorized: 'true'
    }, env.secretKey, { expiresIn: 900 }); // Expires in 15 minutes

}

function tokenVerifier(req, res, next) {

    // Replace req.session.token with a number to test inactive status
    try {

        if (jwt.verify(req.session.token, env.secretKey).authorization === 'true') {}

        tokenCreate(req);

        return next();

    } catch {

        return res.render('inactive');

    }

}

// Replace with database code
function createLoginCookie(user, req, res) {

    let loginCookie = env.encrypter.encrypt( String(user.email.length).padStart(2, '0') + user.email + user.password);

    res.cookie('important', loginCookie, { maxAge: 900000, httpOnly: true })

}

// Replace with database code
async function loginWithCookie(users, req, res) {

        let decryptedCookie = env.encrypter.decrypt(req.cookies.important);

        let cookie = {

            email: decryptedCookie.substr(2, decryptedCookie.substr(0, 2)),
            password: decryptedCookie.substr(2 + parseInt(decryptedCookie.substr(0, 2)), decryptedCookie.length - 2 + parseInt(decryptedCookie.substr(0, 2)))

        };

        const user = users.find(user => user.email === cookie.email);

        if(user.password === cookie.password) {

            // Sets session token on login
            tokenCreate(req);

            createLoginCookie(user, req, res);

            if ( user.classCode[0] === 'admin') {

                return res.redirect('/admin/classes/') // Send to admin page

            } else {

                return res.redirect('/student/') // Send to student page

            }

        }

}

module.exports = { tokenCreate, tokenVerifier, createLoginCookie, loginWithCookie};

