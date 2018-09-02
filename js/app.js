/*
 * Create a list that holds all of your cards
 */

/*
 * Variable Declarations
 */

// select all individual cards
let allCards = document.querySelectorAll('.card'),
  // select the deck of cards
  cardDeck = document.querySelector('.deck'),
  // empty list to hold flipped cards
  flippedCards = [],
  // moves counter
  movesCount = 0,
  // select moves element
  moves = document.querySelector('span.moves'),
  // select stars
  stars = document.querySelectorAll('.stars li');

/*
 * Event Listeners
 */

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
      } else {
        notMatching(firstCard, secondCard);
      }
    }
  }
});

/*
 * Functions
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

// keep track of player moves
function playerMoves() {
  movesCount++;
  moves.textContent = movesCount;
}

// hide stars
function hideStar() {
  if (movesCount === 10) {
    stars[2].setAttribute('style', 'display: none');
  } else if (movesCount >= 20) {
    stars[1].setAttribute('style', 'display: none');
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

// TODO: Use this for timer https://albert-gonzalez.github.io/easytimer.js/

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
