class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = this.elements[0]
  }

  generateElements(data) {
    this.elements = [];
    data.wheel.sort( () => 0.5 - Math.random());
    for (let i = 0; i <= 12; i++) {
      this.elements.push(data.wheel[i]);
    }
    updateDom.generateElements(this.elements);
    this.currentElement = this.elements[0]
    updateDom.spinWheel(1, this.currentElement);
  }

  spin() {
    let newElement = Math.round(Math.random() * 11)
    this.currentElement = this.elements[newElement];
    updateDom.toggleSpinButton(true);
    updateDom.spinWheel(newElement, this.currentElement);
    return this.currentElement;
  }

  spinAgain() {
    updateDom.instruct('SPIN THE WHEEL OR SOLVE THE PUZZLE!');
    updateDom.disableLetters();
    updateDom.toggleSpinButton(false);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Wheel;
} 
