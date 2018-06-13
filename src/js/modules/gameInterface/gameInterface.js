import GameManager from '../gameManager/gameManager';
import KeyboardController from '../KeyboardController/KeyboardController';
import Utils from '../utils/utils';
import SelectionWheel from '../SelectionWheel/SelectionWheel';

export default class GameInterface {
	constructor() {
		this.initialization();
	}

	pressStartNewGameButton() {
		const userData = Utils.getUserDataFromInput('input_nickname_id', 'nickname');
		Utils.saveDataObjToStorage(userData, 'lastLoginUserData');
		this.gameManager = new GameManager(userData);
		this.gameManager.startGameCycle();
	}

	async initialization() {
		await this.createMenu();
		this.initKeyboardControlInput();
	}

	async createMenu() {
		const infoOutputScheme = { info: '' };
		const menuObj = {
			startNewGame: { nameButton: 'startNewGame', info: 'Press button to start game' },
			musicOn_Off: { nameButton: 'musicOn_Off', info: 'Press for on or off music' },
			increaseVol: { nameButton: 'increaseVol', info: 'Press for increase volume' },
			decreaseVol: { nameButton: 'decreaseVol', info: 'Press for decrease volume' }
		};
		const backgroundImageWheel = 'src/img/selectionWheel/planetExpress.png';
		const resultSelect = await new SelectionWheel(menuObj, document.getElementById('game-container'), infoOutputScheme, document.body, backgroundImageWheel, 'gameMenuSW');
		if (resultSelect == undefined) {
			location.href = '/index.html';
		} else {
			switch (JSON.parse(resultSelect).nameButton) {
			case 'startNewGame':
				this.pressStartNewGameButton();
				break;
			case 'musicOn_Off':
				this.createMenu();
				console.log('musicOn_Off');
				break;
			case 'increaseVol':
				this.createMenu();
				console.log('increaseVol');
				break;
			case 'decreaseVol':
				this.createMenu();
				console.log('decreaseVol');
				break;
			}
		}

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
				//that.showGameMenu();
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