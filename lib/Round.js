class Round {
  constructor(round, roundNum) {
    this.round = round;
    this.roundNum = roundNum;
  }

  nextRound() {
    this.resetPuzzle()
    let numPuzzles = data.puzzles[`${this.round}_word_answers`].puzzle_bank.length - 1;
    let puzzleKey = Math.round(Math.random() * numPuzzles);
    let category = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].category;
    let answer = data.puzzles[`${this.round}_word_answers`].puzzle_bank[puzzleKey].correct_answer;
    puzzle = new Puzzle(category, answer);
    this.displayNewPuzzle(puzzle);
    player1.addTotal();
    player2.addTotal();
    player3.addTotal();
    $('.round').text(`Round ${this.roundNum}`);
  }

  displayNewPuzzle(puzzle) {
    puzzle.solution.forEach( (letter, i) => {
      const tiles = $('.tile');
      const index = 19 - Math.floor(puzzle.solution.length / 2) + i; 
      if (letter !== ' ') {
      $(tiles[index]).text(letter)
      $(tiles[index]).addClass(`display-tile hide-letter ${letter.toUpperCase()}`)
      }
      if (letter === '&' || letter === '-') {
        $(tiles[index]).removeClass('hide-letter');
      }
    });
    $('.hint').text(puzzle.category);
  }

  resetPuzzle() {
    if (puzzle) {
      puzzle.solution.forEach( (letter, i) => {
        const tiles = $('.tile');
        const index = 19 - Math.floor(puzzle.solution.length / 2) + i; 
        if (letter !== ' ') {
        $(tiles[index]).text('')
        $(tiles[index]).removeClass(`display-tile hide-letter ${letter.toUpperCase()}`)
        }
      });
      $('.past-guess').each( (i, guess) => {
        $(`.consonant-${$(guess).text().toLowerCase()}`).attr('disabled', false);
        $(`.vowel-${$(guess).text().toLowerCase()}`).attr('disabled', false);
        guess.remove()
      })
    }
  }
}


