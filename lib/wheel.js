class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = this.elements[0]
  }

  generateElements(data) {
    this.resetElements();
    const wheelItems = $('.wheel-item');
    const sortedWheel = [];

    data.wheel.sort(function(a, b){return 0.5 - Math.random()});

    for (let i = 0; i <= 12; i++) {
      sortedWheel.push(data.wheel[i]);
      $(wheelItems[i]).text(data.wheel[i]);
      if (data.wheel[i] === 'BANKRUPT') {
        $(wheelItems[i]).addClass('bankrupt')
      };
      if (data.wheel[i] === 'LOSE A TURN') {
        $(wheelItems[i]).addClass('lose-turn')
      };
    };
  };

  resetElements() {
    const wheelItems = $('.wheel-item');
    wheelItems.each((item) => {
      if ($(item).hasClass('bankrupt')) {
        $(item).removeClass('bankrupt')
      }
      if ($(item).hasClass('lose-turn')) {
        $(item).removeClass('lose-turn')
      }
    });
  }

  spin() {};

}

