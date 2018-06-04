export default class GameManager {
	constructor() {
		console.log('GameManager: created new GameManager');
	}

	startGame() {
		console.log('GameManager: startGame()');
	}

	keydown(action) {
		console.log('GameManager: player keydown key ' + action);
	}

	keyup(action) {
		console.log('GameManager: player keyup key ' + action);
	}

}

