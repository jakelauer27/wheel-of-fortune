import Game from 'Game.js';

$('.btn-start-game').on('click', newGame);

const game = new Game();
var player1;
var player2;
var player3;
var wheel;


function newGame() {
  player1 = new Player($('.input-player1-name').val());
  player2 = new Player($('.input-player1-name').val());
  player3 = new Player($('.input-player1-name').val());
  wheel = new Wheel();

  wheel.generateElements(data);

};