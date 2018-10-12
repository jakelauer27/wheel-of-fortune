const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

global.Game = require('../lib/Game.js');
global.Wheel = require('../lib/Game.js');
global.Round = require('../lib/Game.js');
global.Player = require('../lib/Game.js');
global.Puzzle = require('../lib/Game.js');
global.updateDom = require('../lib/updateDom.js');
chai.spy.on(global.updateDom, ['endTurn', 'nextPlayerDom', 'instruct'], () => true);