$('.input-player-name').on('keyup', () => updateDom.enableNewGameBtn())
$('.btn-start-game').on('click', startNewGame);
$('.spin-button').on('click', spinWheel);
$('.new-game-button').on('click', resetGame);
$('.solve-button').on('click', () => updateDom.attemptSolve());
$('.action-popup-button').on('click', (e) => updateDom.closeActionPopup(e));
$('.player2-ai-checkbox').on( 'click', function() {generateAiName(2);});
$('.player3-ai-checkbox').on( 'click', function() {generateAiName(3);});
$('.vowels-list').on('click', (e) => {
  if ($(e.target).hasClass('vowel')) {
    round.round === "Bonus" ? bonusRoundChooseVowel(e) : chooseVowel(e);
  }
});

$('.consonants-list').on('click', (e) => {
  if ($(e.target).hasClass('consonant')) {
    round.round === "Bonus" ? bonusRoundChooseConsonant(e) : chooseConsonant(e);
  }
});

$('.submit-guess-button').on('click', (e) => {
  buttonClick.play();
  round.round === "Bonus" ? bonusRoundSubmitGuess(e) : submitGuess(e);
});

var game;
var player1;
var player2;
var player3;
var wheel;
var puzzle;
var round;
var currentPlayer;

///////////////////////////////START GAME////////////////////////////////

function startNewGame() {
  buttonClick.play()
  game = new Game(...createPlayers());
  round = new Round();
  wheel = new Wheel();
  puzzle = new Puzzle();
  currentPlayer = player1;
  wheel.generateElements(data);
  puzzle.generatePuzzle();
  updateDom.newGame();
  updateDom.instruct('Spin the wheel or solve the puzzle!');
  updateDom.resetPuzzle();
  updateDom.displayNewPuzzle(puzzle);
  updateDom.disableLetters();
  updateDom.launchActionPopup('Game Start', `${currentPlayer.name}, It's your turn`);
  if (currentPlayer.ai) {
    aiTurn();
  }
}

function createPlayers() {
  var players = [player1, player2, player3];
  players.forEach( (player, i) => {
    var playerInfo = [$(`.input-player${i + 1}-name`).val(), `player${i + 1}`];
    var playerAiBox = $(`.player${i + 1}-ai-checkbox`).prop('checked');
    players[i] = !playerAiBox ? new Player(...playerInfo) : new AiPlayer(...playerInfo);
  })
  player1 = players[0];
  player2 = players[1];
  player3 = players[2];
  return players;
}

function generateAiName(player) {
  data.aiNames.sort( () => 0.5 - Math.random());
  if($(`.player${player}-ai-checkbox`).prop('checked')) {
    $(`.input-player${player}-name`).val(data.aiNames[0]);
  } else {
   $(`.input-player${player}-name`).val('');
  }
  updateDom.enableNewGameBtn();
}

///////////////////////////////WHEEL SPIN////////////////////////////////

function spinWheel() {
  spinSound.play();
  if (round.round === 'Bonus') {
    bonusSpin();
    return;
  } 
  var currentWheelValue = wheel.spin();
  updateDom.instruct('Choose a letter or solve the puzzle');
  updateDom.enableLetters();
  if (currentPlayer.score === 0) {
    updateDom.disableVowels();
  }
  if (badSpin[currentWheelValue]) {
    badSpin[currentWheelValue]();
  }
} 

function bonusSpin() {
  bonusWheel.spin();
  updateDom.instruct('Choose 3 consonants and a vowel, then solve the puzzle!');
  updateDom.enableLetters();
 }

const badSpin = {
  'BANKRUPT': () =>  {
    updateDom.addScoreNotifier(`- $${currentPlayer.score}`);
    currentPlayer.bankrupt();
    game.nextPlayer('BANKRUPT!');
  },
  'LOSE A TURN': () => {
    game.nextPlayer('LOSE A TURN!');
  }
}

///////////////////////////////CHOOSE LETTERS////////////////////////////////

function chooseVowel(e) {
  currentPlayer.addScore(-100);
  updateDom.addScoreNotifier('- $100');
  updateDom.selectVowel(e, $(e.target).text())
  if (!puzzle.solution.includes($(e.target).text())) {
    game.nextPlayer();
    return;
  }
}

