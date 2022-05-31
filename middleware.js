const jwt = require("jsonwebtoken");
const isAdmin = function (req, res, next) {
    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        console.log(payload)

        if (payload.auth === 'true') {

            next();

        } else {

            return res.render('error/unauth', {title: 'Unauthorized'})

        }

    } catch(e) {

        return res.render('error/unauth', {title: 'Unauthorized'})

    }
}
const isStudent = function (req, res, next) {
    try {

        let login = req.signedCookies['login'];
        let payload = jwt.verify(login, process.env.JWT_SECRET);

        if (payload.auth === 'false') {

            next();

        } else {

            return res.render('error/unauth', {title: 'Unauthorized'})

        }

    } catch(e) {

        return res.render('error/unauth', {title: 'Unauthorized'})

    }
}

module.exports = {isAdmin,isStudent}