class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = this.elements[0]
  }

  generateElements(data) {
    updateDom.resetElements();
    data.wheel.sort( () => {
      return 0.5 - Math.random()
    });
    updateDom.generateElementsDom(data);
    for (let i = 0; i <= 12; i++) {
      this.elements.push(data.wheel[i]);
    }
  }

  spin() {
    let newElement = Math.round(Math.random() * 11)
    this.currentElement = this.elements[newElement];
    updateDom.toggleSpinButton(true);
    updateDom.spinWheel(newElement, this.currentElement);
    return this.currentElement;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Wheel;
} 
