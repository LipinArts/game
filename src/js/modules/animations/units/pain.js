export default class Pain {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unit) {
		clearTimeout(unit.timer);
		const fps = 80;
		const startPos = 0;
		const endPos = 10;
		let currentPos = 0;
		let counter = 0;
		let bubble = true;

		function moveDown() {
			unit.sprites.head.dY += 1;
			// unit.sprites.body.dY += 2;
			// unit.sprites.hands.dY += .5;
			currentPos += 1;
		}

		function moveUp() {
			unit.sprites.head.dY -= 1;
			// unit.sprites.body.dY -= 2;
			// unit.sprites.hands.dY -= .5;
			currentPos -= 1;
		}
		unit.timer = setTimeout(function go() {
			if (bubble) {
				if (currentPos > endPos) {
					bubble = false;
				}
				moveDown();
			} else {
				if (currentPos < startPos) {
					bubble = true;
					counter = 1;
				}
				moveUp();
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