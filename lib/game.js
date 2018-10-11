class Game {
  constructor(player1Name, player2Name, player3Name, player1, player2, player3) {
    this.round = 1;
    this.players = [player1, player2, player3];
    this.currentPlayerIndex = 0;
    this.playerNames = [player1Name, player2Name, player3Name];
    this.currentPlayerNameIndex = 0;
  }

  instruct(action) {
    $('.instructions-current-player').text(`${this.playerNames[this.currentPlayerNameIndex]}:`);
    $('.instructions-content').text(action)
  }

  nextPlayer() {
    $('.spin-button').attr("disabled", false);
    this.currentPlayerIndex ++;
    if (this.currentPlayerIndex === 3) {
      this.currentPlayerIndex = 0;
    } 
    this.currentPlayerNameIndex ++;
    if (this.currentPlayerNameIndex === 3) {
      this.currentPlayerNameIndex = 0;
    } 
    this.instruct('SPIN THE WHEEL')
    currentPlayer = this.players[this.currentPlayerIndex];
    console.log(currentPlayer);
  };

  nextRound() {};

  gameOver() {};

  quit() {};

};

