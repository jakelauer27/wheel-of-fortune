global.Player = require('../lib/player.js');
const AiPlayer = require('../lib/Ai-player');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const asserttype = require('chai-asserttype');
chai.use(asserttype);
chai.use(spies);

global.Puzzle = require('../lib/puzzle.js');
global.Wheel = require('../lib/wheel.js');
global.updateDom = require('../lib/updateDom.js');
chai.spy.on(global.updateDom, ['aiSpinWheel', 'aiChooseCorrectLetter', 'aiChooseIncorrectLetter', 'aiSolve' ], () => true);

describe('AIPlayer', () => {

  var aiPlayer; 

  beforeEach(() => {
    aiPlayer = new AiPlayer('Tim', 'player2');
  });

  it('should take in a name', () => {
    expect(aiPlayer.name).to.equal('Tim');
  }); 

  it('should take in a player number', () => {
    expect(aiPlayer.playerNumber).to.equal('player2');
  }); 

  it('should have a default score and total of zero', () => {
    expect(aiPlayer.score).to.equal(0);
    expect(aiPlayer.total).to.equal(0);
  }); 

  it('should have an ai property that equals true', () => {
    expect(aiPlayer.ai).to.equal(true);
  });

  describe('AIPlayer - spinWheel()', () => {  

    it('should spin the wheel on the dom', () => {
      wheel = new Wheel();
      aiPlayer.spinWheel();
      expect(updateDom.aiSpinWheel).to.have.been.called(1)
    });

    it('should return false if current wheel element is a string', () => {
      wheel = new Wheel();
      wheel.currentElement = 'Hi';
      expect(aiPlayer.spinWheel()).to.equal(false);
    });

    it('should return true if current wheel element is not a string', () => {
      wheel = new Wheel();
      wheel.currentElement = 500;
      expect(aiPlayer.spinWheel()).to.equal(true);
    });

  });

  describe('AIPlayer - chooseLetter()', () => {

    it('should return an object with two properties', () => {
      puzzle = new Puzzle();
      expect(aiPlayer.chooseLetter()).to.have.property('correct');
      expect(aiPlayer.chooseLetter()).to.have.property('chosenLetter');
    });

    it('the returned object correct property should return a boolean', () => {
      puzzle = new Puzzle();
      expect((aiPlayer.chooseLetter()).correct).to.be.boolean();
    });

  });

  describe('AIPlayer - chooseCorrectLetter()', () => {
    
    it('Should attempt choose a correct letter on the dom', () => {
      updateDom.aiChooseCorrectLetter.__spy.calls = []
      aiPlayer.chooseCorrectLetter();
      expect(updateDom.aiChooseCorrectLetter).to.have.been.called(1);
    })
  });

  describe('AIPlayer - chooseIncorrectLetter()', () => {
    
    it('should choose an incorrect letter on the dom', () => {
      updateDom.aiChooseIncorrectLetter.__spy.calls = []
      aiPlayer.chooseIncorrectLetter();
      expect(updateDom.aiChooseIncorrectLetter).to.have.been.called(1);
    });
  });

  describe('AIPlayer - vowelCheck()', () => {
  
    it('should return true if value is a consonant', () => {
      expect(aiPlayer.vowelCheck('F')).to.equal(true);
    });
  
    it('should return true if value is a vowel and the player score is not 0', () => {
      aiPlayer.score = 100;
      expect(aiPlayer.vowelCheck('A')).to.equal(true);
    });
  
    it('should return false if value is a vowel but player score is zero', () => {
      aiPlayer.score = 0;
      expect(aiPlayer.vowelCheck('A')).to.equal(false);
    });
  });

  describe('AIPlayer - solve()', () => {
    
    it('should be able to solve the puzzle on the dom', () => {
      aiPlayer.solve();
      expect(updateDom.aiSolve).to.have.been.called(1);
    })
  });

})