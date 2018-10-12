class Game {
  constructor(player1Name, player2Name, player3Name, 
    player1, player2, player3) {
    this.round = 1;
    this.players = [player1, player2, player3];
    this.currentPlayerIndex = 0;
    this.playerNames = [player1Name, player2Name, player3Name];
    this.currentPlayerNameIndex = 0;
  }

  nextPlayer() {
    updateDom.endTurn();
    this.currentPlayerIndex ++;
    this.currentPlayerNameIndex ++;
    if (this.currentPlayerIndex === 3) {
      this.currentPlayerIndex = 0;
      this.currentPlayerNameIndex = 0;
    } 
    currentPlayer = this.players[this.currentPlayerIndex];
    updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!')
    updateDom.nextPlayerDom()
    updateDom.launchActionPopup('Incorrect!',`${this.playerNames[this.currentPlayerNameIndex]}, It's your turn`, )
  }
  
  reset() {}

}

if (typeof module !== 'undefined') {
  module.exports = Game;
} 
