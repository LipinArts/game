import GameInterface from './modules/gameInterface/gameInterface';
<<<<<<< HEAD
import UserTask from './modules/userTask/userTask';

const x = new UserTask();
console.log(x);
=======
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => {
	gameInterface.pressStartNewGameButton();
}, false);
>>>>>>> 14a93b73ee827d3f73b18f95083d6a35f6613d7d
