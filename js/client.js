const socket = io('http://localhost:8000');

let append = (content, position) => {
    let container = document.querySelector('.container');
    let div = document.createElement('div');
    div.innerText = `${content}`;
    div.className = `${position} msg`;
    container.appendChild(div);
}

const name = prompt('Please enter your name');
socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
    append(`${name} has joined the chat`, 'left');
});

socket.on('receive', (msg) => {
    console.log(msg);
    append(msg, 'left');
});

document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault();
    let msgElement = document.getElementById('msgImp');
    let msg = msgElement.value;
    msgElement.value = '';
    append(`You: ${msg}`, 'right');
    socket.emit('send', msg);
});


