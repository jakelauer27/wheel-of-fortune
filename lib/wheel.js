class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = this.elements[0]
  }

  generateElements(data) {
    updateDom.resetElements();
    data.wheel.sort(function(a, b){return 0.5 - Math.random()});
    updateDom.generateElementsDom(data);
    for (let i = 0; i <= 12; i++) {
      this.elements.push(data.wheel[i]);
    };
  };

  spin() {
    let newElement = Math.round(Math.random() * 11)
    wheel.currentElement = wheel.elements[newElement];
    updateDom.disableSpinButton()
    if (this.currentElement === 'BANKRUPT') {
      currentPlayer.bankrupt()
    };
    if (this.currentElement === 'LOSE A TURN') { 
      game.nextPlayer();
    };
  };

};

