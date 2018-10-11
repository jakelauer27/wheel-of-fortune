class Game {
  constructor(player1Name, player2Name, player3Name, player1, player2, player3) {
    this.round = 1;
    this.players = [player1, player2, player3];
    this.currentPlayerIndex = 0;
    this.playerNames = [player1Name, player2Name, player3Name];
    this.currentPlayerNameIndex = 0;
  }

  nextPlayer() {
    $('.spin-button').attr("disabled", false);
    $(`.${currentPlayer.name}`).removeClass('highlight');
    this.currentPlayerIndex ++;
    if (this.currentPlayerIndex === 3) {
      this.currentPlayerIndex = 0;
    } 
    this.currentPlayerNameIndex ++;
    if (this.currentPlayerNameIndex === 3) {
      this.currentPlayerNameIndex = 0;
    } 
    domUpdates.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!')
    currentPlayer = this.players[this.currentPlayerIndex];
    domUpdates.nextPlayerDom()
  };

  gameOver() {};

  quit() {};

};

