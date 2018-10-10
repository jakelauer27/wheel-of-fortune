class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = this.elements[0]
  }

  generateElements(data) {
    var sortedWheel = data.wheel.sort(function(a, b){return 0.5 - Math.random()});
    for (let i = 0; i <= 12; i++) {
      sortedWheel.push(data.wheel[i])
    }
  };

  spin() {};

}