function chooseConsonant(e) {
  const letter = $(e.target).text();
  updateDom.selectConsonant(e, letter);
  if (!puzzle.solution.includes(letter)) {
    game.nextPlayer(); 
  } else {
    wheel.spinAgain();
    let totalScoreAdded = 0;
    puzzle.solution.forEach( (solutionLetter) => {
      if (solutionLetter === letter) {
        totalScoreAdded += wheel.currentElement;
        currentPlayer.addScore(wheel.currentElement);
      }
    });
    updateDom.addScoreNotifier(`+ $${totalScoreAdded}`);
  }
}

///////////////////////////////GUESS FUNCTIONS////////////////////////////////

function submitGuess() {
  const playerGuess = $('.solve-input').val().toUpperCase();
  const solution = puzzle.solution.join('');
  if (playerGuess === solution) {
    newRound();
  } else {
    game.nextPlayer();
    incorrectSolveSound.play();
  } 
  updateDom.submitGuess();
}

///////////////////////////////UPDATING ROUND AND DETERMINING WINNER////////////////////////////////


function newRound() {
  currentPlayer.addScore(currentPlayer.score);
  currentPlayer.addTotal();
  player1.bankrupt();
  player2.bankrupt();
  player3.bankrupt();
  round.nextRound();
  updateDom.resetPuzzle();
  if (round.round === 'Bonus') {
    startBonusRound();
    setTimeout( () => {
      updateDom.displayBonusLetters(puzzle.solution);
    }, 500)
  } else {
    correctSolveSound.play()
    puzzle.generatePuzzle();
    wheel.generateElements(data);
    updateDom.instruct('Spin the wheel or solve the puzzle!');
    updateDom.launchActionPopup('Correct!', `${game.players[game.currentPlayerIndex].name}, Spin the Wheel!`, );
  }
  updateDom.displayNewPuzzle(puzzle);
  updateDom.toggleSpinButton(false);
  updateDom.disableLetters();
  setTimeout( () => {
    if (currentPlayer.ai) {
      aiTurn();
    }
  }, 1600)
}

function determineWinner() {
  updateDom.endTurn();
  game.players.sort( (a, b) => {
    return a.total < b.total;
  })
  currentPlayer = game.players[0];
  game.currentPlayerIndex = 0;
  updateDom.nextPlayer();
  return currentPlayer.name;
}

///////////////////////////////AI////////////////////////////////


function aiTurn() {
  $('.ai-turn-notification').removeClass('hide');
  var guessedTiles = $('.display-tile').length - $('.hide-letter').length;
  var goodSpin;

  //////////Clicks ok on the popup after .5s
  setTimeout( () => {
    $('.action-popup-button').trigger('click');
    $('.dark-overlay').removeClass('hide');

    ////////Spins wheel after 1s
    setTimeout( () => {
      ////if more than 2/3 is filled in, the computer will solve the puzzle and the turn will end. Else the computer will guess.
      if (guessedTiles > ($('.display-tile').length * 2 / 3 )) {
        currentPlayer.solve();
        return;
      }
      ///////spinWheel returns true if spin value isn't bankrupt or lose turn.
      goodSpin = currentPlayer.spinWheel();
      //////If it's a bad spin the turn ends.
      if (!goodSpin) {
        return;
      }
      /////if it's a good spin, The computer will guess a letter.
      setTimeout( () => {
          aiGuess();
      }, 1500)
    }, 1000);
  }, 500)
}

function aiGuess() {
  const vowels = ['A', 'E', 'I', 'O', 'U'];

  ///////guessResult is an object says says if the guess was correct or incorrect and the letter guessed.
  const guessResult = currentPlayer.chooseLetter();

  /////If it's a correct consonant guess start the turn again,
  //// If it's a correct vowel guess, wait .7s and guess again
  //// If it's incorrect, the turn ends.
  if (guessResult.correct) {
    setTimeout( () => {
      if (vowels.includes(guessResult.chosenLetter)) {
        setTimeout(() => {
          aiGuess();
        }, 700)
      } else {
        aiTurn();
      } 
    }, 1500) 
  }
}

//////////////////BONUS ROUND FUNCTIONS///////////////////////

