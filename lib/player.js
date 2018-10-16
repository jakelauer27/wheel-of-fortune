class Player {
  constructor(name, playerNumber) {
    this.name = name;
    this.playerNumber = playerNumber;
    this.score = 0;
    this.total = 0;
  }

  addScore(score) {
    this.score += score;
    updateDom.addScore(this);
  }

  addTotal() {
    this.total += this.score;
    this.score = 0;
    updateDom.addTotal(this);
  }

  bankrupt() {
    this.score = 0;
    updateDom.bankrupt(this);
  }

  reset() {
    this.bankrupt;
    this.total = 0;
    updateDom.addTotal(this);
  }

}

if (typeof module !== 'undefined') {
  module.exports = Player;
} 
