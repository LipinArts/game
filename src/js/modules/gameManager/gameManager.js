import Fight from '../fight/fight';
import FightUnit from '../fightUnit/fightUnit';

export default class GameManager {
	constructor() {
		this.monsterGroupsCounter = 0;
	}

	startGameCycle() {
		let diffucult = 1;
		let player = this.generateGroupOfUnits('player', diffucult);
		while (this.isGroupAlive(player)) {
			let monster = this.generateGroupOfUnits('monster' + this.monsterGroupsCounter, diffucult);
			diffucult = diffucult * 1.5;
			this.monsterGroupsCounter++;
			let survivingUnits = new Fight(player, monster);
			player = survivingUnits.attacker;
		}
		const score = this.calcScore();
		this.showScore(score);
	}

	keydown(action) {
		console.log('GameManager: player keydown key ' + action);
	}

	keyup(action) {
		console.log('GameManager: player keyup key ' + action);
	}

	generateGroupOfUnits(typeGroup, diffucult) {
		const unitGroup = [];
		unitGroup.typeGroup = typeGroup;
		for (let i = 0; i < 3; i++) {
			unitGroup.push(new FightUnit(typeGroup, diffucult));
		}
		return unitGroup;
	}

	isGroupAlive(groupOfUnits) {
		return groupOfUnits.some(unit => unit.hp > 0);
	}

	calcScore() {
		return this.monsterGroupsCounter * 10;
	}

	showScore() {
		console.log('open modal score window');
	}

}
