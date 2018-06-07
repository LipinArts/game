import KeyboardController from '../KeyboardController/KeyboardController';

export default class Fight {
	constructor(attacker, defender, generator) {
		this.attacker = attacker;
		this.defender = defender;
		this.round = 0;
		this.enableSelectingFlag = false;

		this.selectedUnit = this.attacker[0];
		this.activeUnit = this.attacker[0];

		this.selectedUnitIndex = 0;
		this.activeUnitIndex = 0;

		this.generatorlvl = generator;

		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');


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
			this.updateImpact();
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
			//this.generatorlvl.next();
			KeyboardController.pressedKeys.nextTarget = false;
			this.selectedUnit = this.nextTarget();
		}
		else {
			if (KeyboardController.pressedKeys.prevTarget) {
				this.selectedUnit = this.prevTarget();
				console.log('prev target');
				KeyboardController.pressedKeys.prevTarget = false;
			}
		}

	}

	updateImpact() {
		if (KeyboardController.pressedKeys.impact) {
			console.log('impact done the next unit turn');
			this.impact(this.activeUnit, this.selectedUnit);
			KeyboardController.pressedKeys.impact = false;
			this.activeUnit = this.nextActiveUnit();
		}
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// draw selected backround
		let x1, y1;
		if (this.selectedUnit === this.attacker[0]) {
			x1 = 200;
			y1 = 100;
		}
		if (this.selectedUnit === this.attacker[1]) {
			x1 = 0;
			y1 = 400;
		}
		if (this.selectedUnit === this.attacker[2]) {
			x1 = 400;
			y1 = 400;
		}
		if (this.selectedUnit === this.defender[0]) {
			x1 = 1500;
			y1 = 100;
		}
		if (this.selectedUnit === this.defender[1]) {
			x1 = 1300;
			y1 = 400;
		}
		if (this.selectedUnit === this.defender[2]) {
			x1 = 1700;
			y1 = 400;
		}
		this.ctx.save();
		this.ctx.fillStyle = 'green';
		this.ctx.fillRect(x1, y1, 175, 275);
		this.ctx.restore();


		// draw active Unit background
		let xAct1, yAct1;
		if (this.activeUnit === this.attacker[0]) {
			xAct1 = 200;
			yAct1 = 100;
		}
		if (this.activeUnit === this.attacker[1]) {
			xAct1 = 0;
			yAct1 = 400;
		}
		if (this.activeUnit === this.attacker[2]) {
			xAct1 = 400;
			yAct1 = 400;
		}
		if (this.activeUnit === this.defender[0]) {
			xAct1 = 1500;
			yAct1 = 100;
		}
		if (this.activeUnit === this.defender[1]) {
			xAct1 = 1300;
			yAct1 = 400;
		}
		if (this.activeUnit === this.defender[2]) {
			xAct1 = 1700;
			yAct1 = 400;
		}
		this.ctx.save();
		this.ctx.fillStyle = 'yellow';
		this.ctx.fillRect(xAct1 + 10, yAct1 + 5, 155, 265);
		this.ctx.restore();


		this.drawUnit(this.attacker[0], 200, 100);
		this.drawUnit(this.attacker[1], 0, 400);
		this.drawUnit(this.attacker[2], 400, 400);

		this.drawUnit(this.defender[0], 1500, 100);
		this.drawUnit(this.defender[1], 1300, 400);
		this.drawUnit(this.defender[2], 1700, 400);

		this.drawUnitHPBar(this.selectedUnit, this.selectedUnit);
	}

	drawUnit(unit, posX = 0, posY = 0) {
		const head = new Image();
		const body = new Image();
		const hands = new Image();
		const legs = new Image();
		head.src = unit.sprites.head.path;
		hands.src = unit.sprites.hands.path;
		legs.src = unit.sprites.legs.path;
		body.src = unit.sprites.body.path;

		this.ctx.drawImage(legs, unit.sprites.legs.sX, unit.sprites.legs.sY, unit.sprites.legs.width, unit.sprites.legs.height, unit.sprites.legs.dX + posX, unit.sprites.legs.dY + posY, unit.sprites.legs.width, unit.sprites.legs.height);
		this.ctx.drawImage(body, unit.sprites.body.sX, unit.sprites.body.sY, unit.sprites.body.width, unit.sprites.body.height, unit.sprites.body.dX + posX, unit.sprites.body.dY + posY, unit.sprites.body.width, unit.sprites.body.height);
		this.ctx.drawImage(head, unit.sprites.head.sX, unit.sprites.head.sY, unit.sprites.head.width, unit.sprites.head.height, unit.sprites.head.dX + posX, unit.sprites.head.dY + posY, unit.sprites.head.width, unit.sprites.head.height);
		this.ctx.drawImage(hands, unit.sprites.hands.sX, unit.sprites.hands.sY, unit.sprites.hands.width, unit.sprites.hands.height, unit.sprites.hands.dX + posX, unit.sprites.hands.dY + posY, unit.sprites.hands.width, unit.sprites.hands.height);
	}

	drawUnitHPBar(activeUnit, selectedUnit) {
		this.ctx.save();

		this.ctx.fillStyle = 'red';
		this.ctx.fillRect(40, 10, 575, 50);
		this.ctx.fillRect(this.canvas.width - 40 - 575, 10, 575, 50);

		this.ctx.font = '30px Arial';
		this.ctx.fillStyle = 'black';
		this.ctx.fillText('Unit HP ' + activeUnit.hp, 50, 50);
		this.ctx.fillText('Unit HP' + selectedUnit.hp, this.canvas.width - 30 - 575, 50);

		this.ctx.restore();
	}

	isGroupAlive(groupOfUnits) {
		return groupOfUnits.some(unit => unit.hp > 0);
	}

	isUnitAlive(unit) {
		return unit.hp > 0;
	}

	impact(atackerUnit, target) {
		target.hp = target.hp - 10;
	}

	nextTarget() {
		this.selectedUnitIndex++;
		if (this.selectedUnitIndex > this.attacker.length * 2 - 1) {
			this.selectedUnitIndex = 0;
		}
		if (this.selectedUnitIndex < this.attacker.length) {
			return this.attacker[this.selectedUnitIndex];
		}
		else {
			return this.defender[this.selectedUnitIndex - 3];
		}
	}

	nextActiveUnit() {
		this.activeUnitIndex++;
		if (this.activeUnitIndex > this.attacker.length * 2 - 1) {
			this.round++;
			console.log('start new round');
			this.activeUnitIndex = 0;
		}
		if (this.activeUnitIndex < this.attacker.length) {
			return this.attacker[this.activeUnitIndex];
		}
		else {
			return this.defender[this.activeUnitIndex - 3];
		}
	}

	prevTarget() {
		this.selectedUnitIndex--;
		if (this.selectedUnitIndex < 0) {
			this.selectedUnitIndex = this.attacker.length * 2 - 1;
		}
		if (this.selectedUnitIndex < this.attacker.length) {
			return this.attacker[this.selectedUnitIndex];
		}
		else {
			return this.defender[this.selectedUnitIndex - 3];
		}
	}


}