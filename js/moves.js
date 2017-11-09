 /*
  * tracks moves
  */
  // update moves
function updateMoves() {
    moves += 1;
    $('#moves').html(`${moves} Moves`);
    if (moves == 24) {
        addBlankStar();
    }
    else if (moves == 15) {
        addBlankStar();
    }
  return moves;
}
