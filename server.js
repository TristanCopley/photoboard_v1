const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");
const hostname =  'localhost';
const io = new Server(server);

// Public is for development
// build is for serving client code after it has been gulped or minified


app.use(express.static('public/default')); // Using Dev for serving files

app.get('/signup', (req, res) => {

    res.sendFile(__dirname + '/public/default/signup.html'); // Serves index.html

});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/default/index.html'); // Serves index.html

});



app.listen(port, () => {

    console.log(`Example app listening on http://${hostname}:${port}`)

})