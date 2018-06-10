import GameManager from '../gameManager/gameManager';
import KeyboardController from '../KeyboardController/KeyboardController';

export default class GameInterface {
	constructor() {
		this.initKeyboardControlInput();
	}

	pressStartNewGameButton() {
		this.hideGameMenu();
		this.gameManager = new GameManager();
		this.gameManager.startGameCycle();
	}

	showGameMenu() {
		document.getElementById('gameMenu_id').classList.remove('hide');
	}

	hideGameMenu() {
		document.getElementById('gameMenu_id').classList.add('hide');
	}

	initKeyboardControlInput() {
		const that = this;
		let keyMap = KeyboardController.keyMap;

		function keydownHandler(event) {
			switch (keyMap[event.keyCode]) {
			case 'decreaseVol':
				// Sound_Module.decreaseMusicVol(that.musicPlaylist, 0.05);
				break;
			case 'increaseVol':
				// Sound_Module.increaseMusicVol(that.musicPlaylist, 0.05);
				break;
			}
		}

		function keyupHandler(event) {
			switch (keyMap[event.keyCode]) {
			case 'music_Off_On':
				// Sound_Module.musicPause_Unpause(that.musicPlaylist);
				break;
			case 'showGameMenu':
				that.showGameMenu();
				break;
			case 'nextTarget':
				KeyboardController.pressedKeys.nextTarget = true;
				break;
			case 'prevTarget':
				KeyboardController.pressedKeys.prevTarget = true;
				break;
			case 'impact':
				KeyboardController.pressedKeys.impact = true;
				break;
			}
		}

		window.addEventListener('keydown', keydownHandler, false);
		window.addEventListener('keyup', keyupHandler, false);
	}

}