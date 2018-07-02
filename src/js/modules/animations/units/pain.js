export default class Pain {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unit) {
		clearTimeout(unit.timer);
		const fps = 30;
		const startPos = 0;
		const endPos = 20;
		let currentPos = 0;
		let counter = 0;
		let bubble = true;

		function moveDown(unit) {
			unit.sprites.head.dY += 1;
			unit.sprites.head.rotation += 1;
			unit.sprites.body.dY += 1;

			unit.sprites.hands_left.dX -= 1;
			unit.sprites.hands_left.rotation += 1;

			unit.sprites.hands_right.dX += 1;
			unit.sprites.hands_right.rotation -= 1;
			currentPos += 2;
		}

		function moveUp(unit) {
			unit.sprites.head.dY -= 1;
			unit.sprites.head.rotation -= 1;
			unit.sprites.body.dY -= 1;

			unit.sprites.hands_left.dX += 1;
			unit.sprites.hands_left.rotation -= 1;

			unit.sprites.hands_right.dX -= 1;
			unit.sprites.hands_right.rotation += 1;
			currentPos -= 2;

		}
		unit.timer = setTimeout(function go() {
			if (bubble) {
				if (currentPos >= endPos) {
					bubble = false;
				}
				moveDown(unit);
			} else {
				if (currentPos <= startPos + 2) {
					bubble = true;
					counter = 1;
				}
				moveUp(unit);
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
