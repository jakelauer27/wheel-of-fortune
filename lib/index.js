$('.btn-start-game').on('click', startNewGame);
$('.vowels-list').on('click', chooseVowel);
$('.consonants-list').on('click', chooseConsonant);
$('.spin-button').on('click', spinWheel);
$('.solve-button').on('click', attemptSolve);
$('.submit-guess-button').on('click', submitGuess);
$('.action-popup-button').on('click', function() {
  updateDom.closeActionPopup();
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
  player1 = new Player('player1');
  player2 = new Player('player2');
  player3 = new Player('player3');
  game = new Game($('.input-player1-name').val(), $('.input-player2-name').val(), $('.input-player3-name').val(), player1, player2, player3)
  round = new Round()
  wheel = new Wheel();
  puzzle = new Puzzle()
  wheel.generateElements(data);
  puzzle.generatePuzzle();
  currentPlayer = player1;
  updateDom.newGameDom()
  updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!')
  updateDom.displayNewPuzzle(puzzle);
}

function spinWheel(e) {
  let currentWheelValue = wheel.spin();
  updateDom.instruct('CHOOSE A LETTER OR SOLVE THE PUZZLE');
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
    updateDom.selectConsonantDom(e, $(e.target).text());
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

function attemptSolve() {
  updateDom.attemptSolve();
}

function submitGuess() {
  const playerGuess = $('.solve-input').val().toUpperCase();
  const solution = puzzle.solution.join('');
  if (playerGuess === solution) {
    newRound();
  } else {
    game.nextPlayer();
  }
  updateDom.submitGuessDom()
}

function newRound() {
  currentPlayer.addScore(currentPlayer.score);
  player1.addTotal();
  player2.addTotal();
  player3.addTotal();
  round.nextRound();
  puzzle.generatePuzzle();
  updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE');
  updateDom.toggleSpin(false)
  updateDom.resetPuzzleDom()
  updateDom.displayNewPuzzle(puzzle);
  updateDom.launchActionPopup('Correct!',`${game.playerNames[game.currentPlayerNameIndex]}, Spin the Wheel!`, )
}

if (typeof module !== 'undefined') {
  module.exports = index;
} 
