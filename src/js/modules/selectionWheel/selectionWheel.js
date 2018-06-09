export default class SelectionWheel {
	constructor(obj) {
		this.obj = obj;
		this.selectedProperty;
		this.startSelectingCycle();
		this.frameLoopRunning = false;

		return this.selectedProperty;
	}

	startSelectingCycle() {
		const that = this;
		let now;
		let dt = 0;
		let last = timestamp();
		let step = 1 / 60;

		function timestamp() {
			return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
		}

		function frame() {
			if (that.frameLoopRunning) {
				now = timestamp();

				dt = dt + Math.min(1, (now - last) / 1000);
				while (dt > step) {
					dt = dt - step;
					that.update();
				}
				that.render();
				last = now;
				requestAnimationFrame(frame);
			}
		}

		this.frameLoopRunning = true;
		requestAnimationFrame(frame);
	}

	update() {
		if (this.selectingNotOver()) {
			this.updateSelecting();
		}
	}

	updateSelecting() {
		if (KeyboardController.pressedKeys.impact) {
			KeyboardController.pressedKeys.impact = false;
			this.selectedUnit = this.nextTarget();
		}

	}
}