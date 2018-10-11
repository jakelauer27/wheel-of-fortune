
$('.btn-start-game').on('click', startNewGame);
$('.vowels-list').on('click', chooseVowel)
$('.consonants-list').on('click', chooseConsonant)

var game;
var player1;
var player2;
var player3;
var wheel;
var puzzle;
var round;
var currentPlayer;

function startNewGame() {
  game = new Game($('.input-player1-name').val(), $('.input-player2-name').val(), $('.input-player3-name').val())
  game.instruct('SPIN THE WHEEL')

  player1 = new Player('player1');
  player2 = new Player('player2');
  player3 = new Player('player3');
  $('.player1-name').text($('.input-player1-name').val());
  $('.player2-name').text($('.input-player2-name').val());
  $('.player3-name').text($('.input-player3-name').val());

  wheel = new Wheel();
  wheel.generateElements(data);
  $('.start-game-popup').addClass('hide');

  round = new Round('one', 1)
  round.nextRound()

  currentPlayer = player1
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
