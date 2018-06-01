import _ from 'lodash';
import unit from '../../unitConfig';
export default class FightUnit {
	constructor(unit, name, difficulty) {
		this.unit = unit ? unit : 'monster'; // str (флаг) - 'player' или 'monster'(если не указать - отрисовывает монстра)
		this.unitName = name; // str - имя юнита - если передать(при флаге unit = 'player') - то это будет имя игрока, если не передать - то сгеннерируется случайно; (при флаге unit = 'monster' - проигнорируется)(необязательный)
		this.unitHP;
		this.damage;
		this.unitAbilities = {};
		this.unitSprites = {};
		switch (unit) {
		case 'player':
			this.generatePlayerName();
			break;
		case 'monster':
			this.generateMonsterName();
			this.generateMonsterUnit();
			break;
		default:
			this.generateMonsterName();
			this.generateMonsterUnit();
			this.render();
			break;
		}
	}

	generateMonsterUnit() { // генерирует юнита монстра случайно скомбинированного из частей(спрайты)
		this.unitSprites.head = {
			path: unit.monsters.heads_path, // путь к спрайту
			width: unit.monsters.heads_width,
			height: unit.monsters.heads_height,
			bgPosX: unit.monsters.heads_bg_posX[_.random(0, unit.monsters.heads_bg_posX.length)], // рандомный выбор головы из спрайта по координатам X
			bgPosY: unit.monsters.heads_bg_posY, // координаты головы спрайта по Y
		};
		this.unitSprites.body = {
			path: unit.monsters.bodies_path,
			width: unit.monsters.bodies_width,
			height: unit.monsters.bodies_height,
			bgPosX: unit.monsters.bodies_bg_posX[_.random(0, unit.monsters.bodies_bg_posX.length)],
			bgPosY: unit.monsters.bodies_bg_posY,
		};
		this.unitSprites.hands = {
			path: unit.monsters.hands_path,
			width: unit.monsters.hands_width,
			height: unit.monsters.hands_height,
			bgPosX: unit.monsters.hands_bg_posX[_.random(0, unit.monsters.hands_bg_posX.length)],
			bgPosY: unit.monsters.hands_bg_posY,
		};
		this.unitSprites.legs = {
			path: unit.monsters.hands_path,
			width: unit.monsters.hands_width,
			height: unit.monsters.hands_height,
			bgPosX: unit.monsters.hands_bg_posX[_.random(0, unit.monsters.hands_bg_posX.length)],
			bgPosY: unit.monsters.hands_bg_posY,
		};

	}

	generatePlayerUnit() {} // генерирует юнита игрока аналогично монстрам.

	generateMonsterName() { // генерируем случайное имя юнита монстра
		const firstName = unit.bad_adjectives[_.random(0, unit.bad_adjectives.length)];
		const secondName = unit.monsters_names_1[_.random(0, unit.monsters_names_1.length)];
		const thirdName = unit.monsters_names_2[_.random(0, unit.monsters_names_2.length)];
		this.unitName = `${firstName} ${secondName} ${thirdName}`;
	}

	generatePlayerName() { // генерируем имя юнита игрока (имя игрока + прилагательное)
		const firstName = unit.good_adjectives[_.random(0, unit.good_adjectives.length)];
		let secondName;
		if (this.unitName) {
			secondName = this.unitName;
		} else {
			secondName = unit.players_names[_.random(0, unit.players_names.length)];
		}
		this.unitName = `${firstName} ${secondName}`;
	}

	render() { // отрисовывает юнита
		let head = document.createElement('div');
		head.style.width = this.unitSprites.head.width + 'px';
		head.style.height = this.unitSprites.head.height + 'px';
		head.style.backgroundImage = `url(${this.unitSprites.head.path})`;
		head.style.backgroundPositionX = this.unitSprites.head.bgPosX + 'px';
		head.style.backgroundPositionY = this.unitSprites.head.bgPosY + 'px';
		document.getElementById('unit').appendChild(head);
	}
}
