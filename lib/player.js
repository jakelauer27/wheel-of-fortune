class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.total = 0;
    this.turn = false;
  }

  selectVowel(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
  };

  selectConsonant(e, letter) {
    $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
    $(e.target).attr('disabled', 'true');
  };

  solve() {};

  addScore() {
    this.total += this.score;
    this.score = 0;
    $(`.${this.name}-value-total`).text(this.total);
    $(`.${this.name}-value-score`).text(this.score);
  };

}

