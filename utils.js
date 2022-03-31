const jwt = require('jsonwebtoken');
const env = require('./environment');

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

module.exports = { tokenCreate, tokenVerifier };

