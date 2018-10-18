const updateDom = {

  ///////INDEX DOM

  newGame() {
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

  submitGuess() {
    $('.solve-popup').addClass('hide');
    $('.dark-overlay').addClass('hide');
    $('.solve-input').val('');
  },

  instruct(action) {
    $('.instructions-current-player').text(`${game.players[game.currentPlayerIndex].name}:`);
    $('.instructions-content').text(action);
  },

  launchActionPopup(mainInfo, action) {
    $('.action-popup').removeClass('hide');
    $('.action-popup-main-info').text(mainInfo);
    $('.action-popup-secondary-info').html(action);
    $('.dark-overlay').removeClass('hide');
  },

  closeActionPopup(e) {
    $(e.target).parent().addClass('hide');
    $('.dark-overlay').addClass('hide');
  },

  enableNewGameBtn() {
    if ($('.input-player1-name').val() !== '' &&
    $('.input-player2-name').val() !== '' &&
    $('.input-player3-name').val() !== '') {
      $('.btn-start-game').prop('disabled', false);
    }
  },

  /////GAME DOM

  endTurn() {
    $('.dark-overlay').removeClass('hide');
    $('.ai-turn-notification').addClass('hide');
    $(`.${currentPlayer.playerNumber}`).removeClass('highlight');
  },

  nextPlayer() {
    this.toggleSpinButton(false);
    $(`.${currentPlayer.playerNumber}`).addClass('highlight');
  },

  ////puzzle DOM

  countWordLength(puzzle) {
    var words = [{word1: 0}];
    var wordCount = 1;
    puzzle.forEach( letter => {
      if (letter !== ' ') {
        words[wordCount - 1][`word${wordCount}`] ++; 
      } else {
        wordCount ++;
        words.push({[`word${wordCount}`]: 0});
      }
    })
    return words;
  },

  displayNewPuzzle(puzzle) {
    var solutionDetails = this.countWordLength(puzzle.solution);
    const tiles = $('.tile');
    var words = 1;
    var nextRow = Math.floor((14 - (solutionDetails[0].word1)) / 2);
    if (solutionDetails.length <= 2) {
      nextRow += 14;
    }
    for (let i = 0; i < puzzle.solution.length; i++) {
      let tileIndex = nextRow + i;
      if (puzzle.solution[i] !== ' ') {
        $(tiles[tileIndex]).text(puzzle.solution[i]);
        $(tiles[tileIndex]).addClass(`display-tile hide-letter ${puzzle.solution[i].toUpperCase()}`);
        if (puzzle.solution[i] === '&' || puzzle.solution[i] === '-' || puzzle.solution[i] === "'") {
          $(tiles[tileIndex]).removeClass('hide-letter');
        }
      } else {
        words ++;
        nextRow += Math.ceil((14 - solutionDetails[words - 2][`word${words - 1}`]) / 2) + Math.floor((14 - solutionDetails[words - 1][`word${words}`]) / 2) - 1;
      }
    }
   this.displayHintAndRound();
  },

  displayHintAndRound() {
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

  resetPuzzle() {
    if (puzzle) {
      puzzle.solution.forEach( (letter, i) => {
        $('.tile').removeClass(`display-tile hide-letter ${letter.toUpperCase()}`);
        $('.tile').text('');
      });
      $('.past-guess').each( (i, guess) => {
        $(`.consonant-${$(guess).text().toLowerCase()}`).attr('disabled', false);
        $(`.vowel-${$(guess).text().toLowerCase()}`).attr('disabled', false);
        guess.remove();
      })
    } 
  },

  //////Player DOM

  selectVowel(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
    if (puzzle.solution.includes(letter)) {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          $(`.${letter}`).removeClass('hide-letter');
          chaChingSound.play();
        } 
      });
      return;
    }
    wrongLetterSound.play();
  },

  selectConsonant(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
    if (puzzle.solution.includes(letter)) {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          $(`.${letter}`).removeClass('hide-letter');
          chaChingSound.play();
        }
      });
      return;
    }
    wrongLetterSound.play();
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
      guessedLetters.push($(guessedLetter).text());
    });
    $('.letter').each( (i, letter) => {
      if (!guessedLetters.includes($(letter).text())) {
        $(letter).prop('disabled', false);
      }
    });
  },

  addScore(player) {
    $(`.${player.playerNumber}-value-score`).text(currentPlayer.score);
  },

  addTotal(player) {
    $(`.${player.playerNumber}-value-total`).text(player.total);
    $(`.${player.playerNumber}-value-score`).text(player.score);
  },

  bankrupt(player) {
    $(`.${player.playerNumber}-value-score`).text(player.score);
  },

  addScoreNotifier(amount) {
    const player = currentPlayer.playerNumber;
    $(`.${player}-add-score`).text(amount);
    $(`.${player}-add-score`).removeClass('hide');
    if (amount.split('').includes('-')) {
      $(`.${player}-add-score`).addClass('red');
    }
    setTimeout( () => {
      $(`.${player}-add-score`).addClass('hide');
      $(`.${player}-add-score`).removeClass('red');
    }, 2000)
  },

  /////WHEELDOM 

  toggleSpinButton(val) {
    if (wheel.currentElement !== 'BANKRUPT' && wheel.currentElement !== 'LOSE A TURN') {
      $('.spin-button').attr("disabled", val);
    }
  },
  
  spinWheel(num, value) {
    this.resetElements();
    round.round === 'Bonus' ? this.generateElements(bonusWheel.elements) : this.generateElements(wheel.elements);
    for (let i = 0; i < num; i ++) {
      this.singleSpin();
    }
    this.setCurrentTile(value);
    if (currentPlayer.score === 0) {
      this.disableVowels();
    }
  },

  singleSpin() {
    $('.wheel-item').each( (i, item) => {
      var nextItem = $('.wheel-item')[i + 1];
      const firstItem = $('.wheel-item')[0];
      if (i === 12) {
        $(item).text($(firstItem).text());
      } else {
        $(item).text($(nextItem).text());
      }
      if ($(item).text().length > 7) {
        $(item).css({'font-size': '1em', 'padding': '18px 8px 18px' });
      } else {
        $(item).css({'font-size': '2em', 'padding': '10px'});
      }
    });
  },

  setCurrentTile(value) {
    let currentTile = $('.wheel-item')[4];
    if (typeof value === 'string') {
      $(currentTile).text(value);
      $(currentTile).css({'font-size': '1em', 'padding': '18px 8px 18px' });
    } else {
      let colorNum = Math.round(Math.random() * 22);
      $(currentTile).text(`$${value}`);
      $(currentTile).css({'font-size': '2em', 'padding': '10px'});
      $(currentTile).css({'background-color': data.colors[colorNum]});
    }
  },
  
  resetElements() {
    $('.wheel-item').each((i, item) => {
      let colorNum = Math.round(Math.random() * 22);
      $(item).css({'background-color': data.colors[colorNum]});
      $(item).css({'font-size': '2em'}, {'padding': '10px'});
    });
  },
  
  generateElements(wheelElements) {
    this.resetElements();
    const wheelItems = $('.wheel-item');
    for (let i = 0; i <= 13; i++) {
      $(wheelItems[i]).text(`$${wheelElements[i]}`);
      if ($(wheelItems[i]).text().length > 7) {
        updateDom.generateBankruptOrLoseTurnWheelElement(wheelItems[i], wheelElements[i]);
      }
    }
  },
  
  generateBankruptOrLoseTurnWheelElement(wheelItem, tile) {
    $(wheelItem).css({'font-size': '1em', 'padding': '18px 8px 18px' });
    $(wheelItem).text(tile);
  },

  ///////////AI DOM///////////

  aiSpinWheel() {
    $('.spin-button').trigger('click');
  },

  aiChooseCorrectLetter(solution) {
    let correctLetter = null;
    for (let i = 0; i < solution.length; i++) {
      if ($(`.letter-${solution[i].toLowerCase()}`).attr('disabled') !== 'disabled'  
      && currentPlayer.chooseVowelCheck(solution[i])) {
        $(`.letter-${solution[i].toLowerCase()}`).trigger('click');
        correctLetter = solution[i];
        break;
      }
    }
    return correctLetter;
  },

  aiChooseIncorrectLetter() {
    var startingPoint = Math.round(Math.random() * 18);
    var incorrectLetter = null;
    var consonants = $('.consonant');
    for (let i = startingPoint; i < consonants.length; i ++) {
      if (i === consonants.length - 1) {
        i = 0;
      }
      if ($(consonants[i]).attr('disabled') !== 'disabled' 
      && !puzzle.solution.includes($(consonants[i]).text())) {
        $(consonants[i]).trigger('click');
        incorrectLetter = $(consonants[i]).text();
        break;
      }
    }
    return incorrectLetter;
  },

  aiSolve() {
    setTimeout( () => {
      $('.solve-button').trigger('click');
      $('.solve-input').val(puzzle.solution.join(''));
      setTimeout( () => {
        $('.submit-guess-button').trigger('click');
        setTimeout( () => {
          if (round.round !== 'Bonus') {
            $('.action-popup-button').trigger('click');
          } else { 
            currentPlayer = player1;
          }
        }, 1500)
      }, 2000)
    }, 1000)
  }
};

if (typeof module !== 'undefined') {
  module.exports = updateDom;
} 
