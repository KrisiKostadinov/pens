var cards = document.querySelectorAll("[card]");
var victory = document.querySelector("[victory]");
var playAgainBtn = document.querySelector("[play-again]");
var flipsCountText = document.querySelectorAll("[flips-count]");
var secondsText = document.querySelectorAll("[seconds]");

var hasFlippedCard = false;
var lockBoard = false;
var firstCard;
var secondCard;
var unflipedCards = [];
var isVictory = false;
var flipsCount = 0;
var isPlay = false;
var seconds = 0;
var interval = null;

function play() {
    isPlay = true;
    lockBoard = false;

    cards.forEach(card => {
        card.classList.toggle("is-show");
    });

    interval = setInterval(() => incrementSeconds(), 1000);
}

function incrementSeconds() {
    console.log(seconds);
    seconds++;
    secondsText.forEach(field => field.textContent = seconds);
}

shuffleCards();

function shuffleCards() {
    for(let i = cards.length - 1; i >= 0; i--) {
        var randIndex = Math.floor(Math.random() * (i + 1));
        cards[randIndex].style.order = i;
    }
}

function reset() {
    window.location.reload();
}

function flip() {
    if(lockBoard) return;
    if(firstCard === this) return;

    flipsCount++;
    flipsCountText[0].textContent = flipsCount;
    
    this.classList.add("is-show");

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    }
    
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    var isMatch = firstCard.dataset.val === secondCard.dataset.val;
    
    isMatch ? disableCard() : unflipCards();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("is-show");
        secondCard.classList.remove("is-show");
        lockBoard = false;

        resetBoard();
    }, 600);
}

function disableCard() {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    
    unflipedCards.push(firstCard);
    unflipedCards.push(secondCard);

    secondCard.addEventListener("transitionend", () => {
        if(unflipedCards.length === cards.length) {
            isVictory = true;
            won();
        }

        firstCard.children[0].classList.remove("card-front");
        firstCard.children[0].classList.add("card-dismiss");
        
        secondCard.children[0].classList.remove("card-front");
        secondCard.children[0].classList.add("card-dismiss");

        resetBoard();
    });
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function won() {
    victory.style.display = "flex";
    flipsCountText[1].textContent = flipsCount;
    secondsText[1].textContent = seconds;
    clearInterval(interval);
}

(function () {
    cards.forEach(card => {
        card.classList.toggle("is-show");
    });

    setTimeout(play, 3000);

    lockBoard = true;
})();

playAgainBtn.addEventListener("click", reset);

cards.forEach(card => {
    card.addEventListener("click", flip);
});