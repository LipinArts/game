import Utils from '../../utils/utils';

export default class Fireball {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unit, target) {
		const timeBetweenFrames = 16;
		let speed = 10;
		const x1 = unit.position.x;
		const y1 = unit.position.y;
		const x2 = target.x;
		const y2 = target.y;
		const distance = Utils.getDistanceBetweenPoints(x1, y1, x2, y2);
		let angle = (Math.atan((y2 - y1) / (x2 - x1))) * 180 / Math.PI;
		let force_vector = Utils.get_force_vector(angle);
		let currenMovingDist = 0;

		if (x1 === x2 && y1 === y2) {
			force_vector.x = 0;
			force_vector.y = 0;
		}
		else {
			if (x1 > x2) {
				force_vector.x = force_vector.x * -1;
				force_vector.y = force_vector.y * -1;
			}
		}

		unit.movement.x = force_vector.x * speed;
		unit.movement.y = force_vector.y * speed;


		let allFrames_sX = unit.sprite.allSprites_sX;
		let spritesNumber = allFrames_sX.length;
		let currentFrame = 0;

		function castMoving() {
			unit.position.x = unit.position.x + unit.movement.x;
			unit.position.y = unit.position.y + unit.movement.y;
		}

		function changeSprites() {
			if (currentFrame >= spritesNumber) {
				currentFrame = 0;
			}
			unit.sprite.sX = allFrames_sX[currentFrame];
			currentFrame++;
		}

		function delayBeforeDeleting() {
			unit.sprite = null;
		}

		unit.setTimeOut_id = setTimeout(function go() {
			castMoving();
			changeSprites();
			if (currenMovingDist >= (distance - speed - 1) && (currenMovingDist <= distance + speed + 1)) {
				clearTimeout(unit.setTimeOut_id);
				setTimeout(delayBeforeDeleting, 300);
			} else {
				unit.setTimeOut_id = setTimeout(go, timeBetweenFrames);
			}
			currenMovingDist = currenMovingDist + speed;

		}, timeBetweenFrames);

	}

	start(target) {
		this.animation(this.unitObj, target);
	}

	stop() {

	}

}