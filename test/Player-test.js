const Player = require('../lib/player');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

global.updateDom = require('../lib/updateDom.js');
chai.spy.on(global.updateDom, ['addScoreDom', 'addTotalDom', 'bankruptDom' ], () => true);

describe('Player', () => {

  var player; 

  beforeEach(() => {
    player = new Player('player1');
  });

  it('should take in a name', () => {
    expect(player.name).to.equal('player1')
  }); 

  it('should have a default score and total of zero', () => {
    expect(player.score).to.equal(0)
    expect(player.total).to.equal(0)
  }); 

  it('should be able to increment its score', () => {
    player.addScore(100);
    expect(player.score).to.equal(100);
    player.addScore(-200);
    expect(player.score).to.equal(-100);
  });

  it('should be able to add its score to its total', () => {
    player.addScore(100);
    player.addScore(700);
    player.addTotal()
    expect(player.score).to.equal(0);
    expect(player.total).to.equal(800);
  });

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

})