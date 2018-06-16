export default class Death {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unitObj) {
		clearTimeout(unitObj.timer);
		const fps = 25;
		let startPos = 0;
		const endPos = unitObj.sprites.legs.dY;

		function moveDown() {
			unitObj.sprites.head.dY += 10;
			unitObj.sprites.body.dY += 5;
			unitObj.sprites.hands.dY += 5;
			startPos += 8;
		}
		setTimeout(function go() {
			if (startPos < endPos) {
				moveDown();
			}
			setTimeout(go, fps);
		}, fps);

	}

	start() {
		this.animation(this.unitObj);
	}

	stop() {

	}


}