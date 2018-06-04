import _ from 'lodash';

import GameInterface from './modules/gameInterface/gameInterface';
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => { gameInterface.pressStartNewGameButton(); }, false);


import FightUnit from './modules/fightUnit/fightUnit';
let x = new FightUnit();
console.log(x);