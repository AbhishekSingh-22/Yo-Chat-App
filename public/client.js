const socket = io();

let userName;
do {
    userName = prompt("Enter your name: ");
} while (!userName);

let chatArea = document.getElementsByClassName("chatArea")[0];
let sendBtn = document.getElementById("send");

sendBtn.onclick= function (e){
    let message = document.getElementsByName("message")[0];

    let html = `<div class="outgoingMessage"><span>${userName}</span><br>${message.value}</div>`
    chatArea.innerHTML+= html;

    socket.emit('message',{
        "name" : userName,
        "msg" : message.value
    })
    message.value = '';

}

// recieve message
socket.on('message',(msg)=>{
    let html = `<div class="incomingMessage"><span>${msg.name}</span><br>${msg.msg}</div>`
    chatArea.innerHTML+= html;
})

