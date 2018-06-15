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
		this.timer = 0;

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
				}

				function moveUp() {
					unit.sprites.head.dY -= .5;
					unit.sprites.body.dY -= .7;
					unit.sprites.hands.dY -= .5;
					currentPos -= 1;
				}
				unit.timer = setTimeout(function go() {
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
					unit.timer = setTimeout(go, fps);
				}, fps);
			}(this),

			death: function (unit) {
				clearTimeout(unit.timer);
				const fps = 25;
				let startPos = 0;
				const endPos = unit.sprites.legs.dY;

				function moveDown() {
					unit.sprites.head.dY += 10;
					unit.sprites.body.dY += 5;
					unit.sprites.hands.dY += 5;
					startPos += 8;
				}
				setTimeout(function go() {
					if (startPos < endPos) {
						moveDown();
					}
					setTimeout(go, fps);
				}, fps);
			},

			attack: function (unit) {
				clearTimeout(unit.timer);
				const fps = 20;
				let startPos = 0;
				const endPos = 200;
				let currentPos = 0;
				let bubble = true;
				let counter = 0;

				function moveRightPlayer() {
					unit.sprites.head.dX += 10;
					unit.sprites.body.dX += 10;
					unit.sprites.hands.dX += 10;
					unit.sprites.legs.dX += 10;
					currentPos += 10;
				}
				function moveleftPlayer() {
					unit.sprites.head.dX -= 10;
					unit.sprites.body.dX -= 10;
					unit.sprites.hands.dX -= 10;
					unit.sprites.legs.dX -= 10;
					currentPos -= 10;
				}

				function moveRightMonster() {
					unit.sprites.head.dX += 10;
					unit.sprites.body.dX += 10;
					unit.sprites.hands.dX += 10;
					unit.sprites.legs.dX += 10;
					currentPos -= 10;
				}
				function moveleftMonster() {
					unit.sprites.head.dX -= 10;
					unit.sprites.body.dX -= 10;
					unit.sprites.hands.dX -= 10;
					unit.sprites.legs.dX -= 10;
					currentPos += 10;
				}
				unit.timer = setTimeout(function go() {
					if (bubble) {
						if (currentPos > endPos) {
							bubble = false;
						}
						if (unit.type === 'player') {
							moveRightPlayer();
						} else {
							moveleftMonster();
						}
					} else {
						if (currentPos < startPos + 30) {
							bubble = true;
							counter  = 1;
						}
						if (unit.type === 'player') {
							moveleftPlayer();
						} else {
							moveRightMonster();
						}
					}
					if(counter === 0){
						unit.timer = setTimeout(go, fps);
					}else{
						clearTimeout(unit.timer);
					}
				}, fps);
			},

			damage: function(unit) {
				clearTimeout(unit.timer);
				const fps = 80;
				const startPos = 0;
				const endPos = 10;
				let currentPos = 0;
				let counter = 0;
				let bubble = true;

				function moveDown() {
					unit.sprites.head.dY += 1;
					// unit.sprites.body.dY += 2;
					// unit.sprites.hands.dY += .5;
					currentPos += 1;
				}

				function moveUp() {
					unit.sprites.head.dY -= 1;
					// unit.sprites.body.dY -= 2;
					// unit.sprites.hands.dY -= .5;
					currentPos -= 1;
				}
				unit.timer = setTimeout(function go() {
					if (bubble) {
						if (currentPos > endPos) {
							bubble = false;
						}
						moveDown();
					} else {
						if (currentPos < startPos) {
							bubble = true;
							counter  = 1;
						}
						moveUp();
					}
					if(counter === 0){
						unit.timer = setTimeout(go, fps);
					}else{
						clearTimeout(unit.timer);
					}
				}, fps);
			}
		};
	}

	generate() {
		this.generateUnitAbilities();
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
