import Fight from '../fight/fight';
import FightUnit from '../fightUnit/fightUnit';

export default class GameManager {
	constructor() {
		this.monsterGroupsCounter = 0;
		this.fight;
	}

	startGameCycle() {
		this.lvlGenerator();
	}

	lvlGenerator() {
		const that = this;
		let generator = gen();
		function* gen() {
			let diffucult = 1;
			let player = that.generateGroupOfUnits('player', diffucult);
			function createLvll() {
				that.fight = null;
				let monster = that.generateGroupOfUnits('monster' + that.monsterGroupsCounter, diffucult);
				diffucult = diffucult * 1.5;
				that.monsterGroupsCounter++;
				that.fight = new Fight(player, monster, generator);
				player = that.fight.attacker;

				if (that.monsterGroupsCounter > 1000) {
					throw new Error('emergency exit from GameManager lvlCycle');
				}

			}
			while (that.isGroupAlive(player)) {
				yield createLvll();
			}
		}
		generator.next();
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
		console.log('Game Over');
		console.log('open modal score window');
	}

}
