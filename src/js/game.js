import GameInterface from './modules/gameInterface/gameInterface';
import Utils from './modules/utils/utils';

Utils.setLastUserDataFromStorageToInput('input_nickname_id', 'lastLoginUserData', 'nickname');
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => {
	gameInterface.pressStartNewGameButton();
}, false);
