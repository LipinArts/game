import Fight from '../fight/fight';

export default class GameManager {
	constructor() {
		this.monsterGroupsCounter = 0;
	}

	startGame() {
		let player = this.generateGroupOfUnits('player');
		console.log(player);
		while (this.isGroupAlive(player)) {
			let monster = this.generateGroupOfUnits('monster' + this.monsterGroupsCounter);
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
	}

	keydown(action) {
		console.log('GameManager: player keydown key ' + action);
	}

	keyup(action) {
		console.log('GameManager: player keyup key ' + action);
	}

	generateGroupOfUnits(typeGroup) {
		let unitGroup = [];
		unitGroup.typeGroup = typeGroup;
		for (let i = 0; i < 3; i++) {
			unitGroup.push(
				{
					'unit': 'unit number ' + i,
					'hp': 10
				});
		}
		return unitGroup;
	}

	isGroupAlive(player) {
		return player.some(unit => unit.hp > 0);
	}

}