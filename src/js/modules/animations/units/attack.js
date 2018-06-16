export default class Attack {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unit) {
		clearTimeout(unit.timer);
		const fps = 20;
		let startPos = 0;
		const endPos = 200;
		let currentPos = 0;
		let bubble = true;
		let counter = 0;

		function moveRightPlayer() {
			unit.sprites.head.dX += 10;
			unit.sprites.body.dX += 10;
			unit.sprites.hands.dX += 10;
			unit.sprites.legs.dX += 10;
			currentPos += 10;
		}
		function moveleftPlayer() {
			unit.sprites.head.dX -= 10;
			unit.sprites.body.dX -= 10;
			unit.sprites.hands.dX -= 10;
			unit.sprites.legs.dX -= 10;
			currentPos -= 10;
		}

		function moveRightMonster() {
			unit.sprites.head.dX += 10;
			unit.sprites.body.dX += 10;
			unit.sprites.hands.dX += 10;
			unit.sprites.legs.dX += 10;
			currentPos -= 10;
		}
		function moveleftMonster() {
			unit.sprites.head.dX -= 10;
			unit.sprites.body.dX -= 10;
			unit.sprites.hands.dX -= 10;
			unit.sprites.legs.dX -= 10;
			currentPos += 10;
		}
		unit.timer = setTimeout(function go() {
			if (bubble) {
				if (currentPos > endPos) {
					bubble = false;
				}
				if (unit.type === 'player') {
					moveRightPlayer();
				} else {
					moveleftMonster();
				}
			} else {
				if (currentPos < startPos + 30) {
					bubble = true;
					counter = 1;
				}
				if (unit.type === 'player') {
					moveleftPlayer();
				} else {
					moveRightMonster();
				}
			}
			if (counter === 0) {
				unit.timer = setTimeout(go, fps);
			} else {
				clearTimeout(unit.timer);
			}
		}, fps);

	}

	start() {
		this.animation(this.unitObj);
	}

	stop() {

	}


}