class Game {
  constructor(player1, player2, player3) {
    this.round = 1;
    this.turn = [player1, player2, player3];
    this.currentPlayer = this.turn[0]
  }

  instruct(action) {
    $('.instructions-current-player').text(`${this.currentPlayer}:`);
    $('.instructions-content').text(action)
  }

  nextPlayer() {};

  nextRound() {};

  gameOver() {};

  quit() {};

};

