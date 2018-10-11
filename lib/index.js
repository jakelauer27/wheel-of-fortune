$('.btn-start-game').on('click', startNewGame);
$('.vowels-list').on('click', chooseVowel);
$('.consonants-list').on('click', chooseConsonant);
$('.spin-button').on('click', spinWheel);
$('.solve-button').on('click', attemptSolve);
$('.submit-guess-button').on('click', submitGuess);

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
  
  wheel.generateElements(data);
  round.nextRound()
  currentPlayer = player1;
  
  updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!')
  updateDom.newGameDom()
};

function chooseVowel(e) {
  if ($(e.target).hasClass('vowel')) {
    currentPlayer.selectVowel($(e.target).text())
    updateDom.selectVowelDom(e, $(e.target).text())
  }
}

function chooseConsonant(e) {
  if ($(e.target).hasClass('consonant')) {
    currentPlayer.selectConsonant($(e.target).text());
    updateDom.selectConsonantDom(e, $(e.target).text());
  }
}

function spinWheel(e) {
  wheel.spin();
  updateDom.instruct('CHOOSE A LETTER OR SOLVE THE PUZZLE');
}

function submitGuess() {
  if (currentPlayer.solve()) {
    currentPlayer.addScore(currentPlayer.score);
    round.roundNum ++;
    round.round = round.rounds[round.roundNum - 1];
    round.nextRound();
  } else {
    game.nextPlayer()
  }
  updateDom.submitGuessDom()
}

function attemptSolve() {
  updateDom.attemptSolve();
}