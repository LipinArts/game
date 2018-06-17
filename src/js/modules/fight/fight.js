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
		this.selectedUnit = this.defender[0];
		this.activeUnit = this.attacker[0];
		this.selectedUnitIndex = 3;
		this.activeUnitIndex = 0;
		this.unitWidth = this.attacker[0].unitSize.width;
		this.unitHeight = this.attacker[0].unitSize.height;
		this.unitsAttackerCoordinates = fightConfig.attacker;
		this.unitsDefenderCoordinates = fightConfig.defender;
		this.canvas = fightConfig.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.frameLoopRunning = false;
		this.lastTurnEndtTime = new Date().getTime();
		this.delayBetweenTurns = 0;

		this.animatedCastUnit;
		this.targetUnitCoord;
		this.casterUnitCoord;

		this.resolvePromiseFunc;
		return new Promise(resolve => {
			this.resolvePromiseFunc = resolve;
			this.fightModulCycle();
		});
	}

	fightModulCycle() {
		this.showLoadingScreen();
		this.showCanvasAfterLoading();
		this.hideLoadingScreen();
		this.setBackground();
		this.startGameLoop();
	}

	showLoadingScreen() {
		//console.log('show loading screen');
	}

	showCanvasAfterLoading() {
		this.canvas.classList.remove('hide');
	}

	hideLoadingScreen() {
		//console.log('hide loading screen');
	}

	setBackground() {
		const gameBgContainer = document.querySelector('.game-bg-image');
		const bg = this.generateBackground();
		gameBgContainer.style.backgroundImage = `url("${bg}")`;
	}

	generateBackground() {
		const background = fightConfig.background_images[_.random(0, fightConfig.background_images.length - 1)];
		return background;
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
		if (this.frameLoopRunning && this.round < 100) {
			if (this.isFightNotOver()) {
				this.updateSelecting();
				this.updateTurn();
			}
			else {
				this.frameLoopRunning = false;
				this.finishFight();
			}
		}
	}

	pauseFight() {
		this.frameLoopRunning = false;
	}

	unpauseFight() {
		this.frameLoopRunning = true;
		this.startGameLoop();
	}

	finishFight() {
		this.resolvePromiseFunc({
			'attacker': this.attacker,
			'defender': this.defender
		});
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
		if (this.isTurnPossibleAfterDelayBetweenTurns()) {
			if (this.activeUnit.type === 'monster') {
				this.pauseFight();
				let botTurn = await this.activeUnit.generateAITurn(this.attacker, this.defender);

				if (botTurn.selectedUnit.type === 'monster') {
					this.heal(this.activeUnit, botTurn.selectedUnit, botTurn.selectedImpact);
				} else {
					this.attack(this.activeUnit, botTurn.selectedUnit, botTurn.selectedImpact);
				}

				this.delayBetweenTurns = botTurn.selectedImpact.animationTime;
				this.lastTurnEndtTime = new Date().getTime();
				this.nextActiveUnitSafe();
				this.unpauseFight();
				this.resetKeyboardControl();
			} else {

				if (KeyboardController.pressedKeys.impact) {
					this.pauseFight();
					const infoOutputScheme = { damage: 'Damage/heal', status: 'Add status', target: 'Target', duration: 'Duration', lvl: 'Difficulty' };
					let selectedImpactPromise = await new SelectionWheel(this.activeUnit.abilities, this.canvas, infoOutputScheme, document.body, 'src/img/selectionWheel/wheel.png', 'impactsSW');

					// if player select impact
					if (selectedImpactPromise) {
						let selectedImpact = selectedImpactPromise;
						let resultUserTask = await new UserTask(selectedImpact.lvl);

						// if player gave the right answer
						if (resultUserTask) {
							if (this.selectedUnit.type === 'player') {
								// if player heal ally
								if (selectedImpact.damage < 0) {
									this.heal(this.activeUnit, this.selectedUnit, selectedImpact);
								}
								// if player do damage ally
								else {
									this.attack(this.activeUnit, this.selectedUnit, selectedImpact);
								}
							} else {
								this.attack(this.activeUnit, this.selectedUnit, selectedImpact);
							}
							this.delayBetweenTurns = selectedImpact.animationTime;
						}
						else {
							this.failure(this.activeUnit);
						}

						this.nextActiveUnitSafe();
					}
					// if player press back button
					else {
						this.delayBetweenTurns = 0;
					}

					this.lastTurnEndtTime = new Date().getTime();
					this.unpauseFight();
					this.resetKeyboardControl();
				}

			}
		}
		else {
			// if player try do damane in while delay between turns is not left
			if (KeyboardController.pressedKeys.impact) {
				this.activeUnit.sounds.notYet.play();
				this.resetKeyboardControl();
			}

		}
	}

	isTurnPossibleAfterDelayBetweenTurns() {
		const currentTime = new Date().getTime();
		return currentTime - this.lastTurnEndtTime >= this.delayBetweenTurns;
	}

	resetKeyboardControl() {
		KeyboardController.pressedKeys.impact = false;
		KeyboardController.pressedKeys.nextTarget = false;
		KeyboardController.pressedKeys.prevTarget = false;
	}

	attack(attacker, target, impact) {
		attacker.sounds.attack.play();
		target.animation.attack.start();
		this.impact(target, impact);
		if (this.isUnitAlive(target)) {
			target.sounds.pain.play();
			target.animation.pain.start();
		} else {
			this.kill(target);
		}
	}

	heal(attacker, target, impact) {
		//attacker.sounds.help.play();
		//target.animation.help.start();
		this.impact(target, impact);
	}

	failure(unit) {
		unit.sounds.failure.play();
	}

	kill(unit) {
		unit.sounds.death.play();
		unit.animation.death.start();
	}

	impact(target, impact) {
		this.animatedCastUnit = impact;
		this.targetUnitCoord = this.getUnitObjCoordinates(target);
		this.casterUnitCoord = this.getUnitObjCoordinates(this.activeUnit);
		impact.position.x = this.casterUnitCoord.x;
		impact.position.y = this.casterUnitCoord.y;
		impact.animation.start(this.targetUnitCoord);

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

	nextActiveUnitSafe() {
		this.activeUnit = this.nextActiveUnit();
		let counter = 0;
		while (!this.isUnitAlive(this.activeUnit) && counter < this.attacker.length + this.defender.length) {
			counter++;
			this.activeUnit = this.nextActiveUnit();
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

	isFightNotOver() {
		return this.isGroupAlive(this.attacker) && this.isGroupAlive(this.defender);
	}

	isGroupAlive(groupOfUnits) {
		return groupOfUnits.some(unit => unit.hp > 0);
	}

	isUnitAlive(unit) {
		return unit.hp > 0;
	}

	// render methods

	render() {
		this.clearCanvas();
		this.drawAttackerUnits();
		this.drawDefenderUnits();
		this.drawActiveUnitFlag(this.activeUnit);
		this.drawSelectedUnitFlag(this.selectedUnit);
		this.drawUnitInfo(this.selectedUnit);
		if (this.selectedUnit !== this.activeUnit) {
			this.drawUnitInfo(this.activeUnit);
		}
		if (this.animatedCastUnit && this.animatedCastUnit.sprite) {
			this.drawCast(this.animatedCastUnit, this.casterUnitCoord, this.targetUnitCoord);
		}
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawCast(castObj) {
		this.ctx.save();
		let posX = castObj.position.x;
		let posY = castObj.position.y;

		this.ctx.translate(posX, posY);

		this.ctx.rotate((Math.PI / 180) * castObj.sprite.rotation);

		const width = castObj.sprite.width;
		const height = castObj.sprite.height;

		this.ctx.drawImage(castObj.sprite.image, castObj.sprite.sX, castObj.sprite.sY, width, height, -width / 2, - height / 2, width, height);

		this.ctx.restore();
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

	drawSelectedUnitFlag(unit) {
		let coord = this.getUnitObjCoordinates(unit);
		let x = coord.x;
		let y = coord.y + this.unitHeight - 180;

		this.ctx.save();
		this.ctx.translate(x, y);
		this.ctx.rotate((Math.PI / 180) * 90);
		this.ctx.lineWidth = 1;
		this.ctx.fillStyle = 'red';
		this.ctx.beginPath();
		this.ctx.moveTo(-20, -20);
		this.ctx.lineTo(0, -10);
		this.ctx.lineTo(0, -20);
		this.ctx.lineTo(20, 0);
		this.ctx.lineTo(0, 20);
		this.ctx.lineTo(0, 10);
		this.ctx.lineTo(-20, 20);
		this.ctx.lineTo(-20, -10);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.restore();
	}

	drawActiveUnitFlag(unit) {
		let coord = this.getUnitObjCoordinates(unit);
		let x = coord.x - 40;
		let y = coord.y + this.unitHeight - 180;

		this.ctx.save();
		this.ctx.translate(x, y);
		this.ctx.rotate(0);
		this.ctx.lineWidth = 1;
		this.ctx.fillStyle = 'limegreen';
		this.ctx.beginPath();
		this.ctx.moveTo(-20, -20);
		this.ctx.lineTo(0, -10);
		this.ctx.lineTo(0, -20);
		this.ctx.lineTo(20, 0);
		this.ctx.lineTo(0, 20);
		this.ctx.lineTo(0, 10);
		this.ctx.lineTo(-20, 20);
		this.ctx.lineTo(-20, -10);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.restore();
	}

	drawUnitInfo(unit) {
		const coordSelected = this.getUnitObjCoordinates(unit);
		const xSelected = coordSelected.x - this.unitWidth / 2;
		const ySelected = coordSelected.y - this.unitHeight / 2;
		this.ctx.save();
		this.ctx.fillStyle = 'white';
		this.ctx.font = '15px Arial';
		this.ctx.fillText(unit.name, xSelected, ySelected - 10);
		this.ctx.font = '25px Arial';
		this.ctx.fillText('HP ' + unit.hp, xSelected, ySelected - 30);
		this.ctx.restore();
	}

}