class Player {
  constructor(name, playerNumber) {
    this.name = name;
    this.playerNumber = playerNumber
    this.score = 0;
    this.total = 0;
  }

  addScore(score) {
    this.score += score;
    updateDom.addScoreDom(this);
  }

  addTotal() {
    this.total += this.score;
    this.score = 0;
    updateDom.addTotalDom(this);
  }

  bankrupt() {
    this.score = 0;
    updateDom.bankruptDom();
  }

}

if (typeof module !== 'undefined') {
  module.exports = Player;
} 
