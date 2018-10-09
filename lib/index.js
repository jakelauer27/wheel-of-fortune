const { data } = require('./data')
const Game = require('./Game');
const Puzzle = require('./Puzzle');
const Player= require('./Player');
const Wheel = require('./Wheel');

$('.btn-start-game').on('click', newGame())

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

  wheel.generateElements();

}