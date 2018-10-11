
const chai = require('chai');
const expect = chai.expect;
const Game = require('../lib/Game.js');

describe('Game', () => {
  it('should default to a round of 1', () => {
    var game = new Game();
    expect(game.round).to.equal(1);
  })
});