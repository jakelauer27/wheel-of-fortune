///////INDEX DOM

function newGameDom(){
  $('.player1-name').text($('.input-player1-name').val());
  $('.player2-name').text($('.input-player2-name').val());
  $('.player3-name').text($('.input-player3-name').val());
  $('.start-game-popup').addClass('hide');
  $('.dark-overlay').addClass('hide');
  $('.player1').addClass('highlight');
}

function attemptSolve() {
  $('.solve-popup').removeClass('hide');
  $('.dark-overlay').removeClass('hide');
}

function submitGuessDom() {
  $('.solve-popup').addClass('hide');
  $('.dark-overlay').addClass('hide');
  $('.solve-input').val('');
}

function instruct(action) {
  $('.instructions-current-player').text(`${game.playerNames[game.currentPlayerNameIndex]}:`);
  $('.instructions-content').text(action)
}

/////GAME DOM

function nextPlayerDom() {
  $(`.${currentPlayer.name}`).addClass('highlight');
}

////Round DOM


function displayNewPuzzle(puzzle) {
  puzzle.solution.forEach( (letter, i) => {
    const tiles = $('.tile');
    const index = 19 - Math.floor(puzzle.solution.length / 2) + i; 
    if (letter !== ' ') {
    $(tiles[index]).text(letter)
    $(tiles[index]).addClass(`display-tile hide-letter ${letter.toUpperCase()}`)
    }
    if (letter === '&' || letter === '-') {
      $(tiles[index]).removeClass('hide-letter');
    }
  });
  $('.hint').text(puzzle.category);
  $('.round').text(`Round ${this.roundNum}`);
}

function resetPuzzleDom() {
  if (puzzle) {
    puzzle.solution.forEach( (letter, i) => {
      const tiles = $('.tile');
      const index = 19 - Math.floor(puzzle.solution.length / 2) + i; 
      if (letter !== ' ') {
      $(tiles[index]).text('')
      $(tiles[index]).removeClass(`display-tile hide-letter ${letter.toUpperCase()}`)
      }
    });
    $('.past-guess').each( (i, guess) => {
      $(`.consonant-${$(guess).text().toLowerCase()}`).attr('disabled', false);
      $(`.vowel-${$(guess).text().toLowerCase()}`).attr('disabled', false);
      guess.remove()
    })
  }
}


