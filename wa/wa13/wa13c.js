// Get all card elements
const cards = document.querySelectorAll('.card');

// Variables to store game state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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

// Function to flip a card
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
  } else {
    unflipCards();
  }
}

// Function to disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Function to unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

// Function to reset the game board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle cards on page load
(function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

// Add click event listener to each card
cards.forEach(card => card.addEventListener('click', flipCard));
