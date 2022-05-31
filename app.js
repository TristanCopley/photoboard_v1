require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 80;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); // Socket.io setup for when we do the photoboard page after student photo submission
const path = require("path");
const hostname = 'localhost';
const io = new Server(server);
const fs = require('fs');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// View engine setup, required for pug and rendering files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
let loginRouter = require('./routes/login');
let signupRouter = require('./routes/signup');
let errorRouter = require('./routes/error');
let adminRouter = require('./routes/admin');
let studentRouter = require('./routes/student');

// Middleware
const {isAdmin} = require("./middleware");
const {isStudent} = require("./middleware");

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/',loginRouter);
app.use('/signup', signupRouter);
app.use('/error', errorRouter);
app.use('/admin', isAdmin,adminRouter);
app.use('/student', isStudent,studentRouter);

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
app.use((req, res) => { res.status(404).render('error/404') });