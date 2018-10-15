class Puzzle {
  constructor(category = 'none', solution = 'none') {
    this.category = category;
    this.solution = solution.toUpperCase().split('');
  }

  generatePuzzle() {
    let numPuzzles = data.puzzles[`${round.round}_word_answers`].puzzle_bank.length - 1;
    let puzzleKey = Math.round(Math.random() * numPuzzles);
    this.category = data.puzzles[`${round.round}_word_answers`].puzzle_bank[puzzleKey].category;
    this.solution = (data.puzzles[`${round.round}_word_answers`].puzzle_bank[puzzleKey].correct_answer).toUpperCase().split('');
    data.puzzles[`${round.round}_word_answers`].puzzle_bank.splice([puzzleKey], 1);
  }

  generateBonusPuzzle() {
    let numPuzzles = data.puzzles.two_word_answers.puzzle_bank.length - 1;
    let puzzleKey = Math.round(Math.random() * numPuzzles);
    this.category = data.puzzles.two_word_answers.puzzle_bank[puzzleKey].category;
    this.solution = (data.puzzles.two_word_answers.puzzle_bank[puzzleKey].correct_answer).toUpperCase().split('');
  }
}

if (typeof module !== 'undefined') {
  module.exports = Puzzle;
} 
