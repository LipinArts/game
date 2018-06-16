import KeyboardController from '../KeyboardController/KeyboardController';
import SelectionWheel from '../SelectionWheel/SelectionWheel';
import UserTask from '../userTask/userTask';
import fightConfig from '../../fightConfig';
import _ from 'lodash';
import Utils from '../utils/utils';

export default class Fight {
	constructor(attacker, defender) {
		this.attacker = attacker;
		this.defender = defender;
		this.round = 0;
		this.enableSelectingFlag = false;
		this.selectedUnit = this.attacker[0];
		this.activeUnit = this.attacker[0];
		this.selectedUnitIndex = 0;
		this.activeUnitIndex = 0;
		this.unitWidth = this.attacker[0].unitSize.width;
		this.unitHeight = this.attacker[0].unitSize.height;
		this.unitsAttackerCoordinates = [{ x: 200 + this.unitWidth / 2, y: 50 + this.unitHeight / 2 }, { x: 0 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }, { x: 400 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }];
		this.unitsDefenderCoordinates = [{ x: 900 + this.unitWidth / 2, y: 50 + this.unitHeight / 2 }, { x: 700 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }, { x: 1100 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }];
		this.unitsAttackerCoordinates = [{ x: 200 + this.unitWidth / 2, y: 50 + this.unitHeight / 2 }, { x: 0 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }, { x: 400 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }];
		this.unitsDefenderCoordinates = [{ x: 900 + this.unitWidth / 2, y: 50 + this.unitHeight / 2 }, { x: 700 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }, { x: 1100 + this.unitWidth / 2, y: 360 + this.unitHeight / 2 }];
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.frameLoopRunning = false;
		this.resolvePromiseFunc;
		this.once = true;

		this.lastTurnEndtTime = new Date().getTime();
		this.timeForAnimation = 0;

		return new Promise(resolve => {
			this.resolvePromiseFunc = resolve;
			this.fightModulCycle();
		});
	}

	fightModulCycle() {
		this.showLoadingScreen();
		this.showCanvasAfterLoading();
		this.hideLoadingScreen();
		this.startGameLoop();
		this.setBackground();
	}

	showCanvasAfterLoading() {
		this.canvas.classList.remove('hide');
	}

	showLoadingScreen() {
		//console.log('show loading screen');
	}

	hideLoadingScreen() {
		//console.log('hide loading screen');
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
		if (this.frameLoopRunning) {
			if (this.isFightNotOver()) {
				this.updateSelecting();
				this.updateTurn();
			}
			else {
				this.frameLoopRunning = false;
				const that = this;
				this.resolvePromiseFunc({
					'attacker': that.attacker,
					'defender': that.defender
				});
			}
		}
	}

	updateSelecting() {
		if (KeyboardController.pressedKeys.nextTarget) {
			KeyboardController.pressedKeys.nextTarget = false;
			this.selectedUnit = this.nextTarget();
		} else {
			if (KeyboardController.pressedKeys.prevTarget) {
				this.selectedUnit = this.prevTarget();
				KeyboardController.pressedKeys.prevTarget = false;
			}
		}

	}

	async updateTurn() {
		const currentTime = new Date().getTime();
		if (currentTime - this.lastTurnEndtTime >= this.timeForAnimation) {
			if (this.activeUnit.type === 'monster') {
				this.pauseGame();
				let botTurn = await this.activeUnit.generateAITurn(this.attacker, this.defender);
				this.activeUnit.sounds.attack.play();
				this.activeUnit.animation.attack.start();
				this.impact(botTurn.selectedUnit, botTurn.selectedImpact);
				console.log(botTurn.selectedImpact);
				if (!this.isUnitAlive(botTurn.selectedUnit)) {
					this.killUnit(botTurn.selectedUnit);
				} else {
					botTurn.selectedUnit.sounds.pain.play();
					botTurn.selectedUnit.animation.pain.start();
				}
				this.timeForAnimation = botTurn.selectedImpact.animationTime;
				this.lastTurnEndtTime = new Date().getTime();

				this.nextActiveUnitSafe();
				this.unpauseGame();
				this.resetKeyboardControl();
			} else {
				if (KeyboardController.pressedKeys.impact) {
					this.pauseGame();
					const infoOutputScheme = { damage: 'Damage/heal', status: 'Add status', target: 'Target', duration: 'Duration', lvl: 'Difficulty' };
					const backgroundImageWheel = 'src/img/selectionWheel/wheel.png';
					let selectedImpactString = await new SelectionWheel(this.activeUnit.abilities, this.canvas, infoOutputScheme, document.body, backgroundImageWheel, 'impactsSW');
					let selectedImpact;
					if (selectedImpactString) {
						selectedImpact = JSON.parse(selectedImpactString);
						let resultUserTask = await new UserTask(selectedImpact.lvl);
						if (resultUserTask) {
							this.activeUnit.sounds.attack.play();
							this.activeUnit.animation.attack.start();
							console.log(selectedImpact);
							this.impact(this.selectedUnit, selectedImpact);
							if (!this.isUnitAlive(this.selectedUnit)) {
								this.killUnit(this.selectedUnit);
							} else {
								this.selectedUnit.animation.pain.start();
								this.selectedUnit.sounds.pain.play();
							}
						}
						else {
							this.activeUnit.sounds.failure.play();
						}
						this.nextActiveUnitSafe();
					}
					if (selectedImpact) {
						this.timeForAnimation = selectedImpact.animationTime;
					} else {
						this.timeForAnimation = 0;
					}
					this.lastTurnEndtTime = new Date().getTime();
					this.unpauseGame();
					this.resetKeyboardControl();
				}
			}
		}
		else {
			if (KeyboardController.pressedKeys.impact) {
				this.activeUnit.sounds.notYet.play();
				this.resetKeyboardControl();
			}

		}


	}

