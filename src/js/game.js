import _ from 'lodash';

import FightUnit from './modules/fightUnit/fightUnit';
let unit = new FightUnit();


//unit canvas render test
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

let headY = 150;
let bodyY = 300;
let handsY = 318;
let legsY = 460;
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (headY < 155) {
		headY += 1;
	} else {
		headY = 150;
	}
	if (bodyY < 305) {
		bodyY += 1;
	} else {
		bodyY = 300;
	}
	if (handsY > 315) {
		handsY -= 1;
	} else {
		handsY = 318;
	}

	ctx.drawImage(legs, unit.sprites.legs.sX, unit.sprites.legs.sY, unit.sprites.legs.width, unit.sprites.legs.height, 420, legsY, unit.sprites.legs.width, unit.sprites.legs.height);
	ctx.drawImage(body, unit.sprites.body.sX, unit.sprites.body.sY, unit.sprites.body.width, unit.sprites.body.height, 500, bodyY, unit.sprites.body.width, unit.sprites.body.height);
	ctx.drawImage(head, unit.sprites.head.sX, unit.sprites.head.sY, unit.sprites.head.width, unit.sprites.head.height, 500, headY, unit.sprites.head.width, unit.sprites.head.height);
	ctx.drawImage(hands, unit.sprites.hands.sX, unit.sprites.hands.sY, unit.sprites.hands.width, unit.sprites.hands.height, 435, handsY, unit.sprites.hands.width, unit.sprites.hands.height);
}

function render() {

}
