class BonusWheel extends Wheel {
  constructor() {
    super();
    this.currentElement = this.elements[0];
    this.elements = [
      '?', 
      '?', 
      '?', 
      '?',
      '?',
      '?',
      '?',
      3500, 
      4000, 
      4500,
      5000,
      7500,
      10000,
    ];
  }

  randomSortElements() {
    this.elements.sort( () => 0.5 - Math.random());
  }

}