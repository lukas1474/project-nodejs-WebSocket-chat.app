const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (userNameInput.value == '') {
        alert('uzupełnij pole name');
        return;
    }

    login(userNameInput.value);
});

function login(name) {

    userName = name;

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
};

addMessageForm.addEventListener('submit', sendMessage);

function sendMessage(event) {
    event.preventDefault();
    // console.log('test');

    if (messageContentInput.value == '') {
        alert('uzupełnij pole wiadomości');
        return;
    }

    addMessage(userName, messageContentInput.value);

    messageContentInput.value = '';
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
}

