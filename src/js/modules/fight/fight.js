import KeyboardController from '../KeyboardController/KeyboardController';
import Utils from '../utils/utils';

export default class Fight {
	constructor(attacker, defender, generator) {
		this.attacker = attacker;
		this.defender = defender;
		this.round = 0;
		this.enableSelectingFlag = false;
		this.isImpactDone = false;
		this.selectedUnit = this.attacker[0];
		this.selectedUnitIndex = 0;
		this.maxUnits = this.attacker.length + this.defender.length;

		this.generatorlvl = generator;
		console.log(this.generatorlvl);


		this.gameLoopRunning = false;
		if (this.isFightNotOver() === false) {
			console.log('input data is wrong');
		}
		this.fightModulCycle();
		return {
			'attacker': this.attacker,
			'defender': this.defender
		};
	}

	fightModulCycle() {
		this.showLoadingScreen();
		this.generateGameField();
		this.addUnitInterfaces();
		this.startGameLoop();
	}

	showLoadingScreen() {
		console.log('loading screen');
	}

	generateGameField() {
		console.log('generateGameField()');
	}

	addUnitInterfaces() {
		console.log('addUnitInterfaces()');
	}

	startGameLoop() {
		const that = this;
		let now;
		let dt = 0;
		let last = timestamp();
		let step = 1 / 60;

		function timestamp() {
			return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
		}

		function frame() {
			if (that.gameLoopRunning) {
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

		this.gameLoopRunning = true;
		requestAnimationFrame(frame);
	}

	update() {
		if (this.isFightNotOver()) {
			this.updateSelecting();

		}
		else {
			this.gameLoopRunning = false;
			console.log('fight is over');
		}
	}

	isFightNotOver() {
		return this.isGroupAlive(this.attacker) && this.isGroupAlive(this.defender);
	}

	updateSelecting() {
		if (KeyboardController.pressedKeys.nextTarget) {
			console.log('next target');
			this.generatorlvl.next();
			KeyboardController.pressedKeys.nextTarget = false;
		}
		else {
			if (KeyboardController.pressedKeys.prevTarget) {
				console.log('prev target');
				KeyboardController.pressedKeys.prevTarget = false;
			}
		}

	}

	render() {
		console.log(this.defender[0].name + 'render');
		// console.log('render');
		Utils.testUnitRender(this.attacker[0], 200, 100);
		Utils.testUnitRender(this.attacker[1], 0, 400);
		Utils.testUnitRender(this.attacker[2], 400, 400);

		Utils.testUnitRender(this.defender[0], 1500, 100);
		Utils.testUnitRender(this.defender[1], 1300, 400);
		Utils.testUnitRender(this.defender[2], 1700, 400);
	}

	isGroupAlive(groupOfUnits) {
		return groupOfUnits.some(unit => unit.hp > 0);
	}

	isUnitAlive(unit) {
		return unit.hp > 0;
	}

	impact(atackerUnit, target) {
		this.isImpactDone = true;
	}


	nextTarget() {
		this.selectedUnitIndex++;
		if (this.selectedUnitIndex < this.attacker.length - 1) {
			return this.attacker[this.selectedUnitIndex];
		}
		else {
			return this.defender[this.selectedUnitIndex - 3];
		}

	}


}