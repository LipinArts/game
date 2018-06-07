import KeyboardController from '../KeyboardController/KeyboardController';

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
		this.startGameLoop();
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
	}









	startFightLoop() {
		while (this.isGroupAlive(this.attacker) && this.isGroupAlive(this.defender)) {
			this.round++;
			this.unitsTurnsInThisRound();
			if (this.round > 100) {
				throw new Error('detect endless FightLoop');
			}
		}

	}

	unitsTurnsInThisRound() {
		// return new Promise(resolve => {
		// 	for (let i = 0; i < 3; i++) {
		// 		if (this.isUnitAlive(this.attacker[i])) {
		// 			this.unitTurn(this.attacker[i]);
		// 		}
		// 		if (this.isUnitAlive(this.defender[i])) {
		// 			this.unitTurn(this.defender[i]);
		// 		}
		// 	}
		// 	resolve();
		// });
	}

	isGroupAlive(groupOfUnits) {
		return groupOfUnits.some(unit => unit.hp > 0);
	}

	isUnitAlive(unit) {
		return unit.hp > 0;
	}

	// async unitTurn(unit) {
	// 	let target;
	// 	if (unit.type === 'player') {
	// 		console.log('this.playerSelectUnitForImpact();');
	// 		target = await this.resolveAfterSelectingUnitOrTimer();
	// 	}
	// 	else {
	// 		//unit.AI
	// 	}
	// 	//this.impact(unit, target);
	// }

	// resolveAfterSelectingUnitOrTimer() {

	// 	this.enableSelectingFlag = true;
	// 	return new Promise(resolve => {
	// 		setTimeout(() => {
	// 			resolve(console.log('time to turn is end'));
	// 		}, 10000);
	// 		// while (this.isImpactDone === false) {
	// 		// 	this.enableSelectingFlag = true;

	// 		// }
	// 		// this.enableSelectingFlag = false;
	// 		// resolve();
	// 	});

	// 	// function resolveAfter2Seconds(x) {
	// 	// 	return new Promise(resolve => {
	// 	// 		setTimeout(() => {
	// 	// 			resolve(x);
	// 	// 		}, 5000);
	// 	// 	});
	// 	// }

	// 	// async function f1() {
	// 	// 	var x = await resolveAfter2Seconds(10);
	// 	// 	console.log(x); // 10
	// 	// }
	// 	// f1();


	// }

	impact(atackerUnit, target) {
		this.isImpactDone = true;
	}

	keyupActions(event) {
		if (!this.enableSelectingFlag) {
			return;
		}
		switch (event) {
		case 'nextTarget':
			this.nextTarget();
			break;
		case 'prevTarget':
			this.prevTarget();
			break;
		case 'impact':
			this.enableSelectingFlag = false;
			this.impact();
			break;
		}

	}

	keydownActions(event) {

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