export default class Fight {
	constructor(attacker, defender) {
		this.attacker = attacker;
		this.defender = defender;
		this.round = 0;
		this.enableSelectingFlag = false;

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
		this.startFightLoop();
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
		for (let i = 0, len = this.attacker.length; i < len; i++) {
			if (this.isUnitAlive(this.attacker[i])) {
				this.unitTurn(this.attacker[i]);
			}
			if (this.isUnitAlive(this.defender[i])) {
				this.unitTurn(this.defender[i]);
			}
		}
	}

	isGroupAlive(groupOfUnits) {
		return groupOfUnits.some(unit => unit.hp > 0);
	}

	isUnitAlive(unit) {
		return unit.hp > 0;
	}

	unitTurn(unit) {
		const target = this.selectUnitForImpact();
		this.impact(unit, target);
	}

	selectUnitForImpact() {
		this.enableSelectingFlag = true;
	}

	impact(atackerUnit, target) {

	}

	keyupActions(event) {
		if (!this.enableSelectingFlag) {
			return false;
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


}