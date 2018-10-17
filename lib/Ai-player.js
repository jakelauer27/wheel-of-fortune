class AiPlayer extends Player {
  constructor(name, playerNumber) {
    super(name, playerNumber);
    this.ai = true;
    this.score = 0;
    this.total = 0;
  }

  spinWheel() {
    $('.spin-button').trigger('click');
    return typeof wheel.currentElement !== 'string'; 
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
    var solution = puzzle.solution.filter( (letter) => {
      return letter !== ' ' && letter !== "'" && letter !== '&'
    })
    solution.sort( () => 0.5 - Math.random());
    let correctLetter = null;
    for (let i = 0; i < solution.length; i++) {
      if ($(`.letter-${solution[i].toLowerCase()}`).attr('disabled') !== 'disabled'  
      && this.chooseVowelCheck(solution[i])) {
        $(`.letter-${solution[i].toLowerCase()}`).trigger('click');
        correctLetter = solution[i];
        break;
      }
    }
    if (correctLetter) {
      return correctLetter;
    }
    this.solve()
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
    var startingPoint = Math.round(Math.random() * 18)
    var incorrectLetter = null;
    var consonants = $('.consonant');
    for (let i = startingPoint; i < consonants.length; i ++) {
      if (i === consonants.length - 1) {
        i = 0;
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
    if (round.roundNum === 4) {
      updateDom.endTurn();
      currentPlayer = player1;
    }
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
        }, 1500)
      }, 2000)
    }, 1000)
  }
}