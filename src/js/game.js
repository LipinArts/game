import _ from 'lodash';
import FightUnit from './modules/fightUnit/fightUnit';
import Utils from './modules/utils/utils';
import GameInterface from './modules/gameInterface/gameInterface';
import UserTask from './modules/userTask/userTask';

const x = new UserTask();
console.log(x);


// const gameInterface = new GameInterface();
// document.getElementById('startButt_id').addEventListener('click', () => {

// 	function clearCanvas() {
// 		const canvas = document.getElementById('canvas');
// 		const ctx = canvas.getContext('2d');
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	}
// 	clearCanvas();

// 	const player1 = new FightUnit('player');
// 	const player2 = new FightUnit('player');
// 	const player3 = new FightUnit('player');

// 	const monster1 = new FightUnit('monster');
// 	const monster2 = new FightUnit('monster');
// 	const monster3 = new FightUnit('monster');


// 	Utils.testUnitRender(player1, 200, 100);
// 	Utils.testUnitRender(player2, 0, 400);
// 	Utils.testUnitRender(player3, 400, 400);

// 	Utils.testUnitRender(monster1, 1500, 100);
// 	Utils.testUnitRender(monster2, 1300, 400);
// 	Utils.testUnitRender(monster3, 1700, 400);

// 	gameInterface.pressStartNewGameButton();
// }, false);
