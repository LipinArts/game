import _ from 'lodash';
import unitConfig from '../../unitConfig';
import ImpactConfig from '../../impactConfig';
import Utils from '../utils/utils';

export default class FightUnit {
	constructor(type = 'monster', difficulty = 1) {
		this.type = type;
		this.name = name;
		this.hp = '';
		this.difficulty = difficulty;
		this.abilities = {};
		this.sprites = {};
		this.generate();
		this.animation = {
			standBy: function standBy(unit) {
				const fps = 80;
				const startPos = 0;
				const endPos = 7;
				let currentPos = _.random(startPos, endPos - 1);
				let bubble = true;

				function moveDown() {
					unit.sprites.head.dY += .5;
					unit.sprites.body.dY += .7;
					unit.sprites.hands.dY += .5;
					currentPos += 1;
					// for test!
					unit.sprites.head.rotation = unit.sprites.head.rotation + 5;
				}

				function moveUp() {
					unit.sprites.head.dY -= .5;
					unit.sprites.body.dY -= .7;
					unit.sprites.hands.dY -= .5;
					currentPos -= 1;
					// for test!
					unit.sprites.head.rotation = unit.sprites.head.rotation - 5;
				}
				setTimeout(function go() {
					if (bubble) {
						if (currentPos > endPos) {
							bubble = false;
						}
						moveDown();
					} else {
						if (currentPos < startPos) {
							bubble = true;
						}
						moveUp();
					}
					setTimeout(go, fps);
				}, fps);
			}(this),
		};
	}

	generate() {
		this.generateUnitAbilities();
		switch (this.type) {
		case 'player':
			this.generateUnit(unitConfig.players.adjectives, unitConfig.players.names_1, unitConfig.players.names_2, unitConfig.players.hp);
			this.generateSprites(unitConfig.players.sprites.head, unitConfig.players.sprites.body, unitConfig.players.sprites.hands, unitConfig.players.sprites.legs, unitConfig.players.unitSize);
			break;
		case 'monster':
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands, unitConfig.monsters.sprites.legs, unitConfig.monsters.unitSize);
			break;
		default:
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands, unitConfig.monsters.sprites.legs, unitConfig.monsters.unitSize);
			break;
		}
	}

	generateUnit(adj, names_1, names_2, unitConfigHP) {
		this.generateUnitName(adj, names_1, names_2);
		this.hp = unitConfigHP * this.difficulty;
	}

	generateSprites(head, body, hands, legs, unitSize) {
		this.sprites.head = _.clone(head);
		this.sprites.head.image = Utils.setSprite(head.path);
		this.sprites.head.sX = head.sX[_.random(0, head.sX.length - 1)];
		this.sprites.body = _.clone(body);
		this.sprites.body.image = Utils.setSprite(body.path);
		this.sprites.body.sX = body.sX[_.random(0, body.sX.length - 1)];
		this.sprites.hands = _.clone(hands);
		this.sprites.hands.image = Utils.setSprite(hands.path);
		this.sprites.hands.sX = hands.sX[_.random(0, hands.sX.length - 1)];
		this.sprites.legs = _.clone(legs);
		this.sprites.legs.image = Utils.setSprite(legs.path);
		this.sprites.legs.sX = legs.sX[_.random(0, legs.sX.length - 1)];

		this.unitSize = _.clone(unitSize);
	}

	generateUnitName(first, second, third) {
		const firstName = first[_.random(0, first.length - 1)];
		const secondName = second[_.random(0, second.length - 1)];
		const thirdName = third[_.random(0, third.length - 1)];
		this.name = `${firstName} ${secondName} ${thirdName}`;
	}

	generateUnitAbilities() {
		const allCastsNames = Object.keys(ImpactConfig);
		for (let numberUnitCast = 0; numberUnitCast < 6; numberUnitCast++) {
			const nameProperty = allCastsNames[_.random(0, allCastsNames.length - 1)];
			const lvlCast = _.random(1, this.difficulty);
			this.abilities[nameProperty] = _.clone(ImpactConfig[nameProperty](lvlCast));
		}
	}

}
