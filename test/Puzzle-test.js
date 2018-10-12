const Puzzle = require('../lib/puzzle');
const chai = require('chai');
const expect = chai.expect;

global.Data = require('../lib/data');
global.Round = require('../lib/round')

describe('Puzzle', () => {

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

  it('should be able to generate a new puzzle', () => {
    round = new Round;
    puzzle.generatePuzzle();
    expect(puzzle.category).to.not.equal('none');
    expect(puzzle.solution).to.not.eql(['T', 'H', 'I', 'S', ' ', 'I', 'S', ' ', 'T', 'H', 'E', ' ', 'A', 'N', 'S', 'W', 'E', 'R'])
  });
})