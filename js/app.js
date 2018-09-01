/*
 * Create a list that holds all of your cards
 */

// capture when a card in the deck is clicked
// add/remove classes on the clicked card to show & hide the card & icon (i.e flip the card)
const deck = document.querySelector('.deck');

deck.addEventListener('click', function(evt) {
  const clickedCard = evt.target;
  if (clickedCard.classList.contains('card')) {
    toggleCards(clickedCard);
  }
});

function toggleCards(clickedCard) {
  clickedCard.classList.toggle('open');
  clickedCard.classList.toggle('show');
}

// push the clicked cards into an array

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
