class BonusWheel extends Wheel {
  constructor() {
    super();
    this.currentElement = this.elements[0];
    this.elements = [
      35000, 
      50000, 
      20000, 
      10000,
      5000,
      99000,
      10000,
      3500, 
      10000, 
      45000,
      5000,
      7500,
      10000,
    ];
  }
  
  randomSortElements() {
    this.elements.sort( () => 0.5 - Math.random());
  }
}

if (typeof module !== 'undefined') {
  module.exports = BonusWheel;
} 
