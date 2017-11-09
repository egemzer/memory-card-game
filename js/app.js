
// a list that holds all the cards
var stack = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
//track the number of moves (pair match attempts) player has made
var moves = 0;
// Track the cards that are currently turned over
var openCards = [];
// Tracks if the game has started or not.
var gameStarted = false;

/*
 * Functions that enable game to display the cards on the page
 */
 // adds each card's HTML to the page
 function createCard(card) {
     $("#deck").append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
 }

 // generates random arrangement of cards from the deck.
 function dealCards() {
   // creates two copies of each card, since it's a matching game
   for (var i = 0; i < 2; i++) {
     stack = shuffle(stack);
     //loops through each card and create its HTML
     stack.forEach(createCard);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
    //console.log(array);
}

// Disable click of the open cards
function disableClick() {
    openCards.forEach(function (card) {
      card.off('click');
    });
}

// card flipping functions
function flipCard() {

    // start the timer when first card is opened
    if (gameStarted == false) {
        gameStarted = true;
        //timer.start();
    }

    if (openCards.length === 0) {
        $(this).toggleClass("show open");
        openCards.push($(this));
        disableClick();
    }
    else if (openCards.length === 1) {
        // increment moves
        updateMoves();
        $(this).toggleClass("show open");
        openCards.push($(this));
    }
}

// Enable click on the open cards
function enableClick() {
    openCards[0].click(toggleCard);
  }
// function to clear openCards array
function removeOpenCards() {
  openCards = [];
}

// check openCards array to see if the two cards match
function checkMatch() {
  if (openCards[0]==openCards[1]) {
    //<match>
    $(this).toggleClass("match");
    $(this).toggleClass("match");
    removeOpenCards();
  }
  else {
    //<not match>
    $(this).toggleClass("show open");
    $(this).toggleClass("show open");
    removeOpenCards();
  }
  updateMoves();
}

/*
 * Star handling functions
 */
 // Set start of game with full stars
 function fullStars() {
     for (var i = 0; i < 3; i++){
       $(".stars").append('<li><i class="fa fa-star"></i></li>');
     }
 }

// reduces stars by one
function loseStar() {
  $(".stars").remove('<li><i class="fa fa-star"></i></li>');
}

 // updates moves
function updateMoves() {
   moves += 1;
   $('#moves').html(`${moves} Moves`);
   if (moves == 20) {
       loseStar();
   }
   else if (moves == 12) {
       loseStar();
   }
 return moves;
}

// game start function
function playGame() {
  //full stars at the beginning of the game
  fullStars();
  dealCards();
  $('.card').click(flipCard);
  $('#moves').html("0 Moves");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// start the game
playGame();
