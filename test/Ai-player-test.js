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
      puzzle = new Puzzle()
      expect(aiPlayer.chooseLetter()).to.have.property('correct');
      expect(aiPlayer.chooseLetter()).to.have.property('chosenLetter');
    });

    it('the returned object correct property should return a boolean', () => {
      puzzle = new Puzzle()
      expect((aiPlayer.chooseLetter()).correct).to.be.boolean();
    });

    // it('should call either the correct or incorrect method', () => {
    //   puzzle = new Puzzle();
    //   console.log(aiPlayer.chooseCorrectLetter())
      
    // });

  })

})