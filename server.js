// Add packages and create server
const env = require('./environment');
const express = require('express');
const session = require('express-session')
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); // Socket.io setup for when we do the photoboard page after student photo submission
const path = require("path");
const hostname =  env.host;
const io = new Server(server);

const utils = require('./utils'); // Utility js for putting function you may need

let sess = {

    secret: env.secretKey,
    cookie: {},
    saveUninitialized: true,     // forces the session that is "uninitialized" to be saved to the store
    resave: false                // forces the session to be saved back to the session store, even if a session was not modified by request

};

app.use(session(sess));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes, allows for the photoboard/user/${name}
let loginRouter = require('./routes/login'); // Also index router
let signupRouter = require('./routes/signup');
let adminRouter = require('./routes/admin');
let studentRouter = require('./routes/student');

// View engine setup, required for pug and rendering files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', loginRouter); // Using indexRouter in routes/login.js
app.use('/signup', signupRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);


// Socket.io code:
// Empty

// Below is example code on how to use sessions while i try and grasp it
/*app.get('/session', function (req, res) {
    if (req.session.page_views) {
        // incrementing the page views counter by 1
        req.session.page_views++;
        res.status(200).json({info: `Welcome to this tutorial. Visit counter : ${req.session.page_views}`});
    } else {
        // introductory request
        // setting the page views counter to 1
        req.session.page_views = 1;
        res.status(200).json({info: 'Welcome to this tutorial for the first time'});
    }
});*/

// Server start
app.listen(port, () => {

    console.log(`Photoboard server listening on http://${hostname}:${port}`)

})

// Error detection
server.on('error', (error) => {

    // handle specific listen errors with friendly messages
    switch (error.code) {

        case 'EACCES':
            console.error('Port: ' + port + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error('Port: ' + port + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;
    }


});

// 404 page
app.use((req, res) => { res.status(404).render('404') });