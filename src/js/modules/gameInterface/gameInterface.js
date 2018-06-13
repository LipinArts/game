import GameManager from '../gameManager/gameManager';
import KeyboardController from '../KeyboardController/KeyboardController';
import Utils from '../utils/utils';
import SelectionWheel from '../SelectionWheel/SelectionWheel';

export default class GameInterface {
	constructor() {
		this.userData = 'undef';
		this.keyboardEnabled = true;
		this.initialization();
	}

	pressStartNewGameButton() {
		Utils.saveDataObjToStorage(this.userData, 'lastLoginUserData');
		new GameManager(this.userData);
	}

	async loginUser() {
		this.userData = await this.login(document.getElementById('game-container'));
	}

	login(parent) {
		return new Promise(resolve => {
			const container = document.createElement('div');
			container.className = 'login-container';

			const input = document.createElement('input');
			input.type = 'text';
			input.className = 'login-input-name';
			input.id = 'input_nickname_id';
			input.placeholder = 'your nickname *';
			input.maxLength = 15;

			const lastLoginUserData = Utils.getLastUserDataFromStorage('lastLoginUserData', 'nickname');
			if (lastLoginUserData) {
				input.value = lastLoginUserData;
			}
			container.appendChild(input);

			const submitButton = document.createElement('button');
			submitButton.id = 'login_submit_id';
			submitButton.type = 'submit';
			submitButton.onclick = function () {
				const value = input.value;
				container.remove();
				resolve({ nickname: value });
			};
			submitButton.textContent = 'Submit';
			container.appendChild(submitButton);

			parent.appendChild(container);
		});
	}


	async initialization() {
		await this.loginUser();
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
		const backgroundImageWheel = 'src/img/selectionWheel/gameMenu.png';
		const resultSelect = await new SelectionWheel(menuObj, document.getElementById('game-container'), infoOutputScheme, document.body, backgroundImageWheel, 'gameMenuSW');
		if (!resultSelect) {
			this.keyboardEnabled = true;
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
		let keyMap = KeyboardController.keyMap;
		const that = this;

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
				if (!document.getElementById('gameMenuSW')) {
					that.createMenu();
					that.keyboardEnabled = false;
				} else {
					that.keyboardEnabled = true;
				}
				break;
			case 'nextTarget':
				if (that.keyboardEnabled) {
					KeyboardController.pressedKeys.nextTarget = true;
				}

				break;
			case 'prevTarget':
				if (that.keyboardEnabled) {
					KeyboardController.pressedKeys.prevTarget = true;
				}
				break;
			case 'impact':
				if (that.keyboardEnabled) {
					KeyboardController.pressedKeys.impact = true;
				}
				break;
			}
		}

		window.addEventListener('keydown', keydownHandler, false);
		window.addEventListener('keyup', keyupHandler, false);
	}

}