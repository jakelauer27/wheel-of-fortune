class AiPlayer extends Player {
  constructor(name, playerNumber, level) {
    super(name, playerNumber);
    this.ai = true;
    this.score = 0;
    this.total = 0;
    this.level = level * .07;
  }

  spinWheel() {
    updateDom.aiSpinWheel();
    return typeof wheel.currentElement !== 'string'; 
  }

  chooseLetter() {
    let number = Math.random();
    let correct = number > .3 + this.increaseGuessPercentage();
    let letter = null;
    correct ? letter = this.chooseCorrectLetter() : letter = this.chooseIncorrectLetter();
    return {
      correct: correct,
      chosenLetter: letter
    }
  }

  increaseGuessPercentage() {
    var guessedTiles = $('.display-tile').length - $('.hide-letter').length;
    return .02 * guessedTiles;
  }
  
  chooseCorrectLetter() {
    var solution = puzzle.solution.filter( (letter) => {
      return letter !== ' ' && letter !== "'" && letter !== '&'
    })
    solution.sort( () => 0.5 - Math.random());
    var correctLetter = updateDom.aiChooseCorrectLetter(solution);
    if (correctLetter) {
      return correctLetter;
    }
    this.solve();
  } 
  
  chooseIncorrectLetter() {
    return updateDom.aiChooseIncorrectLetter();
  }

  vowelCheck(letter) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    if (!vowels.includes(letter)) {
      return true;
    } else if (this.score === 0) {
      return false;
    }
    return true;
  }

  solve() {
    updateDom.aiSolve();
  }
}

if (typeof module !== 'undefined') {
  module.exports = AiPlayer;
} 