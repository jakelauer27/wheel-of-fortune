const chai = require('chai');
const expect = chai.expect;
const BonusWheel = require('../lib/Bonus-wheel.js');


global.Wheel = require('../lib/wheel.js');

describe('Wheel', () => {

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

it('should be able to select a new current Element', () => {
  expect(bonusWheel.elements.includes(bonusWheel.spin())).to.be.true;
});

it('should be able to randomly sort its elements', () => {
  var elements = bonusWheel.elements;
  bonusWheel.randomSortElements()
  expect(bonusWheel.elements).to.not.eql(elements);
});
});