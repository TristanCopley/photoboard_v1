// Add packages and create server
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); // Socket.io setup for when we do the photoboard page after student photo submission
const path = require("path");
const hostname =  'localhost';
const io = new Server(server)
//

// Routes, allows for the photoboard/user/${name}
let indexRouter = require('./routes/index');
// let usersRouter = require('./routes/users');

// View engine setup, required for pug and rendering files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));
//

// Use routes
app.use('/', indexRouter); // Using indexRouter in routes/index.js
//

// Socket.io code:
// Empty
//

// Server start
app.listen(port, () => {

    console.log(`Photoboard server listening on http://${hostname}:${port}`)

})
//