import GameManager from './modules/gameManager/gameManager';

export default class GameInterface {
	constructor() {
		this.initKeyboardControlInput();
	}

	pressStartNewGameButton() {
		this.hideGameMenu();
		this.gameManager = new GameManager();
		this.gameManager.startGame();
	}

	showGameMenu() {
		document.getElementById('gameMenu_id').setAttribute('style', 'display:block'); // or document.getElementById('gameMenu_id').style.display=block;
	}

	hideGameMenu() {
		document.getElementById('gameMenu_id').setAttribute('style', 'display:none');  // or document.getElementById('gameMenu_id').style.display=none;
	}

	initKeyboardControlInput() {
		const that = this;
		let keyMap = {
			39: 'nextTarget',    // ->
			37: 'prevTarget',    // <-
			32: 'impact',        //space
			56: 'decreaseVol',   //8
			57: 'increaseVol',   //9
			48: 'music_Off_On',  // 0
			27: 'showGameMenu'   // esc
		};

		function keydown(event) {
			switch (keyMap[event.keyCode]) {
				case 'decreaseVol':
					//Sound_Module.decreaseMusicVol(that.musicPlaylist, 0.05);
					break;
				case 'increaseVol':
					//Sound_Module.increaseMusicVol(that.musicPlaylist, 0.05);
					break;
			}
			that.gameManager.keydown(keyMap[event.keyCode]);
		}

		function keyup(event) {
			switch (keyMap[event.keyCode]) {
				case 'musicOff_On':
					//Sound_Module.musicPause_Unpause(that.musicPlaylist);
					break;
				case 'showGameMenu':
					this.showGameMenu();
					break;
			}
			that.gameManager.keyup(keyMap[event.keyCode]);
		}

		window.addEventListener('keydown', keydown, false);
		window.addEventListener('keyup', keyup, false);
	}

}