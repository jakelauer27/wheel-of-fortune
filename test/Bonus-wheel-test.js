const chai = require('chai');
const expect = chai.expect;
global.Wheel = require('../lib/wheel.js');
const BonusWheel = require('../lib/Bonus-wheel.js');
const spies = require('chai-spies');
chai.use(spies);

global.updateDom = require('../lib/updateDom')
chai.spy.on(global.updateDom, [], () => true);

describe('bonusWheel', () => {

  var bonusWheel;

  beforeEach(() => {
    bonusWheel = new BonusWheel;
  });

  it('should default to having 13 elements', () => {
    expect(bonusWheel.elements.length).to.equal(13);
  });

  it('should keep track of the current element', () => {
    expect(bonusWheel).to.have.property('currentElement');
  });

  describe('Bonuswheel - spin()', () => {

    it('should be able to select a new current Element', () => {
      expect(bonusWheel.elements.includes(bonusWheel.spin())).to.be.true;
    });

    it('should append the new selected wheel element to the dom', () => {
      updateDom.spinWheel.__spy.calls = [];
      bonusWheel.spin();
      expect(updateDom.spinWheel).to.have.been.called(1);
    });

    it('should disable the spin wheel on the dom', () => {
      updateDom.toggleSpinButton.__spy.calls = [];
      bonusWheel.spin();
      expect(updateDom.toggleSpinButton).to.have.been.called(1);
    });

  });

  describe('Bonuswheel - randomSortElements()', () => {
    
      it('should be able to randomly sort its elements', () => {
        const elements = bonusWheel.elements[0];
        bonusWheel.randomSortElements();
        expect(bonusWheel.elements[0]).to.not.equal(elements);
      });
  });
});