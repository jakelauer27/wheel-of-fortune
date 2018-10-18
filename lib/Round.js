class Round {
  constructor() {
    this.rounds = ['one', 'two', 'three', 'four', 'Bonus'];
    this.roundNum = 1;
    this.round = this.rounds[this.roundNum - 1];
  }

  nextRound() {
    this.roundNum ++;
    this.round = this.rounds[this.roundNum - 1];
  }
}

if (typeof module !== 'undefined') {
  module.exports = Round;
} 
