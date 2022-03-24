const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");
const hostname =  'localhost';
const io = new Server(server)

// Routes
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', usersRouter);

app.listen(port, () => {

    console.log(`Example app listening on http://${hostname}:${port}`)

})