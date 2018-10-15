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
    $('.instructions-current-player').text(`${game.players[game.currentPlayerIndex].name}:`);
    $('.instructions-content').text(action)
  },

  launchActionPopup(mainInfo, action) {
    $('.action-popup').removeClass('hide');
    $('.action-popup-main-info').text(mainInfo);
    $('.action-popup-secondary-info').html(action);
    $('.dark-overlay').removeClass('hide');
  },

  closeActionPopup() {
    $('.action-popup').addClass('hide');
    $('.dark-overlay').addClass('hide');
  },
 
  /////GAME DOM

  endTurn() {
    $(`.${currentPlayer.playerNumber}`).removeClass('highlight');
  },

  nextPlayerDom() {
    this.toggleSpinButton(false);
    $(`.${currentPlayer.playerNumber}`).addClass('highlight');
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
      if (letter === '&' || letter === '-' || letter === "'") {
        $(tiles[index]).removeClass('hide-letter');
      }
    });
    $('.hint').text(puzzle.category);
    $('.round').text(`Round ${round.roundNum}`);
    if (round.round === 'Bonus') {
      $('.round').text('Bonus Round');
    }
  }, 

  displayBonusLetters(solution) {
    for (let i = 0; i < solution.length; i += 4) {
      if (solution[i] !== ' ') {
        $(`.${solution[i]}`).removeClass('hide-letter');
        $(`.${solution[i]}`).addClass('selected');
        $(`.letter-${solution[i].toLowerCase()}`).attr('disabled', 'true');
        if ($('.selected').length > solution.length / 4) {
          break;
        }
      }
    }
  },

  resetPuzzleDom() {
    if (puzzle) {
      puzzle.solution.forEach( (letter, i) => {
        const tiles = $('.tile');
        const index = 19 - Math.floor(puzzle.solution.length / 2) + i; 
        $(tiles[index]).text('')
        $(tiles[index]).removeClass(letter)
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
          $(`.${letter}`).removeClass('hide-letter');
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
          $(`.${letter}`).removeClass('hide-letter');
        }
      });
    }
  },

  disableLetters() {
    $('.letter').each( (i, letter) => {
      $(letter).prop('disabled', true);
    });
  },

  disableVowels() {
    $('.vowel').each( (i, letter) => {
      $(letter).prop('disabled', true);
    });
  },

  disableConsonants() {
    $('.consonant').each( (i, letter) => {
      $(letter).prop('disabled', true);
    });
  },

  enableLetters() {
    var guessedLetters = [];
    $('.past-guess').each( (i, guessedLetter) => {
      guessedLetters.push($(guessedLetter).text())
    });
    $('.letter').each( (i, letter) => {
      if (!guessedLetters.includes($(letter).text())) {
        $(letter).prop('disabled', false);
      }
    });
  },

  addScoreDom(player) {
    $(`.${player.playerNumber}-value-score`).text(currentPlayer.score);
  },

  addTotalDom(player) {
    $(`.${player.playerNumber}-value-total`).text(player.total);
    $(`.${player.playerNumber}-value-score`).text(player.score);
  },

  bankruptDom() {
    $(`.${currentPlayer.playerNumber}-value-score`).text(currentPlayer.score);
  },

  /////WHEELDOM 

  toggleSpinButton(val) {
    if (wheel.currentElement !== 'BANKRUPT' && wheel.currentElement !== 'LOSE A TURN') {
      $('.spin-button').attr("disabled", val);
    }
  },
  
  spinWheel(num, value) {
    this.resetElements()
    if (round.round === 'Bonus') {
      this.generateElementsDom(bonusWheel.elements)
    } else {
      this.generateElementsDom(wheel.elements)
    }
    for (let i = 0; i < num; i ++) {
      singleSpin();
    }
    setCurrentTile(value);
    
    function singleSpin() {
      $('.wheel-item').each( (i, item) => {
        var nextItem = $('.wheel-item')[i + 1];
        const firstItem = $('.wheel-item')[0]
        if (i === 12) {
          nextItem = $('.wheel-item')[12];
          $(item).text($(firstItem).text());
          $(item).prop({"style": $(firstItem).attr('style')});
        } else {
          $(item).text($(nextItem).text());
          $(item).prop({"style": $(nextItem).attr('style')});
        }
        if ($(item).text().length > 6) {
          $(item).css({'font-size': '1em', 'padding': '18px 8px 18px' }) 
        } else {
          $(item).css({'font-size': '2em', 'padding': '10px'});
        }
      });
    }

    function setCurrentTile(value) {
      let currentTile = $('.wheel-item')[4];
      if (typeof value === 'string') {
        $(currentTile).text(value);
        $(currentTile).prop({'style': 'font-size: 1em; padding: 18px 8px 18px;' }) 
      } else {
        $(currentTile).text(`$${value}`);
        $(currentTile).prop({'style': 'font-size: 2em; padding: 10px;' });
        let colorNum = Math.round(Math.random() * 22);
        $(currentTile).css({'background-color': data.colors[colorNum]});
      }
    }
  },
  
  resetElements() {
    $('.wheel-item').each((i, item) => {
      let colorNum = Math.round(Math.random() * 22);
      $(item).css({'background-color': data.colors[colorNum]});
      $(item).css({'font-size': '2em'}, {'padding': '10px'})
    });
  },
  
  generateElementsDom(wheelElements) {
    this.resetElements()
    const wheelItems = $('.wheel-item');
    for (let i = 0; i <= 12; i++) {
      $(wheelItems[i]).text(`$${wheelElements[i]}`);
      if (typeof wheelElements[i] === 'string' && wheelElements[i] !== '?') {
        updateDom.generateBankruptOrLoseTurnWheelElement(wheelItems[i], wheelElements[i])
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
