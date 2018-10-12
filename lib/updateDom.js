const colors = ['#C39953', '#A17A74', '#6D9BC3', '#CD607E', 
    '#AD6F69', '#2E2D88', '#AB92B3', '#676767', '#6EAEA1', '#AE98AA', 
    '#BBB477', '#AD4379', '#B768A2', '#8BA8B7', '#5DA493', '#9E5E6F',
    '#DA2C43', '#778BA5', '#5FA778', '#5F8A8B', '#914E75', '#8A496B', '#56887D'];

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

  launchActionPopup(mainInfo, action) {
    $('.action-popup').removeClass('hide');
    $('.action-popup-main-info').text(mainInfo);
    $('.action-popup-secondary-info').text(action);
    $('.dark-overlay').removeClass('hide');
  },

  closeActionPopup() {
    $('.action-popup').addClass('hide');
    $('.dark-overlay').addClass('hide');
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
  disableSpinButton() {
    if (wheel.currentElement !== 'BANKRUPT' && wheel.currentElement !== 'LOSE A TURN') {
      $('.spin-button').attr("disabled", true);
    }
  },
  
  spinWheel(num, value) {

    this.generateElementsDom(data)

    for (let i = 0; i < num; i ++) {
      singleSpin();
    }
 
    setCurrentTile(value)

    function setCurrentTile(value) {
      let currentTile = $('.wheel-item')[4];
      if (typeof value === 'string') {
        $(currentTile).text(value);
        $(currentTile).prop({'style': 'font-size: 1em; padding: 18px 8px 18px;' }) 
      } else {
      $(currentTile).text(`$${value}`);
      $(currentTile).prop({'style': 'font-size: 2em; padding: 10px;' });
      let colorNum = Math.round(Math.random() * 22);
      $(currentTile).css({'background-color': colors[colorNum]});
      }
    }

    function singleSpin() {
      $('.wheel-item').each( (i, item) => {
        var nextItem = $('.wheel-item')[i + 1];
        const firstItem = $('.wheel-item')[0]
        if (i === 12) {
          nextItem = $('.wheel-item')[12];
          $(item).text($(firstItem).text())
          $(item).prop({"style": $(firstItem).attr('style')})
        } else {
        $(item).text($(nextItem).text())
        $(item).prop({"style": $(nextItem).attr('style')})
        }
      });
    }
  },
  
  resetElements() {
    $('.wheel-item').each((i, item) => {
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
  },
  
  generateBankruptOrLoseTurnWheelElement(wheelItem, tile) {
    $(wheelItem).prop({'style': 'font-size: 1em; padding: 18px 8px 18px;' })
    $(wheelItem).text(tile);
  }
};


if (typeof module !== 'undefined') {
  module.exports = updateDom;
} 
