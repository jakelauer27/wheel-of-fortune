$('.btn-start-game').on('click', startNewGame);
$('.spin-button').on('click', spinWheel);
$('.solve-button').on('click', () => updateDom.attemptSolve());
$('.action-popup-button').on('click', () => updateDom.closeActionPopup());
$('.vowels-list').on('click', (event) => {
  round.round === "Bonus" ? bonusRoundChooseVowel(event) : chooseVowel(event);
});
$('.consonants-list').on('click', (event) => {
  round.round === "Bonus" ? bonusRoundChooseConsonant(event) : chooseConsonant(event);
});
$('.submit-guess-button').on('click', () => {
  round.round === "Bonus" ? bonusRoundSubmitGuess() : submitGuess();
});

var game;
var player1;
var player2;
var player3;
var wheel;
var puzzle;
var round;
var currentPlayer;

function startNewGame() {
  player1 = new Player($('.input-player1-name').val(), 'player1');
  player2 = new Player($('.input-player2-name').val(), 'player2');
  player3 = new Player($('.input-player3-name').val(), 'player3');
  game = new Game(player1, player2, player3)
  round = new Round()
  wheel = new Wheel();
  puzzle = new Puzzle()
  wheel.generateElements(data);
  puzzle.generatePuzzle();
  currentPlayer = player1;
  updateDom.newGameDom()
  updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!')
  updateDom.displayNewPuzzle(puzzle);
  updateDom.disableLetters();
}

function spinWheel(e) {
  if (round.round === 'Bonus') {
    var currentWheelValue = bonusWheel.spin();
    updateDom.instruct('CHOOSE 3 CONSONANTS AND A VOWEL. THEN SOLVE THE PUZZLE!');
  } else {
    var currentWheelValue = wheel.spin();
    updateDom.instruct('CHOOSE A LETTER OR SOLVE THE PUZZLE');
  }
  updateDom.enableLetters();
  if (currentWheelValue === 'BANKRUPT') {
    currentPlayer.bankrupt();
    game.nextPlayer('BANKRUPT!');
  }
  if (currentWheelValue === 'LOSE A TURN') { 
    game.nextPlayer('LOSE A TURN!');
  }
} 

function chooseVowel(e) {
  if ($(e.target).hasClass('vowel')) {
    currentPlayer.addScore(-100);
    updateDom.selectVowelDom(e, $(e.target).text())
    if (!puzzle.solution.includes($(e.target).text())) {
      game.nextPlayer();
    }
  }
}

function chooseConsonant(e) {
  if ($(e.target).hasClass('consonant')) {
    const letter = $(e.target).text();
    updateDom.selectConsonantDom(e, letter);
    if (!puzzle.solution.includes(letter)) {
      game.nextPlayer(); 
    } else {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          currentPlayer.addScore(wheel.currentElement);
        }
      });
    }
  }
}

function submitGuess() {
  const playerGuess = $('.solve-input').val().toUpperCase();
  const solution = puzzle.solution.join('');
  if (playerGuess === solution) {
    newRound();
  } else {
    game.nextPlayer();
  }
  updateDom.submitGuessDom();
}

function newRound() {
  currentPlayer.addScore(currentPlayer.score);
  player1.addTotal();
  player2.addTotal();
  player3.addTotal();
  round.nextRound();
  updateDom.resetPuzzleDom()
  if (round.round === 'Bonus') {
    startBonusRound();
  } else {
    puzzle.generatePuzzle();
    updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE');
    updateDom.launchActionPopup('Correct!', `${game.players[game.currentPlayerIndex].name}, Spin the Wheel!`, )
  }
  updateDom.displayNewPuzzle(puzzle);
  updateDom.toggleSpinButton(false)
  updateDom.disableLetters();
}

function determineWinner() {
  updateDom.endTurn()
  game.players.sort( (a, b) => {
    return a.total < b.total;
  })
  currentPlayer = game.players[0];
  game.currentPlayerIndex = 0;
  updateDom.nextPlayerDom()
  return currentPlayer.name;
}

//////////BONUS ROUND FUNCTIONS

function startBonusRound() {
  winner = determineWinner();
  bonusWheel = new BonusWheel();
  bonusWheel.randomSortElements();
  puzzle.generateBonusPuzzle();
  updateDom.displayBonusLetters(puzzle.solution)
  updateDom.generateElementsDom(bonusWheel.elements)
  updateDom.launchActionPopup(`${winner} Wins!`, `Spin the bonus Wheel.
  Choose 1 vowel and 3 consonants. Then try to solve the puzzle to win your bonus prize!` )
}

function bonusRoundChooseVowel(e) {
  if ($(e.target).hasClass('vowel')) {
    updateDom.selectVowelDom(e, $(e.target).text())
    updateDom.disableVowels()
  }
}

function bonusRoundChooseConsonant(e) {
  if ($(e.target).hasClass('consonant')) {
    let consonantCount = 0;
    updateDom.selectConsonantDom(e, $(e.target).text());
    $('.consonant').each( (i, letter) => {
      if ($(letter).attr('disabled') === 'disabled') {
        consonantCount ++;
      }
    });
    if (consonantCount > 2) {
      updateDom.disableConsonants();
    }
  }
}

function bonusRoundSubmitGuess() {
  const playerGuess = $('.solve-input').val().toUpperCase();
  const solution = puzzle.solution.join('');
  updateDom.closeActionPopup();
  $('.solve-button').prop('disabled', true);
  if (playerGuess === solution) {
    currentPlayer.addScore(bonusWheel.currentElement);
    currentPlayer.addTotal()
    updateDom.launchActionPopup('CORRECT', `You won an additional $${bonusWheel.currentElement}!  Bringing your total
    winnings to $${currentPlayer.total}! Congrats!`) 
  } else {
    updateDom.launchActionPopup('INCORRECT', `You did still win $${currentPlayer.total}! Congrats!`) 
  } 
}

if (typeof module !== 'undefined') {
  module.exports = index;
} 
