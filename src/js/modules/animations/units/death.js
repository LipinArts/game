export default class Death {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unitObj) {
		clearTimeout(unitObj.timer);
		const fps = 25;
		let startPos = 0;
		const endPos = unitObj.unitSize.height;

		function moveDown(unitObj) {
			if (unitObj.type === 'monster') {
				unitObj.sprites.head.dY += 11;
				unitObj.sprites.head.rotation += 6;
				unitObj.sprites.body.dY += 6;
				unitObj.sprites.body.rotation = 90;
				unitObj.sprites.hands_left.dY += 1;
				unitObj.sprites.hands_left.dX -= 3;
				unitObj.sprites.hands_left.rotation += 15;
				unitObj.sprites.hands_right.dY += 1;
				unitObj.sprites.hands_right.dX += 3;
				unitObj.sprites.hands_right.rotation -= 15;
				unitObj.sprites.legs_left.dY += 1;
				unitObj.sprites.legs_left.dX -= 3;
				unitObj.sprites.legs_left.rotation += 6;
				unitObj.sprites.legs_right.dY += 1;
				unitObj.sprites.legs_right.dX += 3;
				unitObj.sprites.legs_right.rotation -= 6;
				startPos += 10;
			} else {
				unitObj.sprites.head.dY += 11;
				unitObj.sprites.head.dX -= 11;
				unitObj.sprites.head.rotation -= 6.8;
				unitObj.sprites.body.dX -= 6;
				unitObj.sprites.body.dY += 6.5;
				unitObj.sprites.body.rotation -= 6.8;
				unitObj.sprites.hands_left.dY += 5;
				unitObj.sprites.hands_left.dX -= 4;
				unitObj.sprites.hands_left.rotation -= 6.8;
				unitObj.sprites.hands_right.dY += 5;
				unitObj.sprites.hands_right.dX -= 4.5;
				unitObj.sprites.hands_right.rotation -= 6.8;
				unitObj.sprites.legs_left.dY += 0;
				unitObj.sprites.legs_left.dX -= 0;
				unitObj.sprites.legs_left.rotation -= 6.8;
				unitObj.sprites.legs_right.dY += 0;
				unitObj.sprites.legs_right.dX += 0;
				unitObj.sprites.legs_right.rotation -= 6.8;
				startPos += 10;
			}

		}
		setTimeout(function go() {
			if (startPos < endPos) {
				moveDown(unitObj);
			}
			setTimeout(go, fps);
		}, fps);

	}

	start() {
		this.animation(this.unitObj);
	}

	stop() {
		clearTimeout(this.unitObj.timer);
	}


}
