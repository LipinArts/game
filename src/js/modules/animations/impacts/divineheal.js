import Utils from '../../utils/utils';

export default class DivineHeal {
	constructor(unitObj) {
		this.unitObj = unitObj;
	}

	animation(unit, targetPosition) {
		const timeBetweenFrames = 16;

		let allFrames_sX = unit.sprite.allSprites_sX;
		let spritesNumber = allFrames_sX.length;
		let currentFrame = 0;

		unit.animation.finish = false;

		function healingTarget() {
			unit.position.x = targetPosition.x;
			unit.position.y = targetPosition.y;
		}

		function changeSprites() {
			if (currentFrame >= spritesNumber) {
				currentFrame = 0;
			}
			unit.sprite.sX = allFrames_sX[currentFrame];
			currentFrame++;
		}

		function delayBeforeDeleting() {
			unit.animation.finish = true;
			clearTimeout(unit.setTimeOut_id);
		}

		unit.sound.play();


		setTimeout(() => {
			delayBeforeDeleting();
			unit.sound.pause();
		}, unit.animationTime);
		unit.setTimeOut_id = setTimeout(function go() {
			healingTarget();
			changeSprites();

			unit.setTimeOut_id = setTimeout(go, timeBetweenFrames);

		}, timeBetweenFrames);

	}

	start(targetPosition) {
		this.animation(this.unitObj, targetPosition);
	}

	stop() {

	}

}
