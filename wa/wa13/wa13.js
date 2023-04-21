// Get all card elements
const cards = document.querySelectorAll('.card');

// Variables to store game state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

// Add numbers to cards
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
  // Prevent flipping more than 2 cards at once
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  // Show the number on the card
  const cardNumber = this.querySelector('.card-number');
  cardNumber.textContent = this.dataset.number;

  // If this is the first card flipped
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // If this is the second card flipped
  hasFlippedCard = false;
  secondCard = this;

  // Check for a match
  checkForMatch();
}

  

// Function to check if two flipped cards match
function checkForMatch() {
  let isMatch = firstCard.dataset.number === secondCard.dataset.number;

  // If the cards match
  if (isMatch) {
    disableCards();
    matchedCards += 2;
    if (matchedCards === 16) {
      // If all cards are matched, prompt the user to click a card
      alert("Congratulations! You won the game! Please click one of the cards to select as your volume level. If these options are unsatisfactory, hit refresh and play again!");
      // Add event listener to each card to display its number in an alert when clicked
      cards.forEach(card => card.addEventListener('click', showVolumeLevel));
    }
  } else {
    unflipCards();
  }
}// Function to disable matched cards
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

// Function to reset the game board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showVolumeLevel() {
  // Prevent clicking more than 1 card at once
  if (lockBoard) return;
  if (this === firstCard) return;

  // Show the number on the card in an alert
  const volumeLevel = this.dataset.number;
  alert(`Chosen Volume Level: ${volumeLevel}`);

  // Disable clicking on all cards except the one just clicked
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
