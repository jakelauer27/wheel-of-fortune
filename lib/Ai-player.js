class AiPlayer extends Player {
  constructor(name, playerNumber) {
    super(name, playerNumber);
    this.ai = true;
    this.score = 0;
    this.total = 0;
  }

  spinWheel() {
    updateDom.aiSpinWheel();
    return typeof wheel.currentElement !== 'string'; 
  }

  chooseLetter() {
    let number = Math.random();
    let correct = number > .4;
    let letter = null;
    correct ? letter = this.chooseCorrectLetter() : letter = this.chooseIncorrectLetter();
    return {
      correct,
      chosenLetter: letter
    }
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
    return updateDom.aiChooseIncorrectLetter();
  }

  solve() {
    updateDom.aiSolve();
  }
}

if (typeof module !== 'undefined') {
  module.exports = AiPlayer;
} 