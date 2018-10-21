class Game {
  constructor(player1, player2, player3) {
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
    updateDom.instruct('Spin the wheel or solve the puzzle!');
    updateDom.disableLetters();
    updateDom.launchActionPopup(message, `${this.players[this.currentPlayerIndex].name}, It's your turn`);
    setTimeout( () => {
      if (currentPlayer.ai) {
        aiTurn();
      }
    }, 2000)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
} 
