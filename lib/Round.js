class Round {
  constructor() {
    this.rounds = ['one', 'two', 'three', 'four'];
    this.roundNum = 1;
    this.round = this.rounds[this.roundNum - 1];
  }

  nextRound() {
    updateDom.resetPuzzleDom()
    puzzle.generatePuzzle();
    player1.addTotal();
    player2.addTotal();
    player3.addTotal();
    updateDom.displayNewPuzzle(puzzle);
    updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE');
  }
}

if (typeof module !== 'undefined') {
  module.exports = Round;
} 
