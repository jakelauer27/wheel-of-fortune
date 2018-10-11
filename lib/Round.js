class Round {
  constructor(round, roundNum) {
    this.round = round;
    this.roundNum = roundNum;
  }

  nextRound() {
    let numPuzzles = data.puzzles[`${this.round}_word_answers`].puzzle_bank.length - 1;
    let puzzleKey = Math.round(Math.random() * numPuzzles);
    let category = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].category;
    let answer = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].correct_answer;
    puzzle = new Puzzle(category, answer);
    this.displayNewPuzzle(puzzle);
    player1.addScore();
    player2.addScore();
    player3.addScore();
    $('.round').text(`Round ${this.roundNum}`);
  }

  displayNewPuzzle(puzzle) {
    puzzle.solution.forEach( (letter, i) => {
      const tiles = $('.tile');
      const index = 19 - Math.floor(puzzle.solution.length / 2) + i; 
      if (letter !== ' ') {
      $(tiles[index]).text(letter)
      $(tiles[index]).addClass('display-tile hide-letter')
      }
      if (letter === '&' || letter === '-') {
        $(tiles[index]).removeClass('hide-letter');
      }
    });
    $('.hint').text(puzzle.category);
  }
}


