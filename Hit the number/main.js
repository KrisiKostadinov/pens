var number = document.getElementById('number');
var upBtn = document.getElementById('up-btn');
var downBtn = document.getElementById('down-btn');
var startBtn = document.getElementById('start');
var stopBtn = document.getElementById('stop-btn');
var number = document.getElementById('number');
var prevNumber = document.getElementById('prev-number');

var numberText = undefined;
var prevNumberText = undefined;
var interval = undefined;
var lockBtn = false;
var increaserNumber = 0;

function increasingNumber() {
    interval = setInterval(() => {
        if(increaserNumber >= 60) increaserNumber = 0;
        
        increaserNumber++;
        setValues(increaserNumber, null);
    }, 20);
}

stopBtn.addEventListener('click', event => {
    if(!numberText) {
        numberText = number.textContent;
        stopBtn.style.display = 'none';
        upBtn.style.display = 'block';
        downBtn.style.display = 'block';
        stopIncresing();
        prevNumberText = numberText;
        console.log(null, prevNumberText);
        setValues(numberText, prevNumberText);
        return;
    }
});

upBtn.addEventListener('click', event => {
    stopIncresing();
    checkNumber('up');
});

downBtn.addEventListener('click', () => {
    stopIncresing();
    checkNumber('down');
});

startBtn.addEventListener('click', () => {
    document.getElementById('app').classList.remove('success') || document.getElementById('app').classList.remove('wrong');
    if(!lockBtn) {
        increasingNumber();
        lockBtn = true;
        startBtn.disabled = true;
        upBtn.disabled = false;
        downBtn.disabled = false;
        upBtn.focus();
        stopBtn.disabled = false;
        prevNumberText = number.textContent;
        setValues(null, prevNumberText);
    } else if(!lockBtn) {
        number.classList.add('required');
        setTimeout(() => number.classList.remove('required'), 2000);
    }
});

function stopIncresing() {
    clearInterval(interval);
    lockBtn = false;
    startBtn.disabled = false;
    upBtn.disabled = true;
    downBtn.disabled = true;
    console.log(prevNumber.textContent, number.textContent);
}

function checkNumber(dir) {
    if(dir === 'up') {
        if(Number(number.textContent) > Number(prevNumber.textContent)) {
            document.getElementById('app').classList.add('success');
        } else {
            document.getElementById('app').classList.add('wrong');
        }
    } else {
        if(Number(number.textContent) < Number(prevNumber.textContent)) {
            document.getElementById('app').classList.add('success');
        } else {
            document.getElementById('app').classList.add('wrong');
        }
    }

    startBtn.focus();
}

function setValues(curr, prev) {
    if(curr) {
        number.textContent = curr;
    }

    if(prev) {
        prevNumber.textContent = prev;
    }
}