class AiPlayer extends Player {
  constructor(name, playerNumber) {
    super(name, playerNumber);
    this.ai = true;
    this.score = 0;
    this.total = 0;
    this.badKeys = {
      '&': 0,
      ' ': 0,
      "'": 0 
    }
  }

  spinWheel() {
    updateDom.instruct('--AI TURN--')
    setTimeout( () => {
      $('.spin-button').trigger('click');
    }, 2000);
  }

  chooseLetter() {
    var number = Math.random();
    var correct = number > .3;
    correct ? this.chooseCorrectLetter() : this.chooseIncorrectLetter();
    return correct;
  }
  
  chooseCorrectLetter() {
    for (let i = 0; i < puzzle.solution.length; i++) {
      if ($(`.letter-${puzzle.solution[i].toLowerCase()}`).attr('disabled') !== 'disabled' 
      && !this.badKeys[puzzle.solution[i]]) {
        $(`.letter-${puzzle.solution[i].toLowerCase()}`).trigger('click');
      break;
      }
    }
  } 
  
  chooseIncorrectLetter() {
    var consonants = $('.consonant');
    for (let i = 0; i < consonants.length; i ++) {
      if ($(consonants[i]).attr('disabled') !== 'disabled') {
        $(consonants[i]).trigger('click');
        return;
      }
    }
  }
}