import _ from 'lodash';
export default class StandBy {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unitObj) {
		const fps = 80;
		const startPos = 0;
		const endPos = 7;
		let currentPos = _.random(startPos, endPos - 1);
		let bubble = true;

		function moveDown() {
			unitObj.sprites.head.dY += .5;
			unitObj.sprites.body.dY += .7;
			unitObj.sprites.hands.dY += .5;
			currentPos += 1;
		}

		function moveUp() {
			unitObj.sprites.head.dY -= .5;
			unitObj.sprites.body.dY -= .7;
			unitObj.sprites.hands.dY -= .5;
			currentPos -= 1;
		}
		unitObj.timer = setTimeout(function go() {
			if (bubble) {
				if (currentPos > endPos) {
					bubble = false;
				}
				moveDown();
			} else {
				if (currentPos < startPos) {
					bubble = true;
				}
				moveUp();
			}
			unitObj.timer = setTimeout(go, fps);
		}, fps);

	}

	start() {
		this.animation(this.unitObj);
	}

	stop() {

	}


}