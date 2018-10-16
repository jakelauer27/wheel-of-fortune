const Player = require('../lib/player');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

global.updateDom = require('../lib/updateDom.js');
chai.spy.on(global.updateDom, ['addScore', 'addTotal', 'bankrupt' ], () => true);

describe('Player', () => {

  var player; 

  beforeEach(() => {
    player = new Player('Tim', 'player1');
  });

  it('should take in a name', () => {
    expect(player.name).to.equal('Tim')
  }); 

  it('should take in a player number', () => {
    expect(player.playerNumber).to.equal('player1')
  }); 

  it('should have a default score and total of zero', () => {
    expect(player.score).to.equal(0)
    expect(player.total).to.equal(0)
  }); 

  describe('Player - addScore()', () => {

    it('should be able to increment its score', () => {
      player.addScore(100);
      expect(player.score).to.equal(100);
      player.addScore(-200);
      expect(player.score).to.equal(-100);
    });

    it('should update the dom when it increments its score', ()=> {
      updateDom.addScore.__spy.calls = [];
      player.addScore(100);
      expect(updateDom.addScore).to.have.been.called(1)
    });
  });

  describe('Player - addTotal()', () => {

    it('should be able to add its score to its total', () => {
      player.addScore(100);
      player.addScore(700);
      player.addTotal()
      expect(player.score).to.equal(0);
      expect(player.total).to.equal(800);
    });

    it('should update the dom when it adds its total', ()=> {
      updateDom.addTotal.__spy.calls = [];
      player.addTotal();
      expect(updateDom.addTotal).to.have.been.called(1)
    });
  });

  describe('Player - bankrupt()', () => {

    it('should be able to have its score go bankrupt', () => {
      player.addScore(100);
      player.addScore(700);
      player.bankrupt()
      expect(player.score).to.equal(0);
    });
  
    it('should not be able to have its total go bankrupt', () => {
      player.addScore(100);
      player.addTotal()
      player.bankrupt()
      expect(player.total).to.equal(100);
    });

    it('should update the dom when it goes bankrupt', ()=> {
      updateDom.bankrupt.__spy.calls = [];
      player.bankrupt();
      expect(updateDom.bankrupt).to.have.been.called(1)
    });
  });
 
  describe('Player - reset()', () => {
    
    it('should be able to reset its score and total to 0', () => {
      player.addScore(700);
      player.addTotal()
      player.reset();
      expect(player.total).to.equal(0);
      expect(player.score).to.equal(0);
    });

    it('should update the total on the dom when its reset', ()=> {
      updateDom.addTotal.__spy.calls = [];
      player.reset();
      expect(updateDom.addTotal).to.have.been.called(1)
    });
  });
})