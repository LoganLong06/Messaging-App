const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const PORT = 3000;

const app = express();
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on https://messaging-app-js1a.onrender.com:${PORT}`);
});
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log("new user connected");
    socket.on('message', (msg) => {
        io.emit('message', msg);
    })
    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
})