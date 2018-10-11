class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = this.elements[0]
  }

  generateElements(data) {
    this.resetElements();
    const wheelItems = $('.wheel-item');
    data.wheel.sort(function(a, b){return 0.5 - Math.random()});

    for (let i = 0; i <= 12; i++) {
      this.elements.push(data.wheel[i]);
      $(wheelItems[i]).text(`$${data.wheel[i]}`);
      if (data.wheel[i] === 'BANKRUPT') {
        $(wheelItems[i]).addClass('bankrupt')
        $(wheelItems[i]).text(data.wheel[i])
      };
      if (data.wheel[i] === 'LOSE A TURN') {
        $(wheelItems[i]).addClass('lose-turn')
        $(wheelItems[i]).text(data.wheel[i])
      };
    };
  };

  resetElements() {
    const wheelItems = $('.wheel-item');
    wheelItems.each((i, item) => {
      const colors = ['#C39953', 
      '#A17A74', 
      '#6D9BC3',
      '#CD607E', 
      '#AD6F69', 
      '#2E2D88', 
      '#AB92B3', 
      '#676767', 
      '#6EAEA1', 
      '#AE98AA', 
      '#BBB477', 
      '#AD4379',
      '#B768A2',
      '#8BA8B7',
      '#5DA493',
      '#9E5E6F',
      '#DA2C43',
      '#778BA5',
      '#5FA778',
      '#5F8A8B',
      '#914E75',
      '#8A496B',
      '#56887D',
      ];
      const colorNum = Math.round(Math.random() * 22);
      $(item).css({'background-color': colors[colorNum]});
      if ($(item).hasClass('bankrupt')) {
        $(item).removeClass('bankrupt');
      }
      if ($(item).hasClass('lose-turn')) {
        $(item).removeClass('lose-turn');
      }
    });
  }


  spin() {};

}

