export default class Attack {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unit) {
		clearTimeout(unit.timer);
		const fps = 20;
		let startPos = 0;
		const endPos = 270;
		let currentPos = 0;
		let bubble = true;
		let counter = 0;

		function moveRightPlayer(unit) {
			unit.sprites.head.dX += 10;
			unit.sprites.body.dX += 10;
			unit.sprites.hands_left.dX += 11;
			unit.sprites.hands_left.dY -= 2;
			unit.sprites.hands_left.rotation -= 3;

			unit.sprites.hands_right.dX += 12;
			unit.sprites.hands_right.dY -= 1;
			unit.sprites.hands_right.rotation -= 3;

			unit.sprites.legs_left.dX += 11;
			unit.sprites.legs_left.rotation -= 1;

			unit.sprites.legs_right.dX += 8;
			unit.sprites.legs_right.dY -= 1;
			unit.sprites.legs_right.rotation += 2;

			currentPos += 10;
		}

		function moveLeftPlayer(unit) {
			unit.sprites.head.dX -= 10;
			unit.sprites.body.dX -= 10;
			unit.sprites.hands_left.dX -= 11;
			unit.sprites.hands_left.dY += 2;
			unit.sprites.hands_left.rotation += 3;

			unit.sprites.hands_right.dX -= 12;
			unit.sprites.hands_right.dY += 1;
			unit.sprites.hands_right.rotation += 3;

			unit.sprites.legs_left.dX -= 11;
			unit.sprites.legs_left.rotation += 1;

			unit.sprites.legs_right.dX -= 8;
			unit.sprites.legs_right.dY += 1;
			unit.sprites.legs_right.rotation -= 2;
			currentPos -= 10;
		}

		function moveRightMonster(unit) {
			unit.sprites.head.dX += 10;
			unit.sprites.body.dX += 10;
			unit.sprites.hands_left.dX += 11;
			unit.sprites.hands_left.dY += 2;
			unit.sprites.hands_left.rotation -= 3;

			unit.sprites.hands_right.dX += 12;
			unit.sprites.hands_right.dY += 2;
			unit.sprites.hands_right.rotation -= 3;

			unit.sprites.legs_left.dX += 11;
			unit.sprites.legs_left.rotation -= 1;

			unit.sprites.legs_right.dX += 9;
			unit.sprites.legs_right.rotation += 2;
			currentPos -= 10;
		}
		function moveLeftMonster(unit) {
			unit.sprites.head.dX -= 10;
			unit.sprites.body.dX -= 10;
			unit.sprites.hands_left.dX -= 11;
			unit.sprites.hands_left.dY -= 2;
			unit.sprites.hands_left.rotation += 3;

			unit.sprites.hands_right.dX -= 12;
			unit.sprites.hands_right.dY -= 2;
			unit.sprites.hands_right.rotation += 3;

			unit.sprites.legs_left.dX -= 11;
			unit.sprites.legs_left.rotation += 1;

			unit.sprites.legs_right.dX -= 9;
			unit.sprites.legs_right.rotation -= 2;
			currentPos += 10;
		}
		unit.timer = setTimeout(function go() {
			if (bubble) {
				if (currentPos >= endPos) {
					bubble = false;
				}
				if (unit.type === 'player') {
					moveRightPlayer(unit);
				} else {
					moveLeftMonster(unit);
				}
			} else {
				if (currentPos <= startPos + 10) {
					bubble = true;
					counter = 1;
				}
				if (unit.type === 'player') {
					moveLeftPlayer(unit);
				} else {
					moveRightMonster(unit);
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
		clearTimeout(this.unitObj.timer);
	}


}
