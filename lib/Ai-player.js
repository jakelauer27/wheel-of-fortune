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
    $('.spin-button').trigger('click');
    return typeof currentElement !== 'string'; 
  }

  chooseLetter() {
    var number = Math.random();
    var correct = number > .5;
    correct ? this.chooseCorrectLetter() : this.chooseIncorrectLetter();
    return {
      correct: correct,
      chosenLetter: this.chooseCorrectLetter() || this.chooseIncorrectLetter()
    }
  }
  
  chooseCorrectLetter() {
    var correctLetter = null;
    for (let i = 0; i < puzzle.solution.length; i++) {
      if ($(`.letter-${puzzle.solution[i].toLowerCase()}`).attr('disabled') !== 'disabled' 
      && !this.badKeys[puzzle.solution[i]]) {
        $(`.letter-${puzzle.solution[i].toLowerCase()}`).trigger('click');
        correctLetter = puzzle.solution[i];
        break;
      }
    }
    return correctLetter;
  } 
  
  chooseIncorrectLetter() {
    var incorrectLetter = null;
    var startingPoint = Math.round(Math.random() * 18)
    var consonants = $('.consonant');
    for (let i = startingPoint; i <= consonants.length; i ++) {
      if (i === consonants - 1) {
        i === 0;
      }
      if ($(consonants[i]).attr('disabled') !== 'disabled' 
      && !puzzle.solution.includes($(consonants[i]).text())) {
        $(consonants[i]).trigger('click');
        incorrectLetter = $(consonants[i]).text()
        break;
      }
    }
    return incorrectLetter;
  }

  solve() {
    setTimeout( () => {
      $('.solve-button').trigger('click');
      let guess = ''
      puzzle.solution.forEach( (letter) =>  {
        guess += letter
        $('.solve-input').val(guess)
      })
      setTimeout( () => {
        $('.submit-guess-button').trigger('click');
        setTimeout( () => {
          $('.action-popup-button').trigger('click');
        }, 2000)
      }, 2000)
    }, 2000)
  }
}