
$('.btn-start-game').on('click', startNewGame);
$('.vowels-list').on('click', chooseVowel);
$('.consonants-list').on('click', chooseConsonant);
$('.spin-button').on('click', spinWheel);
$('solve-button').on('click', attemptSolve)

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
  game.instruct('SPIN THE WHEEL')

  $('.player1-name').text($('.input-player1-name').val());
  $('.player2-name').text($('.input-player2-name').val());
  $('.player3-name').text($('.input-player3-name').val());

  wheel = new Wheel();
  wheel.generateElements(data);
  $('.start-game-popup').addClass('hide');

  round = new Round('one', 1)
  round.nextRound()

  currentPlayer = player1;
  $('.player1').addClass('highlight');
};

function chooseVowel(e) {
  if ($(e.target).hasClass('vowel')) {
    currentPlayer.selectVowel(e, $(e.target).text())
  }
}

function chooseConsonant(e) {
  if ($(e.target).hasClass('consonant')) {
    currentPlayer.selectConsonant(e, $(e.target).text())
  }
}

function spinWheel(e) {
  let newElement = Math.round(Math.random() * 11)
  wheel.currentElement = wheel.elements[newElement];
  game.instruct('CHOOSE A LETTER');
  if (wheel.currentElement === 'BANKRUPT') {
    currentPlayer.score = 0;
    $(`.${currentPlayer.name}-value-score`).text(this.score);
    game.nextPlayer();
  } else if (wheel.currentElement === 'LOSE A TURN') { 
    game.nextPlayer();
  } else {
  $('.spin-button').attr("disabled", true);
  }
}

function attemptSolve() {
  
}