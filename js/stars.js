/*
 * Set start of game with full stars
 */
 function fullStars() {
     for (var i = 0; i < 3; i++){
       $(".stars").append('<li><i class="fa fa-star"></i></li>');
     }
 }

 /*
  * reduces stars by one
  */
  function loseStar() {
    $(".stars").remove('<li><i class="fa fa-star"></i></li>');
  }
