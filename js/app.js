
// a list that holds all the cards
// for DEBUGGING: var stack = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt"];
var stack = ["fa-diamond", "img/baseline-logo-vertical.png", "img/debug-logo-white.png", "fa-bolt", "img/verily-V.png", "img/liftware-logo.png", "fa-bicycle", "fa-bomb"];
//track the number of moves (pair match attempts) player has made
var moves = 0;
// Track the cards that are currently turned over
var openCards = [];
// Tracks if the game has started or not.
var gameStarted = false;
// tracks the number of successful matches
var matchesFound = 0;
/*
 * Timer function.
 */

 //note that this timer was copied from an opensource Github repo: https://github.com/sarah-maris/memory-game/blob/master/js/game.js

//a bunch of time related variables
var startTime;
var now;
var elapsed;
var currentTime

function gameTimer() {
  startTime = new Date().getTime();
  // Update the timer every second
  timer = setInterval(function() {
    now = new Date().getTime();
    // Find the time elapsed between now and start
    elapsed = now - startTime;

    // Calculate minutes and seconds
    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    // Add starting 0 if seconds < 10
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    currentTime = minutes + ':' + seconds;

    // Update clock on game screen and modal
    $('#clock').html(`Timer ${currentTime}`);
  }, 750);

};

// stop timer, freezes current time
function stopTimer() {
    clearInterval(timer);
}

// resets timer to 0:00
function resetTimer() {
  let newTime = new Date().setHours(00, 00, 00);
  // Calculate minutes and seconds
  let minutes = Math.floor((newTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((newTime % (1000 * 60)) / 1000);

  // Add starting 0 if seconds < 10
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  currentTime = minutes + ':' + seconds;
  $('#clock').html(`Timer ${currentTime}`);
}

/*
 * Functions that enable game to display the cards on the page
 */
 // Takes in a card name and adds each card's HTML to the page.
 function createCard(card) {
   console.log(card);
   if (card.includes("fa-")) {
     $("#deck").append(`<li class="card"><i class="fa ${card}"></i></li>`);
   }
   else {
     $("#deck").append(`<li class="card"><i class="${card}"></i><img src="${card}"</li>`);
   }
 }

 // generates random arrangement of cards from the deck.
 function dealCards() {
   // creates two copies of each card, since it's a matching game
   for (var i = 0; i < 2; i++) {
     stack = shuffle(stack);
     //loops through each card and creates its HTML
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
        gameTimer();
    }

    if (openCards.length === 0) {
        $(this).toggleClass("show open");
        openCards.push($(this));
        disableClick();
    }
    else if (openCards.length === 1) {
        $(this).toggleClass("show open");
        openCards.push($(this));
        setTimeout(checkMatch, 800);
    }
}

// Enable click on the open cards
function enableClick() {
    openCards[0].click(flipCard);
  }
// function to clear openCards array
function removeOpenCards() {
  openCards = [];
}

// check openCards array to see if the two cards match
function checkMatch() {
  // increment moves
  updateMoves();

  //match case
  if (openCards[0][0].firstChild.className === openCards[1][0].firstChild.className) {
    openCards[0].addClass("match");
    openCards[1].addClass("match");
    checkWin();
    disableClick();
    removeOpenCards();
  }
  //not a match case
  else {
    openCards[0].toggleClass("show open");
    openCards[1].toggleClass("show open");
    enableClick();
    removeOpenCards();
  }
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
  $(".stars").children().last().remove();
}

 // updates moves
function updateMoves() {
   moves += 1;
   $('#moves').html(`${moves} Moves`);
   if (moves === (1.5*stack.length) || moves === (2*stack.length)) {
       loseStar();
   }
   else if (moves === (3*stack.length)) {
     loseStar();
     resetGame();
   }
 return moves;
}

// check whether the game is finished or not
function checkWin() {
    matchesFound += 1;
    if (matchesFound == stack.length) {
      setTimeout(showResults, 750); /* gives the user a second to look at the final match before showing the success modal*/
    }
}

// reset the game
function resetGame() {
    stopTimer();
    resetTimer();
    gameStarted = false;
    moves = 0;
    matchesFound = 0;
    $('#deck').empty();
    $('.stars').empty();
    $('.container')[0].style.display = "";
    $('#success-result')[0].style.display = "none";
    playGame();
}
// reset the game when player clicks the reset button
$('.restart').click(resetGame);

// game start function
function playGame() {
  //full stars at the beginning of the game
  fullStars();
  dealCards();
  $('.card').click(flipCard);
  $('#moves').html("0 Moves");
}


// shows successful result when player reaches the end of the game
function showResults() {
    $('#success-result').empty();
    stopTimer();
    //appends to the HTML to create the success modal
    var scoreBoard = `
        <span class="close">&times;</span>
        <p class="success-top""> You did it! Congratulations!</p>
        <p class = "success">
            <span class="score-titles">Total Moves:</span>
            <span class="score-values">${moves}</span>
        </p>
        <div class="success">
        <i class="fa fa-star fa-3x"></i>
        <i class="fa ${ (moves > (2.5*stack.length)) ? "fa-star-o" : "fa-star"}  fa-3x"></i>
        <i class="fa ${ (moves > (2*stack.length)) ? "fa-star-o" : "fa-star"} fa-3x"></i>
        </div>
        <div class = "success">
            <span class="timer"><span id="clock">Your Time: ${currentTime}</span>
        </div>
        <div class="success-bottom">
        <span class="reset">Play Again!</span>
        </div>
          `;
    $('#success-result')[0].style.display = "block";
    $('#success-result').append($(scoreBoard));
    // when the user clicks the reset button, they start afresh
    $('.reset').click(resetGame);
    // When the user clicks on (x) in the modal, close the modal
    $('.close').click(function() {
      $('#success-result')[0].style.display = "none";
    });
}

// start the game
playGame();
