import _ from 'lodash';
import FightUnit from './modules/fightUnit/fightUnit';

import GameInterface from './modules/gameInterface/gameInterface';
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => {
	gameInterface.pressStartNewGameButton();
}, false);

const unit = new FightUnit('player');

//unit canvas render test function
function testUnit() {
	h2.innerText = unit.name;
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const head = new Image();
	const body = new Image();
	const hands = new Image();
	const legs = new Image();
	head.src = unit.sprites.head.path;
	hands.src = unit.sprites.hands.path;
	legs.src = unit.sprites.legs.path;
	body.src = unit.sprites.body.path;

	let tick_count = 0;
	body.onload = function () {
		tick();
		requestAnimationFrame(tick);
	};

	function tick() {
		if (tick_count > 25) {
			draw();
			tick_count = 0;
		}
		tick_count += 1;
		requestAnimationFrame(tick);
	}

	function draw() {
		ctx.drawImage(legs, unit.sprites.legs.sX, unit.sprites.legs.sY, unit.sprites.legs.width, unit.sprites.legs.height, unit.sprites.legs.dX, unit.sprites.legs.dY, unit.sprites.legs.width, unit.sprites.legs.height);
		ctx.drawImage(body, unit.sprites.body.sX, unit.sprites.body.sY, unit.sprites.body.width, unit.sprites.body.height, unit.sprites.body.dX, unit.sprites.body.dY, unit.sprites.body.width, unit.sprites.body.height);
		ctx.drawImage(head, unit.sprites.head.sX, unit.sprites.head.sY, unit.sprites.head.width, unit.sprites.head.height, unit.sprites.head.dX, unit.sprites.head.dY, unit.sprites.head.width, unit.sprites.head.height);
		ctx.drawImage(hands, unit.sprites.hands.sX, unit.sprites.hands.sY, unit.sprites.hands.width, unit.sprites.hands.height, unit.sprites.hands.dX, unit.sprites.hands.dY, unit.sprites.hands.width, unit.sprites.hands.height);
	}
}
testUnit();
//------------------------------------------------------------
