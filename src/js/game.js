import _ from 'lodash';

// import Fight from './modules/fight/fight';
// import FightUnit from './modules/fightUnit/fightUnit';
import GameInterface from './modules/gameInterface/gameInterface';
// import GameManager from './modules/gameManager/gameManager';
// import SelectionWheel from './modules/selectionWheel/selectionWheel';
// import UnitGenerator from './modules/unitGenerator/unitGenerator';
// import UserTask from './modules/userTask/userTask';
const gameInterface = new GameInterface();
document.getElementById('startButt_id').addEventListener('click', () => { gameInterface.pressStartNewGameButton(); }, false);

// Fight();
// FightUnit();
// GameInterface();
// GameManager();
// SelectionWheel();
// UnitGenerator();
// UserTask();
