const Wheel = require('../lib/wheel');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

global.Game = require('../lib/game.js')
global.Player = require('../lib/player.js')
global.data = require('../lib/data.js')
global.updateDom = require('../lib/updateDom.js');
chai.spy.on(global.updateDom, ['resetElements', 'generateElementsDom', 'disableSpinButton'], () => true);

describe('Game', () => {

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

  it('should be able to generate new elements on the wheel', () => {
    wheel.generateElements(data);
    expect(wheel.elements.length).to.equal(13);
  });

  it('should be able to append its elements to the dom wheel', () => {
    wheel.generateElements(data);
    expect(updateDom.resetElements).to.have.been.called(2)
    expect(updateDom.generateElementsDom).to.have.been.called(2)
  });

  it('should be able to select a new current Element', () => {
    wheel.generateElements(data);
    expect(wheel.elements.includes(wheel.spin())).to.be.true;
  });
});