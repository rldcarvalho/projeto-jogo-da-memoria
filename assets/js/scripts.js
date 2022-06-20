const cards = document.querySelectorAll('.card');
const popup = document.querySelector('.popup-wrapper');
const popupContent = document.querySelector('#winMessage');
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
        /* Dispara o popup caso acerte as 8 cartas*/
        if (hits == 8) {
            popup.style.display = 'block'
            popupContent.innerHTML = `Parabéns, você finalizou o jogo com ${attempts} rodadas.`
        }
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
    }, 1000);
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

/* Verifica se foi clicado para fechar o popup*/
popup.addEventListener('click', event => {
    const classNameOfClickedElement = event.target.classList[0];
    const classNames = ['popup-close', 'popup-wrapper'];
    const shouldClosePopup = classNames.some(className => className === classNameOfClickedElement);

    if (shouldClosePopup) {
        popup.style.display = 'none'
    }

})
