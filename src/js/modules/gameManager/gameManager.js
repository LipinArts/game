export default class GameManager {
	constructor() {
		console.log('GameManager: created new GameManager');
	}

	startGame() {
		console.log('GameManager: startGame()');
	}

	keydown(key) {
		console.log('GameManager: player keydown key ' + key);
	}

	keyup(key) {
		console.log('GameManager: player keyup key ' + key);
	}

}

