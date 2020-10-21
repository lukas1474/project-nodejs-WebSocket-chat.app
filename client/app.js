const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const socket = io();

let userName = '';

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', ({ user, content }) => addMessage(user, content));
socket.on('removeUser', ({user, content}) => addMessage(user, content));

addMessageForm.addEventListener('submit', sendMessage);
loginForm.addEventListener('submit', login);

function login(event) {
    event.preventDefault();

    if (userNameInput.value == '') {
        alert('uzupełnij pole name');

    } else {

        userName = userNameInput.value;
        console.log(userName);
        socket.emit('login', { user: userName, id: socket.id });

        loginForm.classList.remove('show');
        messagesSection.classList.add('show');

        // login(userNameInput.value);
    }

};

// join.addEventListener('submit', function (event){
//     event.preventDefault();

//     if (userNameInput == userNameInput.value);
//     addMessage(userName, messageContent);
//     socket.emit('join', {author: userName, content: messageContent})
// });

// function join (event) {
//     event.preventDefault();

//     if (login == userName);
//     addMessage(userName, messageContent);
//     socket.emit('message', {author: userName, content: messageContent})
// };



function sendMessage(event) {
    event.preventDefault();
    // console.log('test');

    let messageContent = messageContentInput.value;

    if (!messageContent.length) {
        alert('uzupełnij pole wiadomości');
    } else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent })
        messageContentInput.value = '';
    }

    messageContentInput.value = '';
};

function addMessage(user, content) {
    console.log(user, content);
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (user === userName) {
        message.classList.add('message--self');
    } else if (user === 'ChatBot') {
        message.classList.add('message--bot');
    }
    message.innerHTML = `
        <h3 class="message__author">${userName === user ? 'You' : user}</h3>
        <div class="message__content">
        ${content}
        </div>
        `;
    messagesList.appendChild(message);
}



