

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

class Game {
  constructor() {
    this.round = 0;
    this.turn = 'player1';
  }

  nextPlayer() {};

  nextRound() {};

  gameOver() {};

  quit() {};

};


class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.total = 0;
    this.turn = false;
  }

  selectLetter() {};

  selectVowel() {};

  solve() {};

  addScore() {};

}

class Puzzle {
  constructor(catagory, solution) {
    this.catagory = catagory;
    this.solution = solution;
  }

  revealLetter() {};

  solvePuzzle() {};

}