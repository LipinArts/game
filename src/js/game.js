import GameInterface from './modules/gameInterface/gameInterface';
import LocalStorageManager from './modules/localStorageManager/localStorageManager';

LocalStorageManager.loadLastUserDataFromStorageToInputs();
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => {
	gameInterface.pressStartNewGameButton();
}, false);
