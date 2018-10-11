class Round {
  constructor() {
    this.rounds = ['one', 'two', 'three', 'four'];
    this.roundNum = 1;
    this.round = this.rounds[this.roundNum - 1];
  }

  nextRound() {
    resetPuzzleDom()
    let numPuzzles = data.puzzles[`${this.round}_word_answers`].puzzle_bank.length - 1;
    let puzzleKey = Math.round(Math.random() * numPuzzles);
    let category = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].category;
    let answer = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].correct_answer;
    puzzle = new Puzzle(category, answer);
    player1.addTotal();
    player2.addTotal();
    player3.addTotal();
    displayNewPuzzle(puzzle);
    instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE');
  }
}


