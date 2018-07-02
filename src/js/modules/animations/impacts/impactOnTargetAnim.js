export default class ImpactOnTargetAnim {
	constructor(impact) {
		this.impact = impact;
		this.currentFrame = 0;
		this.allFrames_sX = this.impact.sprite.allSprites_sX;
		this.spritesNumber = this.allFrames_sX.length;
		this.speed = 0;
	}

	start(targetPosition) {
		this.impact.sound.play();
		this.delayBeforeDeleting(this.impact);
		this.updatePosition(this.impact, targetPosition);
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

	update(impact) {
		this.updateSprites(impact);
	}

	updatePosition(impact, targetPosition) {
		impact.position.x = targetPosition.x;
		impact.position.y = targetPosition.y;
	}

	updateSprites(impact) {
		if (this.currentFrame >= this.spritesNumber) {
			this.currentFrame = 0;
		}
		impact.sprite.sX = this.allFrames_sX[this.currentFrame];
		this.currentFrame++;
	}

	delayBeforeDeleting(impact) {
		const that = this;
		setTimeout(function () {
			that.stop();
			impact.sound.pause();
		}, impact.animationTime);
	}

}