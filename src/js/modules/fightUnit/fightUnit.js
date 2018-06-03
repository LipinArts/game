import _ from 'lodash';
import unit from '../../unitConfig';

export default class FightUnit {
	constructor(unit, name, difficulty) {
		this.unit = unit ? unit : 'monster';
		this.name = name;
		this.hp = '';
		this.difficulty = difficulty ? difficulty : 1;
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
		this.hp = unit.monsters.hp * this.difficulty;

		this.sprites.head = {
			path: unit.monsters.sprites.heads_path,
			sX: unit.monsters.sprites.heads_X[_.random(0, unit.monsters.sprites.heads_X.length)],
			sY: unit.monsters.sprites.heads_Y,
			sWidth: unit.monsters.sprites.heads_width,
			sHeight: unit.monsters.sprites.heads_height,
			dX: 0,
			dY: 0,
			dWidth: 0,
			dHeight: 0
		};
		this.sprites.body = {
			path: unit.monsters.sprites.bodies_path,
			sX: unit.monsters.sprites.bodies_X[_.random(0, unit.monsters.sprites.bodies_X.length)],
			sY: unit.monsters.sprites.bodies_Y,
			sWidth: unit.monsters.sprites.bodies_width,
			sHeight: unit.monsters.sprites.bodies_height,
			dX: 0,
			dY: 0,
			dWidth: 0,
			dHeight: 0
		};
		this.sprites.hands = {
			path: unit.monsters.sprites.hands_path,
			sX: unit.monsters.sprites.hands_X[_.random(0, unit.monsters.sprites.hands_X.length)],
			sY: unit.monsters.sprites.hands_Y,
			sWidth: unit.monsters.sprites.hands_width,
			sHeight: unit.monsters.sprites.hands_height,
			dX: 0,
			dY: 0,
			dWidth: 0,
			dHeight: 0
		};
		this.sprites.legs = {
			path: unit.monsters.sprites.hands_path,
			sX: unit.monsters.sprites.hands_X[_.random(0, unit.monsters.sprites.hands_X.length)],
			sY: unit.monsters.sprites.hands_Y,
			sWidth: unit.monsters.sprites.hands_width,
			sHeight: unit.monsters.sprites.hands_height,
			dX: 0,
			dY: 0,
			dWidth: 0,
			dHeight: 0
		};

	}

	generatePlayerUnit() {
		this.generatePlayerName();
		this.hp = unit.players.hp * this.difficulty;

		this.sprites = {
			path: unit.players.sprites.path,
			sX: 0,
			sY: 0,
			sWidth: 0,
			sHeight: 0,
			dX: 0,
			dY: 0,
			dWidth: 0,
			dHeight: 0
		};
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

}
