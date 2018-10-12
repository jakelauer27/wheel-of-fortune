const Puzzle = require('../lib/puzzle');
const chai = require('chai');
const expect = chai.expect;

describe('Round', () => {

  var puzzle; 

  beforeEach(() => {
    puzzle = new Puzzle('category', 'this is the answer');
  });

  it('should have a category', () => {
    expect(puzzle.category).to.equal('category');
  }); 

  it('should split its solution into an uppercase array', () => {
    expect(puzzle.solution).to.eql(['T', 'H', 'I', 'S', ' ', 'I', 'S', ' ', 'T', 'H', 'E', ' ', 'A', 'N', 'S', 'W', 'E', 'R']);
  }); 

})