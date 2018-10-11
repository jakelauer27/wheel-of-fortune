class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.total = 0;
    this.turn = false;
  }

  selectVowel(letter) {
    this.addScore(-100);
    if (!puzzle.solution.includes(letter)) {
      game.nextPlayer();
    };
  };

  selectConsonant(letter) {
    if (!puzzle.solution.includes(letter)) {
      game.nextPlayer(); 
    } else {
      puzzle.solution.forEach( (solutionLetter) => {
        if (solutionLetter === letter) {
          this.addScore(wheel.currentElement);
        };
      });
    }
  };

  solve() {
    return $('.solve-input').val().toUpperCase() === puzzle.solution.join('');
  }

  addScore(score) {
    this.score += score;
    updateDom.addScoreDom(this);
  };

  addTotal() {
    this.total += this.score;
    this.score = 0;
    updateDom.addTotalDom(this);
  }

  bankrupt() {
    this.score = 0;
    updateDom.bankruptDom();
    game.nextPlayer();
  }

}

