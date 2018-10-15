$('.input-player-name').on('keyup', enableNewGameBtn)
$('.btn-start-game').on('click', startNewGame);
$('.spin-button').on('click', spinWheel);
$('.new-game-button').on('click', resetGame);
$('.solve-button').on('click', () => updateDom.attemptSolve());
$('.action-popup-button').on('click', () => updateDom.closeActionPopup());

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
  updateDom.newGameDom();
  updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!');
  updateDom.resetPuzzleDom();
  updateDom.displayNewPuzzle(puzzle);
  updateDom.disableLetters();
}

function spinWheel() {
  if (round.round === 'Bonus') {
    var currentWheelValue = bonusWheel.spin();
    updateDom.instruct('CHOOSE 3 CONSONANTS AND A VOWEL. THEN SOLVE THE PUZZLE!');
    updateDom.enableLetters();
    return;
  } 
  var currentWheelValue = wheel.spin();
  updateDom.instruct('CHOOSE A LETTER OR SOLVE THE PUZZLE');
  updateDom.enableLetters();
  if (badSpin[currentWheelValue]) {
    badSpin[currentWheelValue]();
  }
} 

function chooseVowel(e) {
  currentPlayer.addScore(-100);
  updateDom.selectVowelDom(e, $(e.target).text())
  if (!puzzle.solution.includes($(e.target).text())) {
    game.nextPlayer();
  }
}

function chooseConsonant(e) {
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

function submitGuess() {
  const playerGuess = $('.solve-input').val().toUpperCase();
  const solution = puzzle.solution.join('');
  playerGuess === solution ? newRound() : game.nextPlayer();
  updateDom.submitGuessDom();
}

function newRound() {
  currentPlayer.addScore(currentPlayer.score);
  currentPlayer.addTotal();
  player1.bankrupt();
  player2.bankrupt();
  player3.bankrupt();
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

function resetGame() {
  player1.reset();
  player2.reset();
  player3.reset();
  $('.start-game-popup').removeClass('hide');
  $('.dark-overlay').removeClass('hide');
  $('.btn-start-game').prop('disabled', true);
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
  updateDom.selectVowelDom(e, $(e.target).text())
  updateDom.disableVowels()
}

function bonusRoundChooseConsonant(e) {
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

///////HOW TO PLAY/////////////////

function enableNewGameBtn() {
  if ($('.input-player1-name').val() !== '' &&
  $('.input-player2-name').val() !== '' &&
  $('.input-player3-name').val() !== '') {
    $('.btn-start-game').prop('disabled', false);
  }
}

const badSpin = {
  BANKRUPT: () =>  {
    currentPlayer.bankrupt();
    game.nextPlayer('BANKRUPT!');
  },
  LOSEATURN: () => {
    game.nextPlayer('LOSE A TURN!');
  }
}

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
  credited and then "locked in" during previous rounds is the contestant's to keep no matter what happens. <br><br>
  The Player with the highest total amount at the end of 4 rounds wins and gets to play a bonus round
  with a special bonus wheel.`)
});

if (typeof module !== 'undefined') {
  module.exports = index;
} 
