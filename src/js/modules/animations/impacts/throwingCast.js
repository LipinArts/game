import Utils from '../../utils/utils';

export default class ThrowingCast {
	constructor(impact) {
		this.impact = impact;
		this.currentFrame;
		this.allFrames_sX = this.impact.sprite.allSprites_sX;
		this.spritesNumber = this.allFrames_sX.length;
		this.speed = 10;
		this.distance;
		this.currentMovingDist;
		this.onceFlag;
	}

	initObject() {
		this.currentFrame = 0;
		this.distance = 0;
		this.currentMovingDist = 0;
		this.onceFlag = true;
		this.impact.animation.finish = false;
	}

	start(targetPosition) {
		this.initObject();
		this.impact.sound.play();
		this.updateMovement(this.impact, targetPosition);
		this.startAnimationLoop(this.impact, targetPosition);
	}

	stop() {
		this.impact.animation.finish = true;
	}

	startAnimationLoop(impact, targetPosition) {
		const that = this;
		let now;
		let dt = 0;
		let last = timestamp();
		let step = 1 / 60;

		function timestamp() {
			return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
		}

		function frame() {
			if (that.impact.animation.finish === false) {
				now = timestamp();
				dt = dt + Math.min(1, (now - last) / 1000);
				while (dt > step) {
					dt = dt - step;
					that.update(impact, targetPosition);
				}
				last = now;
				requestAnimationFrame(frame);
			}
		}
		this.impact.animation.finish = false;
		requestAnimationFrame(frame);
	}

	update(impact, targetPosition) {
		this.updateSprites(impact);
		if (this.onceFlag) {
			if (this.isTargetReached()) {
				this.onceFlag = false;
				// neet test mb have bugs when delation less then time between frames
				const timeDelation = 500;
				this.delayBeforeDeleting(impact, timeDelation);
			}
			else {
				this.updatecurrentMovingDist();
				this.updatePosition(this.impact, targetPosition);
			}
		}
	}

	updateMovement(impact, targetPosition) {
		const x1 = impact.position.x;
		const y1 = impact.position.y;
		const x2 = targetPosition.x;
		const y2 = targetPosition.y;
		this.distance = Utils.getDistanceBetweenPoints(x1, y1, x2, y2);
		const angle = (Math.atan((y2 - y1) / (x2 - x1))) * 180 / Math.PI;
		const force_vector = Utils.get_force_vector(angle);

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

		impact.movement.x = force_vector.x * this.speed;
		impact.movement.y = force_vector.y * this.speed;
	}

	updatecurrentMovingDist() {
		this.currentMovingDist = this.currentMovingDist + this.speed;
	}

	updatePosition(impact) {
		impact.position.x = impact.position.x + impact.movement.x;
		impact.position.y = impact.position.y + impact.movement.y;
	}

	updateSprites(impact) {
		if (this.currentFrame >= this.spritesNumber) {
			this.currentFrame = 0;
		}
		impact.sprite.sX = this.allFrames_sX[this.currentFrame];
		this.currentFrame++;
	}

	delayBeforeDeleting(impact, time = impact.animationTime) {
		setTimeout(() => {
			this.stop();
			impact.sound.pause();
		}, time);
	}

	isTargetReached() {
		return this.currentMovingDist >= this.distance;
	}

}
