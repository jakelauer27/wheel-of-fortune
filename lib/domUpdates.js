const updateDom = {

  ///////INDEX DOM

  newGameDom() {
    $('.player1-name').text($('.input-player1-name').val());
    $('.player2-name').text($('.input-player2-name').val());
    $('.player3-name').text($('.input-player3-name').val());
    $('.start-game-popup').addClass('hide');
    $('.dark-overlay').addClass('hide');
    $('.player1').addClass('highlight');
  },

  attemptSolve() {
    $('.solve-popup').removeClass('hide');
    $('.dark-overlay').removeClass('hide');
  },

  submitGuessDom() {
    $('.solve-popup').addClass('hide');
    $('.dark-overlay').addClass('hide');
    $('.solve-input').val('');
  },

  instruct(action) {
    $('.instructions-current-player').text(`${game.playerNames[game.currentPlayerNameIndex]}:`);
    $('.instructions-content').text(action)
  },

  /////GAME DOM

  nextPlayerDom(player) {
    $(`.${currentPlayer.name}`).addClass('highlight');
  },

  ////Round DOM


  displayNewPuzzle(puzzle) {
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
  },

  resetPuzzleDom() {
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
  },

  //////Player DOM


  selectVowelDom(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
    if (puzzle.solution.includes(letter)) {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          $(`.${letter}`).removeClass('hide-letter')
        };
      });
    };
  },

  selectConsonantDom(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
    if (puzzle.solution.includes(letter)) {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          $(`.${letter}`).removeClass('hide-letter')
        };
      });
    };
  },

  addScoreDom(player) {
    $(`.${player.name}-value-score`).text(currentPlayer.score);
  },

  addTotalDom(player) {
    $(`.${player.name}-value-total`).text(player.total);
    $(`.${player.name}-value-score`).text(player.score);
  },

  bankruptDom() {
    $(`.${currentPlayer.name}-value-score`).text(currentPlayer.score);
  },
};
