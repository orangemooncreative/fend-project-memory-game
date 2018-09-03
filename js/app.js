/*
 * Create a list that holds all of your cards
 */

/*
 * Variable Declarations
 */

let cardDeck = document.querySelector('.deck'),
  moves = document.querySelector('span.moves'),
  stars = document.querySelectorAll('.stars li'),
  timer = document.querySelector('.timer'),
  modal = document.querySelector('.modal'),
  modalOverlay = document.querySelector('.modal__overlay'),
  cancelButton = document.querySelector('.button__secondary'),
  playButton = document.querySelector('.button__primary'),
  resetButton = document.querySelector('.restart'),
  cards = document.querySelectorAll('.deck li'),
  flippedCards = [],
  movesCount = 0,
  starsCount = 3,
  matchedCards = 0,
  time = 0,
  seconds = 0,
  minutes = 0;

/*
 * Build the Game Timers
 */

// inspired by https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
let gameTimer = function buildTimer() {
  time++;
  seconds = time % 60;
  minutes = Math.floor(time / 60);
  if (seconds <= 9) {
    seconds = `0${seconds}`;
  }
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  }
  // update html with minutes and seconds
  timer.textContent = `${minutes}:${seconds}`;
  // stop timer if all cards are matched
  if (matchedCards === 8) {
    stopTimer();
    showModal();
  }
};

// start the game timer
function startTimer() {
  handle = setInterval(gameTimer, 1000);
}

// stop the game timer
function stopTimer() {
  clearInterval(handle);
  handle = 0;
}

/*
 * Flip the cards
 */

// toggle classes to show symbol styles
function showSymbol(evt) {
  evt.classList.add('open');
  evt.classList.add('show');
}

// push the flipped cards into an array
function pushCards(flippedCard) {
  flippedCards.push(flippedCard);
}

// add an event listener to display the symbol of each card on click
cardDeck.addEventListener('click', function(evt) {
  const flippedCard = evt.target;
  // only allow two cards to flip at a time
  if (flippedCard.classList.contains('card') && flippedCards.length < 2) {
    showSymbol(flippedCard);
    pushCards(flippedCard);
    playerMoves();
    hideStar();

    if (flippedCards.length === 2) {
      let firstCard = flippedCards[0];
      let secondCard = flippedCards[1];
      if (firstCard.innerHTML === secondCard.innerHTML) {
        isMatching(firstCard, secondCard);
        matchedCards++;
      } else {
        notMatching(firstCard, secondCard);
      }
    }
  }
});

/*
 * Match the Cards
 */

// lock matched cards in the open position
function isMatching(firstCard, secondCard) {
  firstCard.classList.add('match');
  secondCard.classList.add('match');
  flippedCards = [];
}

// remove unmatched cards from list and hide symbol
function notMatching(firstCard, secondCard) {
  setTimeout(function() {
    firstCard.classList.remove('open', 'show');
    secondCard.classList.remove('open', 'show');
    flippedCards = [];
  }, 750);
}

/*
 * Track Player Stats
 */

// keep track of player moves and start timer
function playerMoves() {
  movesCount++;
  moves.textContent = movesCount;
  if (movesCount === 1) {
    startTimer();
  }
}

// hide stars & keep stars count
function hideStar() {
  if (movesCount === 10) {
    stars[2].setAttribute('style', 'display: none');
    starsCount = 2;
  } else if (movesCount >= 20) {
    stars[1].setAttribute('style', 'display: none');
    starsCount = 1;
  }
  return starsCount;
}

/*
 * Display End of Game Stats
 */

// show end of game stats
function showModal() {
  const modalTime = document.querySelector('#modal__time');
  const modalMoves = document.querySelector('#modal__moves');
  const modalStars = document.querySelector('#modal__stars');

  modalTime.innerHTML = `<strong>TIME:</strong> ${minutes}:${seconds}`;
  modalMoves.innerHTML = `<strong>MOVES:</strong> ${movesCount}`;
  modalStars.innerHTML = `<strong>STARS:</strong> ${starsCount}`;

  modal.classList.remove('hide');
  modalOverlay.classList.remove('hide');
}

// hide modal on clicking cancel
function hideModal() {
  modal.classList.add('hide');
  modalOverlay.classList.add('hide');
}

cancelButton.addEventListener('click', function() {
  hideModal();
});

/*
 * Reset Game
 */

function resetGame() {
  matchedCards = 0;
  resetStars();
  resetMoves();
  resetTimer();
}

function resetStars() {
  starsCount = 3;
  stars[2].removeAttribute('style');
  stars[1].removeAttribute('style');
}

function resetMoves() {
  movesCount = 0;
  moves.textContent = movesCount;
}

function resetTimer() {
  time = 0;
  seconds = 0;
  minutes = 0;
  timer.textContent = `0${minutes}:0${seconds}`;
  stopTimer();
}

function resetCards() {
  for (let card of cards) {
    card.className = 'card';
  }
}

// nodelist to array inspired from: https://hackernoon.com/htmlcollection-nodelist-and-array-of-objects-da42737181f9
function newGame() {
  cardsArray = Array.from(cards);
  newCards = shuffle(cardsArray);
  for (let card of newCards) {
    cardDeck.appendChild(card);
  }
}

resetButton.addEventListener('click', function() {
  resetGame();
});

// play the game again

playButton.addEventListener('click', function() {
  hideModal();
  resetGame();
  resetCards();
  newGame();
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * SHuffle Cards
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// TODO:
// Cards are randomly placed
// The symbols face down
// On a click the card must turn and show the icon and stays turned
// On a click on a different card the card must turn and show the icon
// If the 2 turned cards match they stay turned
// If the cards don't match they turn back
// The game ends when all cards are flipped
// When the game ends show a modal
// Reset button
// Star rating
// Timer
// Move counter

/*
 * TODO:
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