	nextActiveUnitSafe() {
		this.activeUnit = this.nextActiveUnit();
		let counter = 0;
		while (!this.isUnitAlive(this.activeUnit) && counter < this.attacker.length + this.defender.length) {
			counter++;
			this.activeUnit = this.nextActiveUnit();
		}
	}

	resetKeyboardControl() {
		KeyboardController.pressedKeys.impact = false;
		KeyboardController.pressedKeys.nextTarget = false;
		KeyboardController.pressedKeys.prevTarget = false;
	}

	pauseGame() {
		this.frameLoopRunning = false;
	}

	unpauseGame() {
		this.frameLoopRunning = true;
		this.startGameLoop();
	}

	render() {
		this.clearCanvas();
		this.drawSelectedUnitFlag();
		this.drawActiveUnitFlag();
		this.drawAttackerUnits();
		this.drawDefenderUnits();
		this.drawSelectAndActiveUnitsInfoBars(this.activeUnit, this.selectedUnit);
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	generateBackground() {
		const background = fightConfig.background_images[_.random(0, fightConfig.background_images.length - 1)];
		return background;
	}

	setBackground() {
		const gameBgContainer = document.querySelector('.game-bg-image');
		const bg = this.generateBackground();
		gameBgContainer.style.backgroundImage = `url("${bg}")`;
	}

	drawUnit(unit, posX, posY) {
		this.drawUnitPart(unit.sprites.legs, posX, posY);
		this.drawUnitPart(unit.sprites.body, posX, posY);
		this.drawUnitPart(unit.sprites.head, posX, posY);
		this.drawUnitPart(unit.sprites.hands, posX, posY);
	}

	drawUnitPart(part, posX, posY) {
		this.ctx.save();
		this.ctx.translate(posX, posY);
		this.ctx.rotate((Math.PI / 180) * part.rotation);

		let normalizeCoord = Utils.rotate(0, 0, part.dX, part.dY, part.rotation);
		let x_norm = normalizeCoord[0];
		let y_norm = normalizeCoord[1];

		this.ctx.drawImage(part.image, part.sX, part.sY, part.width, part.height, x_norm - part.width / 2, y_norm - part.height / 2, part.width, part.height);
		this.ctx.restore();
	}

	drawSelectedUnitFlag() {
		let coord = this.getUnitObjCoordinates(this.selectedUnit);
		let x = coord.x - this.unitWidth / 2;
		let y = coord.y - this.unitHeight / 2;

		this.ctx.save();
		this.ctx.fillStyle = 'green';
		this.ctx.fillRect(x, y, 175, 275);
		this.ctx.restore();
	}

	drawActiveUnitFlag() {
		const coord = this.getUnitObjCoordinates(this.activeUnit);
		let x = coord.x - this.unitWidth / 2;
		let y = coord.y - this.unitHeight / 2;

		this.ctx.save();
		this.ctx.fillStyle = 'yellow';
		this.ctx.fillRect(x + 10, y + 5, 155, 265);
		this.ctx.restore();
	}

	getUnitObjCoordinates(unitObj) {
		let x;
		let y;
		if (this.attacker.indexOf(unitObj) !== -1) {
			let index = this.attacker.indexOf(unitObj);
			x = this.unitsAttackerCoordinates[index].x;
			y = this.unitsAttackerCoordinates[index].y;
		} else {
			let index = this.defender.indexOf(unitObj);
			x = this.unitsDefenderCoordinates[index].x;
			y = this.unitsDefenderCoordinates[index].y;
		}
		return {
			x: x,
			y: y
		};
	}

	drawAttackerUnits() {
		this.attacker.forEach((unit, index) => {
			this.drawUnit(this.attacker[index], this.unitsAttackerCoordinates[index].x, this.unitsAttackerCoordinates[index].y);
		});
	}

	drawDefenderUnits() {
		this.defender.forEach((unit, index) => {
			this.drawUnit(this.defender[index], this.unitsDefenderCoordinates[index].x, this.unitsDefenderCoordinates[index].y);
		});
	}

	drawSelectAndActiveUnitsInfoBars(activeUnit, selectedUnit) {
		const coordActive = this.getUnitObjCoordinates(activeUnit);
		const xActive = coordActive.x - this.unitWidth / 2;
		const yActive = coordActive.y - this.unitHeight / 2;

		const coordSelected = this.getUnitObjCoordinates(selectedUnit);
		const xSelected = coordSelected.x - this.unitWidth / 2;
		const ySelected = coordSelected.y - this.unitHeight / 2;

		this.ctx.save();
		//const widthBar = 200;
		const heightBar = 50;

		// this.ctx.fillStyle = 'white';
		// this.ctx.fillRect(xActive, yActive - heightBar, widthBar, heightBar);
		// if (activeUnit !== selectedUnit) {
		// 	this.ctx.fillRect(xSelected, ySelected - heightBar, widthBar, heightBar);
		// }

		this.ctx.fillStyle = 'white';
		this.ctx.font = '15px Arial';
		this.ctx.fillText(activeUnit.name, xActive, yActive - heightBar + 20);
		this.ctx.font = '25px Arial';
		this.ctx.fillText('HP ' + activeUnit.hp, xActive, yActive - heightBar + 40);
		if (activeUnit !== selectedUnit) {
			this.ctx.font = '15px Arial';
			this.ctx.fillText(selectedUnit.name, xSelected, ySelected - heightBar + 20);
			this.ctx.font = '25px Arial';
			this.ctx.fillText('HP ' + selectedUnit.hp, xSelected, ySelected - heightBar + 40);
		}

		this.ctx.restore();
	}

	isFightNotOver() {
		return this.isGroupAlive(this.attacker) && this.isGroupAlive(this.defender);
	}

	isGroupAlive(groupOfUnits) {
		return groupOfUnits.some(unit => unit.hp > 0);
	}

	isUnitAlive(unit) {
		return unit.hp > 0;
	}

	killUnit(unit) {
		unit.sounds.death.play();
		unit.animation.death.start();
	}

	impact(target, impact) {
		if (this.isUnitAlive(target)) {
			target.hp = target.hp - impact.damage;
			if (target.hp > target.maxHP) {
				target.hp = target.maxHP;
			}
		} else {
			// disable ressurect dead unit by healing player can heal dead only to 0 HP
			target.hp = target.hp - impact.damage;
			if (target.hp > 0) {
				target.hp = 0;
			}
		}
	}

	nextTarget() {
		this.selectedUnitIndex++;
		if (this.selectedUnitIndex > this.attacker.length * 2 - 1) {
			this.selectedUnitIndex = 0;
		}
		if (this.selectedUnitIndex < this.attacker.length) {
			return this.attacker[this.selectedUnitIndex];
		} else {
			return this.defender[this.selectedUnitIndex - 3];
		}
	}

	prevTarget() {
		this.selectedUnitIndex--;
		if (this.selectedUnitIndex < 0) {
			this.selectedUnitIndex = this.attacker.length * 2 - 1;
		}
		if (this.selectedUnitIndex < this.attacker.length) {
			return this.attacker[this.selectedUnitIndex];
		} else {
			return this.defender[this.selectedUnitIndex - 3];
		}
	}

	nextActiveUnit() {
		this.activeUnitIndex++;
		if (this.activeUnitIndex > this.attacker.length * 2 - 1) {
			this.round++;
			this.activeUnitIndex = 0;
		}
		if (this.activeUnitIndex < this.attacker.length) {
			return this.attacker[this.activeUnitIndex];
		} else {
			return this.defender[this.activeUnitIndex - 3];
		}
	}

}
