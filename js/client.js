const socket = io('http://localhost:8000');

const form = document.getElementById("sendMessage");
const msgInput = document.getElementById("messageInp");
const chat = document.querySelector(".chatBox");

const addChat = (message,float)=>{
    const chatDiv = document.createElement("div");
    chatDiv.innerText = message;
    chatDiv.classList.add("message");
    chatDiv.classList.add(float);
    chat.append(chatDiv)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgInput.value;
    addChat(`You : ${message}`, 'right');
    socket.emit('send',message);
    msgInput.value = '';
})

const name = prompt("Enter your name to join Chat : ");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    addChat(`${name} has Joined the Chat`,'center');
})

socket.on('receive',data=>{
    addChat(`${data.name} : ${data.message}`,'left');
})

socket.on('left',name=>{
    addChat(`${name} has left`,'center')
})