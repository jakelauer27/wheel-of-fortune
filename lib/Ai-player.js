class AiPlayer extends Player {
  constructor(name, playerNumber) {
    super(name, playerNumber, score, total);
  }

  spinWheel() {
    $('.spin-button').trigger('click');
  }

  chooseConsonant() {
    $(`.letter-${letter}`).trigger('click');
  }

  chooseVowel() {
    $(`.letter-${letter}`).trigger('click');
  }

}