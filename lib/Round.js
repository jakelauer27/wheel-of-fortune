class Round {
  constructor() {
    this.rounds = ['one', 'two', 'three', 'four'];
    this.roundNum = 1;
    this.round = this.rounds[this.roundNum - 1];
  }

  nextRound() {
    this.roundNum ++;
    if (this.roundNum === 5) {
      this.round = 'Bonus';
    } else {
    this.round = this.rounds[this.roundNum - 1];
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Round;
} 
