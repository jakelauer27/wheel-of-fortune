class Game {
  constructor(player1, player2, player3) {
    this.round = 1;
    this.players = [player1, player2, player3];
    this.currentPlayerIndex = 0;
  }

  nextPlayer(message = 'Incorrect') {
    updateDom.endTurn();
    this.currentPlayerIndex ++;
    if (this.currentPlayerIndex === 3) {
      this.currentPlayerIndex = 0;
    } 
    currentPlayer = this.players[this.currentPlayerIndex];
    updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!')
    updateDom.disableLetters();
    updateDom.nextPlayerDom()
    updateDom.launchActionPopup(message,`${this.players[this.currentPlayerIndex].name}, It's your turn`, )
  }

  determineWinner() {

    return this.playerNames[this.currentPlayerNameIndex];
  }
  
  reset() {}

}

if (typeof module !== 'undefined') {
  module.exports = Game;
} 
