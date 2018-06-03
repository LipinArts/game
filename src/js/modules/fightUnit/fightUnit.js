import _ from 'lodash';
import unit from '../../unitConfig';

export default class FightUnit {
	constructor(unit, name, difficulty) {
		this.unit = unit ? unit : 'monster';
		this.name = name;
		this.hp = '';
		this.damage = '';
		this.abilities = {};
		this.sprites = {};
		this.generate();
	}

	generate() {
		switch (unit) {
		case 'player':
			this.generatePlayerUnit();
			break;
		case 'monster':
			this.generateMonsterUnit();
			break;
		default:
			this.generateMonsterUnit();
			break;
		}
	}

	generateMonsterUnit() {
		this.generateMonsterName();

		// this.unitSprites.head = {
		// 	path: unit.monsters.heads_path, // путь к спрайту
		// 	width: unit.monsters.heads_width,
		// 	height: unit.monsters.heads_height,
		// 	bgPosX: unit.monsters.heads_bg_posX[_.random(0, unit.monsters.heads_bg_posX.length)], // рандомный выбор головы из спрайта по координатам X
		// 	bgPosY: unit.monsters.heads_bg_posY, // координаты головы спрайта по Y
		// };
		// this.unitSprites.body = {
		// 	path: unit.monsters.bodies_path,
		// 	width: unit.monsters.bodies_width,
		// 	height: unit.monsters.bodies_height,
		// 	bgPosX: unit.monsters.bodies_bg_posX[_.random(0, unit.monsters.bodies_bg_posX.length)],
		// 	bgPosY: unit.monsters.bodies_bg_posY,
		// };
		// this.unitSprites.hands = {
		// 	path: unit.monsters.hands_path,
		// 	width: unit.monsters.hands_width,
		// 	height: unit.monsters.hands_height,
		// 	bgPosX: unit.monsters.hands_bg_posX[_.random(0, unit.monsters.hands_bg_posX.length)],
		// 	bgPosY: unit.monsters.hands_bg_posY,
		// };
		// this.unitSprites.legs = {
		// 	path: unit.monsters.hands_path,
		// 	width: unit.monsters.hands_width,
		// 	height: unit.monsters.hands_height,
		// 	bgPosX: unit.monsters.hands_bg_posX[_.random(0, unit.monsters.hands_bg_posX.length)],
		// 	bgPosY: unit.monsters.hands_bg_posY,
		//	};

	}

	generatePlayerUnit() {
		this.generatePlayerName();
	}
	generateMonsterName() {
		const firstName = unit.monsters.adjectives[_.random(0, unit.monsters.adjectives.length)];
		const secondName = unit.monsters.names_1[_.random(0, unit.monsters.names_1.length)];
		const thirdName = unit.monsters.names_2[_.random(0, unit.monsters.names_2.length)];
		this.name = `${firstName} ${secondName} ${thirdName}`;
	}

	generatePlayerName() {
		const firstName = unit.players.adjectives[_.random(0, unit.players.adjectives.length)];
		let secondName;
		if (this.name) {
			secondName = this.name;
		} else {
			secondName = unit.players.names[_.random(0, unit.players.names.length)];
		}
		this.name = `${firstName} ${secondName}`;
	}

	// render() { // отрисовывает юнита
	// 	let head = document.createElement('div');
	// 	head.style.width = this.unitSprites.head.width + 'px';
	// 	head.style.height = this.unitSprites.head.height + 'px';
	// 	head.style.backgroundImage = `url(${this.unitSprites.head.path})`;
	// 	head.style.backgroundPositionX = this.unitSprites.head.bgPosX + 'px';
	// 	head.style.backgroundPositionY = this.unitSprites.head.bgPosY + 'px';
	// 	document.getElementById('unit').appendChild(head);
	// }
}
