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

  endTurn() {
    $(`.${currentPlayer.name}`).removeClass('highlight');
  },

  nextPlayerDom() {
    $('.spin-button').attr("disabled", false);
    $(`.${currentPlayer.name}`).addClass('highlight');
  },

  ////puzzle DOM


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
    $('.round').text(`Round ${round.roundNum}`);
  },

  resetPuzzleDom() {
    if (puzzle) {
      puzzle.solution.forEach( (letter, i) => {
        const tiles = $('.tile');
        const index = 19 - Math.floor(puzzle.solution.length / 2) + i; 
          $(tiles[index]).text('')
          $(tiles[index]).removeClass(`display-tile hide-letter ${letter.toUpperCase()}`)
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
        }
      });
    }
  },

  selectConsonantDom(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
    if (puzzle.solution.includes(letter)) {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          $(`.${letter}`).removeClass('hide-letter')
        }
      });
    }
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

  /////WHEELDOM 

  generateBankruptOrLoseTurnWheelElement(wheelItem, tile) {
    $(wheelItem).addClass('bankrupt')
    $(wheelItem).text(tile);
  },

  disableSpinButton() {
    if (wheel.currentElement !== 'BANKRUPT' && wheel.currentElement !== 'LOSE A TURN') {
      $('.spin-button').attr("disabled", true);
    }
  },

  resetElements() {
    const wheelItems = $('.wheel-item');
    const colors = ['#C39953', '#A17A74', '#6D9BC3', '#CD607E', 
      '#AD6F69', '#2E2D88', '#AB92B3', '#676767', '#6EAEA1', '#AE98AA', 
      '#BBB477', '#AD4379', '#B768A2', '#8BA8B7', '#5DA493', '#9E5E6F',
      '#DA2C43', '#778BA5', '#5FA778', '#5F8A8B', '#914E75', '#8A496B', '#56887D'];
    wheelItems.each((i, item) => {
      let colorNum = Math.round(Math.random() * 22);
      $(item).css({'background-color': colors[colorNum]});
      if ($(item).hasClass('bankrupt')) {
        $(item).removeClass('bankrupt');
      }
      if ($(item).hasClass('lose-turn')) {
        $(item).removeClass('lose-turn');
      }
    });
  },

  generateElementsDom(data) {
    const wheelItems = $('.wheel-item');
    for (let i = 0; i <= 12; i++) {
      $(wheelItems[i]).text(`$${data.wheel[i]}`);
      if (typeof data.wheel[i] === 'string') {
        updateDom.generateBankruptOrLoseTurnWheelElement(wheelItems[i], data.wheel[i])
      }
    }
  }

};

if (typeof module !== 'undefined') {
  module.exports = updateDom;
} 
