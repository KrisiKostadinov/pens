const buttons = document.querySelectorAll(".color");

const startBtn = document.querySelector(".start");

const endLevel = document.querySelector("[end]");
const winLevel = document.querySelector("[win]");

const countText = document.querySelector("[countText]");

var pendingButtons = [];
var lockBoard = true;

var isShowWinText = false;

var myButtonsSelected = 0;
var mySelectingIndex = 0;

var currentCount = 0;
var count = 0;

var interval;

buttons.forEach(button => {
    button.addEventListener("click", selectColor);
});

startBtn.addEventListener("click", start);

endLevel.addEventListener("click", start);

function start() {
    this.classList.remove("show");
    reset();
    getRandomColor();
    startRandomSelecting();
}

function end() {
    lockBoard = true;
    isLockBoard();
    endLevel.classList.add("show");
}

function win() {
    lockBoard = true;
    isLockBoard();
    isShowWinText = true;
    isLockWinWindow();
    winLevel.classList.add("show");
    setTimeout(() => {
        winLevel.classList.remove("show");
        isShowWinText = false;
        isLockWinWindow();
        lockBoard = false;
        isLockBoard();
        reset();
        getRandomColor();
        startRandomSelecting();
    }, 1000);
}

function reset() {
    pendingButtons = [];
    myButtonsSelected = null;
    currentCount = 0;
    mySelectingIndex = 0;
    count = 0;
}

function selectColor() {
    if(!lockBoard) {
        if(pendingButtons[mySelectingIndex] === parseInt(this.dataset.number)) {
            if(mySelectingIndex + 1 === pendingButtons.length) {
                win();
            }
        } else {
            end();
        }
        mySelectingIndex++;
        dismiss(null, this);
    }
}

function dismiss(index, event) {
    setTimeout(() => {
        if(event) {
            event.classList.remove("selected");
        }
        else {
            buttons[index].classList.remove("selected");
        }
    }, 200);
}

function startRandomSelecting() {
    lockBoard = true;
    isLockBoard();
    interval = setInterval(selectRandomButton, 1000);
}

function getRandomColor() {
    count = Math.floor(Math.random() * 7) + 1;
    countText.innerHTML = count;
}

function selectRandomButton() {
    var index = Math.floor(Math.random() * 4);
    buttons[index].classList.add("selected");
    pendingButtons.push(index + 1);
    currentCount++;
    dismiss(index);
    if(currentCount >= count) {
        lockBoard = false;
        isLockBoard();
        clearInterval(interval);
    }
}

function isLockBoard() {
    if(!lockBoard) {
        buttons.forEach(button => {
            button.classList.add("show");
        });
    } else {
        buttons.forEach(button => {
            button.classList.remove("show");
        });
    }
}

function isLockWinWindow() {
    if(isShowWinText) {
        countText.style.display = "none";
    } else {
        countText.style.display = "block";
    }
}