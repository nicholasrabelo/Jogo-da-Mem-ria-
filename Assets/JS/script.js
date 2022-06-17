//variáveis necessárias:
const cards = document.querySelectorAll('.card');
let hasFlipperCard = false;
let firstCard, secondCard;
let lockBoard = false;

//virar as cartas:
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    
    this.classList.add('flip');
    if(!hasFlipperCard) {
        hasFlipperCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlipperCard = false;
    checkForMath(); 
}

//checa se as cartas são iguais:
function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards(); 
}

//desbilita as cartas:
function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//desvira as cartas
function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

         resetBoard();
    }, 1500);
}

//reseta o tabuleiro
function resetBoard() {
    [hasFlipperCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//enbaralha as cartas
(function shuffle() {
     cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
     })
})();

//evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

