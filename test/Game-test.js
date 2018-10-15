
const chai = require('chai');
const expect = chai.expect;
const Game = require('../lib/Game.js');
const spies = require('chai-spies');
chai.use(spies);

global.updateDom = require('../lib/updateDom.js');
chai.spy.on(global.updateDom, ['endTurn', 'nextPlayerDom', 'instruct', 'launchActionPopup', 'disableLetters'], () => true);

describe('Game', () => {
  var game;
  var player1;
  var player2;
  var player3;

  beforeEach(() => {
    player1 = {
      name: 'jim'
    };
    player2 = {
      name: 'john'
    };
    player3 = {
      name: 'jake'
    };
    game = new Game(player1, player2, player3);
  });

  it('should be able to take in player objects and store them in an array', () => {
    expect(game.players).to.eql([player1, player2, player3]);
  });

  it('should keep track of the current player and default to the first player', () => {
    expect(game.currentPlayerIndex).to.equal(0);
  });

  it('should be able to move to the next player', () => {
    currentPlayer = player1;
    game.nextPlayer();
    expect(game.currentPlayerIndex).to.equal(1);
    expect(currentPlayer).to.equal(player2);
  });

  it('should update the dom when moving to the next player', () => {
    currentPlayer = player1;
    game.nextPlayer();
    expect(updateDom.endTurn).to.have.been.called(2)
    expect(updateDom.instruct).to.have.been.called(2)
    expect(updateDom.nextPlayerDom).to.have.been.called(2)
  });
});