function startBonusRound() {
  winSound.play();
  winner = determineWinner();
  bonusWheel = new BonusWheel();
  bonusWheel.randomSortElements();
  puzzle.generateBonusPuzzle();
  updateDom.generateElements(bonusWheel.elements);
  updateDom.spinWheel(1, 10000);
  if (currentPlayer.ai) {
    $(`.player1`).addClass('highlight');
    $(`.${currentPlayer.playerNumber}`).removeClass('highlight');
    updateDom.launchActionPopup(`${winner} Wins!`, `You were beaten by a computer player. Play 
    out the bonus round or click the settings icon to start a new game. <br><br> Bonus Round Instructions: <br><br> Spin the bonus Wheel.
    Choose 1 vowel and 3 consonants. Then try to solve the puzzle to win your bonus prize`);
  } else {
    updateDom.launchActionPopup(`${winner} Wins!`, `Spin the bonus Wheel.
    Choose 1 vowel and 3 consonants. Then try to solve the puzzle to win your bonus prize!` );
  }
}

function bonusRoundChooseVowel(e) {
  updateDom.selectVowel(e, $(e.target).text());
  updateDom.disableVowels();
}

function bonusRoundChooseConsonant(e) {
  let consonantCount = 0;
  updateDom.selectConsonant(e, $(e.target).text());
  $('.consonant').each( (i, letter) => {
    if ($(letter).attr('disabled') === 'disabled') {
      consonantCount ++;
    }
  });
  if (consonantCount > 2) {
    updateDom.disableConsonants();
  }
}

function bonusRoundSubmitGuess(e) {
  const playerGuess = $('.solve-input').val().toUpperCase();
  const solution = puzzle.solution.join('');
  updateDom.closeActionPopup(e);
  updateDom.disableLetters();
  updateDom.displayFullPuzzle(solution);
  if (playerGuess === solution) {
    winSound.play();
    currentPlayer.addScore(bonusWheel.currentElement);
    currentPlayer.addTotal();
    updateDom.launchActionPopup('CORRECT', `You won an additional $${bonusWheel.currentElement}!  Bringing your total
    winnings to $${currentPlayer.total}! Congrats!`);
  } else {
    incorrectSolveSound.play();
    updateDom.launchActionPopup('INCORRECT', `You did still win $${currentPlayer.total}! Congrats!`);
  } 
}

function resetGame() {
  player1.reset();
  player2.reset();
  player3.reset();
  $('.start-game-popup').removeClass('hide');
  $('.dark-overlay').removeClass('hide');
  $('.btn-start-game').prop('disabled', true);
  $(`.${currentPlayer.playerNumber}`).removeClass('highlight');
  updateDom.toggleSpinButton(false);
  updateDom.enableNewGameBtn();
}

/////////////////////////////////HOW TO PLAY//////////////////////////

$('.how-to-play-button').on('click', () => {
  updateDom.launchActionPopup("How to Play", `In order to win money, just spin the wheel. <br><br> 
  If the wheel lands on a dollar value, guess a consonant. If it's in the puzzle,
  you win the amount of the spin multiplied by the number of times the letter appears
  in the puzzle. For instance, if you spun $300, chose the letter L, and there were 
  three L's in the puzzle, you would get $900.  <br><br> 
  In order to add a vowel to the puzzle, you must buy it.  Buying a vowel costs 
  you a flat fee of $100, regardless of how many of a particular vowel there are.  
  However, regardless of what kind of letter you pick, if you miss, your turn is over, 
  and control goes to the next player. <br><br>
  Note that picking a letter that is in the puzzle does not necessarily guarantee your winnings. 
  You merely have the amount credited to you, your receipt of them pending your winning the round. 
  These winnings must be "locked in", so to speak, by winning the round.  If you do not win the
  round, any money credited to you is lost.  Everyone starts fresh each round, though any money 
  credited and then "locked in" during previous rounds is the contestant's to keep no matter what happens. To win 
  the round, solve the puzzle clicking the solve button and entering the correct solution. 
  Solving the puzzle doubles your round score, then adds it to your total. <br><br>
  The Player with the highest total amount at the end of 4 rounds wins and gets to play a bonus round
  with a special bonus wheel.`);
});
