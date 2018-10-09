module.exports = class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = this.elements[0]
  }

  generateElements();

  spin();

}