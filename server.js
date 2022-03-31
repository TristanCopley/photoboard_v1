// Add packages and create server
const env = require('./environment');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); // Socket.io setup for when we do the photoboard page after student photo submission
const path = require("path");
const hostname =  env.host;
const io = new Server(server);
const { tokenVerifier }  = require('./utils'); // Utility js for putting function you may need

const sess = {
    secret: env.secretKey,
    cookie: {},
    resave: false,
    saveUninitialized: true,
}

app.use(session(sess));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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
app.use('/admin', tokenVerifier, adminRouter);
app.use('/student', tokenVerifier, studentRouter);

// Socket.io code:
// Empty

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

