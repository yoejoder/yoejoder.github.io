const cards = document.querySelectorAll('.card');
const lives = document.querySelectorAll('.lives span');
const startButton = document.querySelector('.start-button');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;
let livesLeft = 6;

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
    const audioClick = new Audio('click.wav');
    audioClick.volume = this.dataset.number / 100;
    audioClick.play();
  
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
    const audioMatch = new Audio('match.wav');
    audioMatch.volume = secondCard.dataset.number / 100;
    audioMatch.play();
    disableCards();
    matchedCards += 2;
    if (matchedCards === 16) {
      const audioWin = new Audio('win.wav');
      audioWin.play();
      alert("Congratulations! You won the game! Please click one of the cards to select as your volume level. If these options are unsatisfactory, hit refresh and play again!");
      cards.forEach(card => card.addEventListener('click', showVolumeLevel));
    }
  } else {
    unflipCards();
    const audioWrong = new Audio('wrong.wav');
    audioWrong.volume = secondCard.dataset.number / 100;
    audioWrong.play();
    lives[livesLeft-1].style.color = '#fff';
    livesLeft--;
    if (livesLeft === 0) {
      const audioLose = new Audio('lose.wav');
      audioLose.play();
      alert("Game Over! Press ok to start again immedietely or refresh page to reload start button.");
      resetBoard();
      shuffleCards();
      flipAllCards();
      cards.forEach(card => {
        card.classList.remove('matched');
      });
      livesLeft = 6;
      lives.forEach(heart => heart.style.color = '#d63031');
    }
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
  const audioRick = new Audio('rickRoll.wav');
  audioRick.volume = volumeLevel / 100; // Set volume based on card number
  audioRick.play();
  
  

  lockBoard = true;
  cards.forEach(card => {
    if (card !== this) {
      card.removeEventListener('click', flipCard);
    }
  });
}

function shuffleCards() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 16);
      card.style.order = randomPos;
    });
  }

  function flipAllCards() {
    cards.forEach(card => {
      card.classList.add('flip');
      const cardNumber = card.querySelector('.card-number');
      cardNumber.textContent = card.dataset.number;
    });
    setTimeout(() => {
      cards.forEach(card => {
        card.classList.remove('flip');
        const cardNumber = card.querySelector('.card-number');
        cardNumber.textContent = '';
      });
      lockBoard = false;
    }, 3000);
  }
  
  document.querySelector('.start-button').addEventListener('click', () => {
    flipAllCards();
    document.querySelector('.start-button').style.display = 'none';
  });
  
  cards.forEach(card => card.addEventListener('click', flipCard));

