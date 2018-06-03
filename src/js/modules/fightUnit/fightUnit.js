import _ from 'lodash';
import unitConfig from '../../unitConfig';

export default class FightUnit {
	constructor(type = 'monster', difficulty = 1) {
		this.type = type;
		this.name = name;
		this.hp = '';
		this.difficulty = difficulty;
		this.abilities = {};
		this.sprites = {};
		this.generate();
	}

	generate() {
		switch (this.type) {
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
		this.generateUnitName(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2);
		this.hp = unitConfig.monsters.hp * this.difficulty;
	}

	generatePlayerUnit() {
		this.generateUnitName(unitConfig.players.adjectives, unitConfig.players.names_1, unitConfig.players.names_2);
		this.hp = unitConfig.players.hp * this.difficulty;
	}

	generateUnitName(first, second, third) {
		const firstName = first[_.random(0, first.length - 1)];
		const secondName = second[_.random(0, second.length - 1)];
		const thirdName = third[_.random(0, third.length - 1)];
		this.name = `${firstName} ${secondName} ${thirdName}`;
	}

}
