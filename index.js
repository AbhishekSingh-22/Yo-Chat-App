const express = require('express');
const path = require("path");
const { Socket } = require('socket.io');

const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

// adding neccessary middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

// listening to server
http.listen(PORT, ()=>{
    console.log("server running on port", PORT);
})
// socket.io
const io = require("socket.io")(http);
io.on("connection", (socket)=>{
    console.log("web socket connnected...");
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg);
    })
})



