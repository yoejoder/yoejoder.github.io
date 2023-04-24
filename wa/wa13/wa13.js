const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

const numbers = [];
for (let i = 0; i < 8; i++) {
  const randomNum = Math.floor(Math.random() * 101);
  numbers.push(randomNum);
}
const allNumbers = [...numbers, ...numbers];
allNumbers.sort(() => 0.5 - Math.random());
cards.forEach((card, index) => {
  card.dataset.number = allNumbers[index];
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  const cardNumber = this.querySelector('.card-number');
  cardNumber.textContent = this.dataset.number;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

  

function checkForMatch() {
  let isMatch = firstCard.dataset.number === secondCard.dataset.number;

  if (isMatch) {
    disableCards();
    matchedCards += 2;
    if (matchedCards === 16) {
      alert("Congratulations! You won the game! Please click one of the cards to select as your volume level. If these options are unsatisfactory, hit refresh and play again!");
      cards.forEach(card => card.addEventListener('click', showVolumeLevel));
    }
  } else {
    unflipCards();
  }
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
    firstCard.querySelector('span').textContent = '';
    secondCard.querySelector('span').textContent = '';
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showVolumeLevel() {
  if (lockBoard) return;
  if (this === firstCard) return;

  const volumeLevel = this.dataset.number;
  alert(`Chosen Volume Level: ${volumeLevel}`);

  lockBoard = true;
  cards.forEach(card => {
    if (card !== this) {
      card.removeEventListener('click', flipCard);
    }
  });
}

(function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
