const Wheel = require('../lib/wheel');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

global.Game = require('../lib/game.js');
global.Player = require('../lib/player.js');
global.data = require('../lib/data.js');
global.updateDom = require('../lib/updateDom.js');
chai.spy.on(global.updateDom, ['generateElements', 'spinWheel', 'toggleSpinButton'], () => true);

describe('Wheel', () => {

    var wheel;

  beforeEach(() => {
    wheel = new Wheel;
  });

  it('should default to having 0 elements', () => {
    expect(wheel.elements).to.eql([]);
  });

  it('should keep track of the current element', () => {
    expect(wheel).to.have.property('currentElement');
  });

  describe('Wheel - generateElements()', () => {

    it('should be able to randomly generate new elements on the wheel', () => {
      wheel.generateElements(data);
      const firstGeneration = wheel.elements;
      expect(wheel.elements.length).to.equal(13);
      wheel.generateElements(data);
      expect(wheel.elements).to.not.eql(firstGeneration)
    });
  
    it('should be able to append its elements to the dom wheel', () => {
      updateDom.generateElements.__spy.calls = [];
      wheel.generateElements(data);
      expect(updateDom.generateElements).to.have.been.called(1)
    });
  });

  describe('Wheel - spin()', () => {

    it('should be able to randomly select and return a new selected Element', () => {
      wheel.generateElements(data);
      expect(wheel.elements.includes(wheel.spin())).to.be.true;
      expect(wheel.spin()).to.equal(wheel.currentElement);
    });

    it('should append the new selected wheel element to the dom', () => {
      updateDom.spinWheel.__spy.calls = [];
      wheel.spin();
      expect(updateDom.spinWheel).to.have.been.called(1);
    });

    it('should disable the spin wheel on the dom', () => {
      updateDom.toggleSpinButton.__spy.calls = [];
      wheel.spin();
      expect(updateDom.toggleSpinButton).to.have.been.called(1);
    });
  });
});