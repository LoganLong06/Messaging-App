
const socket = io();
const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const input = document.getElementById('input');

function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (usernameInput.value != '' && input.value != '') {
        socket.emit('message', { username: usernameInput.value, message: input.value});
        input.value = '';
    }
});

socket.addEventListener('message', (msg) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.classList.add('username');
    span.style.color = getRandomHexColor();
    span.textContent = msg.username;
    li.appendChild(span);
    li.append(`: ${msg.message}`);
    document.getElementById('messages').appendChild(li);
})