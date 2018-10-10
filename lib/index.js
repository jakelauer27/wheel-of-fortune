
$('.btn-start-game').on('click', startNewGame);

const game = new Game();
var player1;
var player2;
var player3;
var wheel;
var puzzle;
var round;


function startNewGame() {
  player1 = new Player('player1');
  player2 = new Player('player2');
  player3 = new Player('player3');
  $('.player1-name').text($('.input-player1-name').val());
  $('.player2-name').text($('.input-player2-name').val());
  $('.player3-name').text($('.input-player3-name').val());

  wheel = new Wheel();
  wheel.generateElements(data);
  $('.start-game-popup').addClass('hide');

  round = new Round('one')
  round.nextRound()
};


