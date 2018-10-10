class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.total = 0;
    this.turn = false;
  }

  selectLetter() {};

  selectVowel() {};

  solve() {};

  addScore() {
    this.total += this.score;
    this.score = 0;
    $(`.${this.name}-value-total`).text(this.total);
    $(`.${this.name}-value-score`).text(this.score);
  };

}

