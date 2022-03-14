const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const hostname = '192.168.0.14';
//const io = new Server(server);

// Public is for development
// build is for serving client code after it has been gulped or minified

app.use(express.static('dev')); // Using Dev for serving files
app.get('/', (req, res) => {

    res.sendFile('index.html'); // Serves index.html

});


app.listen(port, () => {

    console.log(`Example app listening on http://${hostname}:${port}`)

})