import _ from 'lodash';
import FightUnit from './modules/fightUnit/fightUnit';
import GameInterface from './modules/gameInterface/gameInterface';
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => {

	function clearCanvas() {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	clearCanvas();


	gameInterface.pressStartNewGameButton();
}, false);
