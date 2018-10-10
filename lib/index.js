
$('.btn-start-game').on('click', startNewGame);

const game = new Game();
var player1;
var player2;
var player3;
var wheel;


function startNewGame() {
  player1 = new Player($('.input-player1-name').val());
  player2 = new Player($('.input-player1-name').val());
  player3 = new Player($('.input-player1-name').val());
  wheel = new Wheel();

  wheel.generateElements(data);

};

wheel = new Wheel();

wheel.generateElements(data);