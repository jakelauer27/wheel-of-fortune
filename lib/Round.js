class Round {
  constructor(round) {
    this.round = round;
  }

  nextRound() {
    let numPuzzles = data.puzzles[`${this.round}_word_answers`].puzzle_bank.length;
    let puzzleKey = Math.round(Math.random() * (numPuzzles - 0) + 0);
    let category = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].category;
    let answer = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].correct_answer;
    puzzle = new Puzzle(category, answer);
    


    this.displayNewPuzzle(puzzle)
  }

  displayNewPuzzle(puzzle) {
    puzzle.solution.forEach( (letter, i) => {
      const tiles = $('.tile');
      $(tiles[i]).addClass('display-tile')
    });
  }
}

