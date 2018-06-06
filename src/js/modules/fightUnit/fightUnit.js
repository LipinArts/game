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
			this.generateUnit(unitConfig.players.adjectives, unitConfig.players.names_1, unitConfig.players.names_2, unitConfig.players.hp);
			this.generateSprites(unitConfig.players.sprites.head, unitConfig.players.sprites.body, unitConfig.players.sprites.hands, unitConfig.players.sprites.legs);
			break;
		case 'monster':
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands, unitConfig.monsters.sprites.legs);
			break;
		default:
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands, unitConfig.monsters.sprites.legs);
			break;
		}
	}

	generateUnit(adj, names_1, names_2, unitConfigHP) {
		this.generateUnitName(adj, names_1, names_2);
		this.hp = unitConfigHP * this.difficulty;
	}

	generateSprites(head, body, hands, legs) {
		this.sprites.head = _.clone(head);
		this.sprites.head.sX = head.sX[_.random(0, head.sX.length - 1)];
		this.sprites.body = _.clone(body);
		this.sprites.body.sX = body.sX[_.random(0, body.sX.length - 1)];
		this.sprites.hands = _.clone(hands);
		this.sprites.hands.sX = hands.sX[_.random(0, hands.sX.length - 1)];
		this.sprites.legs = _.clone(legs);
		this.sprites.legs.sX = legs.sX[_.random(0, legs.sX.length - 1)];
	}

	generateUnitName(first, second, third) {
		const firstName = first[_.random(0, first.length - 1)];
		const secondName = second[_.random(0, second.length - 1)];
		const thirdName = third[_.random(0, third.length - 1)];
		this.name = `${firstName} ${secondName} ${thirdName}`;
	}

}
