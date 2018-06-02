export default class GameManager {
	constructor() {
		console.log('GameManager: created new GameManager');
		this.monsterGroupsCounter = 0;
	}

	startGame() {
		console.log('GameManager: startGame()');
		let playerGroup = this.genericUnitGroup('player');
		console.log(playerGroup);
		while (this.isPlayerAlive()) {
			let monsterGroup = this.genericUnitGroup('monster' + this.monsterGroupsCounter);
			console.log(monsterGroup);
		}
	}

	keydown(action) {
		console.log('GameManager: player keydown key ' + action);
	}

	keyup(action) {
		console.log('GameManager: player keyup key ' + action);
	}

	genericUnitGroup(typeGroup) {
		let unitGroup = [];
		unitGroup.nameGroup = typeGroup;
		for (let i = 0; i < 3; i++) {
			unitGroup.push({ 'unit': 'unit number ' + i });
		}
		return unitGroup;
	}

	isPlayerAlive() {
		this.monsterGroupsCounter++;
		if (this.monsterGroupsCounter > 5) return false;
		return true;
	}

}