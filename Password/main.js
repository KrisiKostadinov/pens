const passwordField = document.querySelector('[password]');
const button = document.querySelector('form button');
const info = document.querySelector('[info]');
const numbers = document.querySelector('[numbers] ul');
const form = document.querySelector('form');

var passwordString = '';
var password = [];
var countPasswords = 0;
var lockForm = false;

start();

function newPassword() {
    for(let i = 0; i < 4; i++) {
        var randNumber = (Math.floor(Math.random() * 9) + 1).toString();
        if(password.some(x => x === randNumber)) {
            i--;
            continue;
        }

        passwordString += randNumber;
        password.push(randNumber);
    }
}

function start() {
    countPasswords = 0;
    password = [];
    passwordString = '';
    lockForm = false;

    newPassword();

    info.querySelector('h2')?.remove();
    info.querySelector('button')?.remove();
    numbers.innerHTML = '';

    passwordField.addEventListener('input', checkValid);
    form.addEventListener('submit', checkPassword);
    button.addEventListener('click', checkPassword);
    passwordField.focus();
}

function checkPassword(event) {
    event.preventDefault();
    countPasswords++;
    
    if(!checkValid() && !lockForm)
    return;
    
    if(passwordField.value === passwordString) {
        correctPassword();
    } else {
        incorrectPassword();
    }
}

function correctPassword() {
    var msg = new SpeechSynthesisUtterance('Congratulations!');
    window.speechSynthesis.speak(msg);
    lockForm = true;
    info.innerHTML = '';
    for(let i = 0; i < 4; i++) {
        createAndAppendHTMLElement('li', 'correct-number', password[i], numbers);
    }
    
    createAndAppendHTMLElement('h2', null, countPasswords, info);
    passwordField.value = '';
    
    passwordField.removeEventListener('input', (event) => console.log(event));
    form.removeEventListener('submit', (event) => console.log(event));
    button.removeEventListener('click', (event) => console.log(event));
    
    createAndAppendHTMLElement('button', 'start-btn', 'Play again', info);
    info.querySelector('button').addEventListener('click', start);
}

function createAndAppendHTMLElement(tag, enterClass, text, parent) {
    if(tag) {
        var li = document.createElement(tag);
        li.innerText = text;
    }
    
    if(enterClass)
        li.classList.add(enterClass);

    parent.appendChild(li);
}

function incorrectPassword() {
    addClasses();
}

function addClasses() {
    var ul = document.createElement('ul');
    for(i = 0; i < 4; i++) {
        var li = document.createElement('li');
        li.innerText = passwordField.value[i];
        if(password[i] === passwordField.value[i]) {
            li.classList.add('correct-number');
        } else if(Array.from(password).includes(passwordField.value[i])) {
            li.classList.add('contains-number');
        } else {
            li.classList.add('error-number');
        }

        ul.appendChild(li);
    }

    info.appendChild(ul);
    info.scrollTop = info.scrollHeight;
}

function checkValid() {
    var numbers = passwordField.value.toString().split('');

    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(i !== j && numbers[i] === numbers[j]) {
                button.disabled = true;
                return false;
            }
        }   
    }

    if(passwordField.value.length === 4) {
        button.disabled = false;
        return true;
    }

    button.setAttribute('disabled', 'true');
    return false;
}