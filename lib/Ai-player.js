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
    let number = Math.random();
    let correct = number > .4;
    let letter = null;
    correct ? letter = this.chooseCorrectLetter() : letter = this.chooseIncorrectLetter();
    return {
      correct: correct,
      chosenLetter: letter
    }
  }
  
  chooseCorrectLetter() {
    let correctLetter = null;
    let startingPoint = Math.round(Math.random() * puzzle.solution.length)
    for (let i = startingPoint; i < puzzle.solution.length; i++) {
      if (i ===  puzzle.solution.length - 1) {
        i === 0;
      }
      if ($(`.letter-${puzzle.solution[i].toLowerCase()}`).attr('disabled') !== 'disabled' 
      && !this.badKeys[puzzle.solution[i]] 
      && this.chooseVowelCheck(puzzle.solution[i])) {
        $(`.letter-${puzzle.solution[i].toLowerCase()}`).trigger('click');
        correctLetter = puzzle.solution[i];
        break;
      }
    }
    return correctLetter;
  } 
  
  chooseVowelCheck(letter) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    if (!vowels.includes(letter)) {
      return true;
    } else if (this.score === 0) {
      return false;
    }
    return true;
  }

  chooseIncorrectLetter() {
    var incorrectLetter = null;
    var startingPoint = Math.round(Math.random() * 18)
    var consonants = $('.consonant');
    for (let i = startingPoint; i <= consonants.length; i ++) {
      if (i === consonants.length - 1) {
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