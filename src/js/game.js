import _ from 'lodash';
import FightUnit from './modules/fightUnit/fightUnit';

import GameInterface from './modules/gameInterface/gameInterface';
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => {
	gameInterface.pressStartNewGameButton();
}, false);
