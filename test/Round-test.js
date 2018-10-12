const Round = require('../lib/round');
const chai = require('chai');
const expect = chai.expect;


describe('Round', () => {

  var round; 

  beforeEach(() => {
    round = new Round();
  });

  it('should store all rounds in an array', () => {
    expect(round.rounds).to.eql(['one', 'two', 'three', 'four'])
  }); 

  it('should store the current round as an integer and default to 1', () => {
    expect(round.roundNum).to.equal(1)
  }); 

  it('should store the current round as a string and default to one', () => {
    expect(round.round).to.equal('one')
  }); 

  it('should be able to advance to the next round', () => {
    round.nextRound();
    expect(round.roundNum).to.equal(2);
    expect(round.round).to.equal('two')
  }); 
})