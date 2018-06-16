export default class AttackAnimation {
	constructor(impactObj) {
		return {
			casting: this.casting(impactObj),
			moving: this.moving(impactObj),
			impacting: this.impacting(impactObj)
		};
	}

	casting(impactObj) {
		let casting = function standBy(impactObj) {
			const fps = 80;
			const startPos = 0;
			const endPos = 7;
			let currentPos = _.random(startPos, endPos - 1);
			let bubble = true;

			function moveDown() {
				impactObj.sprites.head.dY += .5;
				impactObj.sprites.body.dY += .7;
				impactObj.sprites.hands.dY += .5;
				currentPos += 1;
			}

			function moveUp() {
				impactObj.sprites.head.dY -= .5;
				impactObj.sprites.body.dY -= .7;
				impactObj.sprites.hands.dY -= .5;
				currentPos -= 1;
			}
			impactObj.timer = setTimeout(function go() {
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
				impactObj.timer = setTimeout(go, fps);
			}, fps);
		}(impactObj);

		return casting;
	}

	moving(impactObj) {
		let casting = function standBy(impactObj) {
			const fps = 80;
			const startPos = 0;
			const endPos = 7;
			let currentPos = _.random(startPos, endPos - 1);
			let bubble = true;

			function moveDown() {
				impactObj.sprites.head.dY += .5;
				impactObj.sprites.body.dY += .7;
				impactObj.sprites.hands.dY += .5;
				currentPos += 1;
			}

			function moveUp() {
				impactObj.sprites.head.dY -= .5;
				impactObj.sprites.body.dY -= .7;
				impactObj.sprites.hands.dY -= .5;
				currentPos -= 1;
			}
			impactObj.timer = setTimeout(function go() {
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
				impactObj.timer = setTimeout(go, fps);
			}, fps);
		}(impactObj);

		return casting;
	}

	impacting(impactObj) {
		let casting = function standBy(impactObj) {
			const fps = 80;
			const startPos = 0;
			const endPos = 7;
			let currentPos = _.random(startPos, endPos - 1);
			let bubble = true;

			function moveDown() {
				impactObj.sprites.head.dY += .5;
				impactObj.sprites.body.dY += .7;
				impactObj.sprites.hands.dY += .5;
				currentPos += 1;
			}

			function moveUp() {
				impactObj.sprites.head.dY -= .5;
				impactObj.sprites.body.dY -= .7;
				impactObj.sprites.hands.dY -= .5;
				currentPos -= 1;
			}
			impactObj.timer = setTimeout(function go() {
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
				impactObj.timer = setTimeout(go, fps);
			}, fps);
		}(impactObj);

		return casting;
	}

}