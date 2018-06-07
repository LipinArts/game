import Fight from '../fight/fight';
import FightUnit from '../fightUnit/fightUnit';

export default class GameManager {
	constructor() {
		this.monsterGroupsCounter = 0;
		this.fight;
	}

	// startGameCycle_OLD() {
	// 	let diffucult = 1;
	// 	let player = this.generateGroupOfUnits('player', diffucult);

	// 	while (this.isGroupAlive(player)) {
	// 		let monster = this.generateGroupOfUnits('monster' + this.monsterGroupsCounter, diffucult);
	// 		diffucult = diffucult * 1.5;
	// 		this.monsterGroupsCounter++;
	// 		this.fight = new Fight(player, monster);
	// 		console.log(this.fight);
	// 		player = this.fight.attacker;

	// 		if (this.monsterGroupsCounter > 5) {
	// 			throw new Error('emergency exit from GameManager lvlCycle');
	// 		}
	// 	}
	// 	const score = this.calcScore();
	// 	this.showScore(score);
	// }

	startGameCycle() {
		// let generator = this.lvlGenerator();
		// generator.next().value;
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
				console.log('generator=  ', generator);
				that.fight = new Fight(player, monster, generator);
				console.log(that.fight);
				player = that.fight.attacker;

				if (that.monsterGroupsCounter > 5) {
					//throw new Error('emergency exit from GameManager lvlCycle');
					player = [{
						hp: 0
					}];
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
		return true;
		//return groupOfUnits.some(unit => unit.hp > 0);
	}

	calcScore() {
		return this.monsterGroupsCounter * 10;
	}

	showScore() {
		console.log('open modal score window');
	}

}
