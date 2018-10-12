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

  // it('should have a beable to buy a vowel ', () => {
  //   letter = 'O';
  //    expect(player.name).to.equal('player1')
  // }); 

})