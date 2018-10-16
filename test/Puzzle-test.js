const Puzzle = require('../lib/puzzle');
const chai = require('chai');
const expect = chai.expect;

global.data = require('../lib/data');
global.Round = require('../lib/round')

describe('Puzzle', () => {

  var puzzle; 

  beforeEach(() => {
    puzzle = new Puzzle('friendship', 'this is the answer');
  });

  it('should have a category that defaults to none', () => {
    puzzle = new Puzzle()
    expect(puzzle.category).to.equal('none');
  }); 

  it('should be able to have different catagory', () => {
    expect(puzzle.category).to.equal('friendship');
  }); 

  it('should split its solution into an uppercase array', () => {
    expect(puzzle.solution).to.eql(['T', 'H', 'I', 'S', ' ', 'I', 'S', ' ', 'T', 'H', 'E', ' ', 'A', 'N', 'S', 'W', 'E', 'R']);
  }); 

  describe('Puzzle - GenerateNewPuzzle()', () => {

    it('should delete the puzzle it generates from the data file', () => {
      round = new Round;
      expect(data.puzzles.one_word_answers.puzzle_bank.length).to.equal(24);
      puzzle.generatePuzzle();
      expect(data.puzzles.one_word_answers.puzzle_bank.length).to.equal(23);
    });

    it('should update its category and solution when generating a new puzzle', () => {
      round = new Round;
      puzzle = new Puzzle;
      expect(puzzle.category).to.equal('none');
      expect(puzzle.solution).to.eql(['N', 'O', 'N', 'E'])
      puzzle.generatePuzzle();
      expect(puzzle.category).to.not.equal('none');
      expect(puzzle.solution).to.not.eql(['N', 'O', 'N', 'E'])
    })

    it('should generate a new puzzle where the solution has the same number of words as the current round', () => {
      round = new Round;
      round.round = 'one';
      puzzle.generatePuzzle();
      expect(puzzle.solution.includes(' ')).to.equal(false);
      round.round = 'two';
      puzzle.generatePuzzle();
      expect(puzzle.solution.includes(' ')).to.equal(true);
    });
  });

  describe('Puzzle - GenerateBonusRonus()', () => {

    it('should update its category and solution when generating a new bonus puzzle', () => {
      round = new Round;
      puzzle = new Puzzle;
      expect(puzzle.category).to.equal('none');
      expect(puzzle.solution).to.eql(['N', 'O', 'N', 'E'])
      puzzle.generateBonusPuzzle();
      expect(puzzle.category).to.not.equal('none');
      expect(puzzle.solution).to.not.eql(['N', 'O', 'N', 'E'])
    })

    it('should be able to generate a bonus round puzzle with two words', () => {
      puzzle.generateBonusPuzzle();
      expect(puzzle.solution.includes(' ')).to.equal(true)
    });
  });
})