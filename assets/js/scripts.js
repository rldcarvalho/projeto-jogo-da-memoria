const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let hits = 0;
let attempts = 0;

/* Sons do Jogo */
const openingTheme = new Audio();
const cardCatch = new Audio();
const cardClick = new Audio();
openingTheme.src = './sound/pokemon-catch-theme.mp3';
cardCatch.src = './sound/pokemon-lvlup.mp3';
cardClick.src = './sound/pokemon-wall-bump.mp3';

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch()
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        cardCatch.play();
        hits += 1;
        attempts += 1;
        disableCards();
        return;
    }

    attempts += 1;
    cardClick.play();
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/* Embaralha as Divs alterando a posição inicial de cada carta */
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    })
})();



cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})

