import GameManager from '../gameManager/gameManager';

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
        document.getElementById('gameMenu_id').classList.remove('hide');
    }

    hideGameMenu() {
        document.getElementById('gameMenu_id').classList.add('hide');
    }

    initKeyboardControlInput() {
        const that = this;
        let keyMap = {
            39: 'nextTarget',    // ->
            37: 'prevTarget',    // <-
            32: 'impact',        // space
            56: 'decreaseVol',   // 8
            57: 'increaseVol',   // 9
            48: 'music_Off_On',  // 0
            27: 'showGameMenu'   // esc
        };

        function keydownHandler(event) {
            switch (keyMap[event.keyCode]) {
                case 'decreaseVol':
                    // Sound_Module.decreaseMusicVol(that.musicPlaylist, 0.05);
                    break;
                case 'increaseVol':
                    // Sound_Module.increaseMusicVol(that.musicPlaylist, 0.05);
                    break;
                default:
                    if (that.gameManager && keyMap[event.keyCode]) {
                        that.gameManager.keydown(keyMap[event.keyCode]);
                    }
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
                default:
                    if (that.gameManager && keyMap[event.keyCode]) {
                        that.gameManager.keyup(keyMap[event.keyCode]);
                    }
                    break;
            }
        }

        window.addEventListener('keydown', keydownHandler, false);
        window.addEventListener('keyup', keyupHandler, false);
    }

}