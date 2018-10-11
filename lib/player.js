class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.total = 0;
    this.turn = false;
  }

  selectVowel(e, letter) {
    this.addScore(-100);
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
    if (!puzzle.solution.includes(letter)) {
      game.nextPlayer();
    } else {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          $(`.${letter}`).removeClass('hide-letter')
        }
      })
    }
  };

  selectConsonant(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
    if (!puzzle.solution.includes(letter)) {
      game.nextPlayer(); 
    } else {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          this.addScore(wheel.currentElement);
          $(`.${letter}`).removeClass('hide-letter')
        }
      })
    }
  };

  solve() {
    return $('.solve-input').val().toUpperCase() === puzzle.solution.join('');
  }

  addScore(score) {
    this.score += score;
    $(`.${this.name}-value-score`).text(this.score);
  };

  addTotal() {
    this.total += this.score;
    this.score = 0;
    $(`.${this.name}-value-total`).text(this.total);
    $(`.${this.name}-value-score`).text(this.score);
  }

  bankrupt() {
    this.score = 0;
    $(`.${this.name}-value-score`).text(this.score);
    game.nextPlayer();
  }

}

