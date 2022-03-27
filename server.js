// Add packages and create server
const env = require('./environment.js')
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); // Socket.io setup for when we do the photoboard page after student photo submission
const path = require("path");
const hostname =  env.host;
const io = new Server(server)

// Middleware
app.use(express.urlencoded({ extended: true }))

// Routes, allows for the photoboard/user/${name}
let loginRouter = require('./routes/login'); // Also index router
let signupRouter = require('./routes/signup');

// View engine setup, required for pug and rendering files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', loginRouter); // Index in routes/login.js
app.use('/signup', signupRouter); // Using indexRouter in routes/login.js

// Socket.io code:
// Empty

// Server start
app.listen(port, () => {

    console.log(`Photoboard server listening on http://${hostname}:${port}`)

})
