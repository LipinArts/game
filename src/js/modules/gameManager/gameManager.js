import Fight from '../fight/fight';

export default class GameManager {
	constructor() {
		this.monsterGroupsCounter = 0;
	}

	startGameCycle() {
		let diffucult = 1;
		let player = this.generateGroupOfUnits('player', diffucult);
		console.log(player);
		while (this.isGroupAlive(player)) {
			diffucult = diffucult * 1.5;
			let monster = this.generateGroupOfUnits('monster' + this.monsterGroupsCounter, diffucult);
			this.monsterGroupsCounter++;
			console.log(monster);
			let survivingUnits = new Fight(player, monster);
			player = survivingUnits.attacker;

			// for tests
			if (this.monsterGroupsCounter > 5) {
				player.fill(
					{
						'unit': 'dead unit',
						'hp': 0
					});
				console.log('all player units are dead');
			}

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
			unitGroup.push(
				{
					'unit': 'unit number ' + i,
					'hp': diffucult * 10
				});
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
