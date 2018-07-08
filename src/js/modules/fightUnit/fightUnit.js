import _ from 'lodash';
import unitConfig from '../../configs/unitConfig';
import ImpactConfig from '../../configs/impactConfig';
import AIMonsterUnit from '../AIMonsterUnit/AIMonsterUnit';
import ImpactUnit from '../impactUnit/impactUnit';
import AnimationManager from '../animationManager/animationManager';
import Utils from '../utils/utils';

export default class FightUnit {
	constructor(type = 'monster', difficulty = 1) {
		this.type = type;
		this.name = name;
		this.hp = '';
		this.difficulty = difficulty;
		this.abilities = {};
		this.sprites = {};
		this.sounds = {};
		this.generate();
		this.timer = 0;
		this.animation = {
			standBy: AnimationManager.getAnimation('standBy', this),
			death: AnimationManager.getAnimation('death', this),
			attack: AnimationManager.getAnimation('attack', this),
			pain: AnimationManager.getAnimation('pain', this),
		};
	}

	generate() {
		switch (this.type) {
		case 'player':
			this.generateUnitAbilities(unitConfig.players.maxQuantityOfAbilities);
			this.generateUnit(unitConfig.players.adjectives, unitConfig.players.names_1, unitConfig.players.names_2, unitConfig.players.hp);
			this.generateSprites(unitConfig.players.sprites, unitConfig.players.unitSize);
			this.generateSounds(unitConfig.players);
			break;
		case 'monster':
			this.generateUnitAbilities(unitConfig.monsters.maxQuantityOfAbilities);
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites, unitConfig.monsters.unitSize);
			this.generateSounds(unitConfig.monsters);
			break;
		default:
			this.generateUnitAbilities(unitConfig.monsters.maxQuantityOfAbilities);
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites, unitConfig.monsters.unitSize);
			this.generateSounds(unitConfig.monsters);
			break;
		}
	}

	generateUnit(adj, names_1, names_2, unitConfigHP) {
		this.generateUnitName(adj, names_1, names_2);
		this.hp = unitConfigHP * this.difficulty;
		this.maxHP = this.hp;
	}

	generateSprites(allSprites, unitSize) {
		this.sprites.head = _.clone(allSprites.head);
		this.sprites.head.image = Utils.setSprite(allSprites.head.path);
		this.sprites.head.sX = allSprites.head.sX[_.random(0, allSprites.head.sX.length - 1)];

		this.sprites.body = _.clone(allSprites.body);
		this.sprites.body.image = Utils.setSprite(allSprites.body.path);
		this.sprites.body.sX = allSprites.body.sX[_.random(0, allSprites.body.sX.length - 1)];

		this.sprites.hands_left = _.clone(allSprites.hands_left);
		this.sprites.hands_left.image = Utils.setSprite(allSprites.hands_left.path);
		this.sprites.hands_left.sX = allSprites.hands_left.sX[_.random(0, allSprites.hands_left.sX.length - 1)];
		this.sprites.hands_right = _.clone(allSprites.hands_right);
		this.sprites.hands_right.image = Utils.setSprite(allSprites.hands_right.path);
		this.sprites.hands_right.sX = this.sprites.hands_left.sX;

		this.sprites.legs_left = _.clone(allSprites.legs_left);
		this.sprites.legs_left.image = Utils.setSprite(allSprites.legs_left.path);
		this.sprites.legs_left.sX = allSprites.legs_left.sX[_.random(0, allSprites.legs_left.sX.length - 1)];
		this.sprites.legs_right = _.clone(allSprites.legs_right);
		this.sprites.legs_right.image = Utils.setSprite(allSprites.legs_right.path);
		this.sprites.legs_right.sX = this.sprites.legs_left.sX;

		this.unitSize = _.clone(unitSize);
	}

	generateUnitName(first, second, third) {
		const firstName = first[_.random(0, first.length - 1)];
		const secondName = second[_.random(0, second.length - 1)];
		const thirdName = third[_.random(0, third.length - 1)];
		this.name = `${firstName} ${secondName} ${thirdName}`;
	}

	generateUnitAbilities(maxQuantityOfAbilities) {
		const allCastsNames = Object.keys(ImpactConfig);

		for (let numberUnitCast = 0; numberUnitCast < maxQuantityOfAbilities; numberUnitCast++) {
			const impactName = allCastsNames[_.random(0, allCastsNames.length - 1)];
			const maxLvlCast = 15;
			const minLvlCast = 1;
			const lvlCast = _.random(minLvlCast, maxLvlCast + 1);
			this.abilities[impactName] = new ImpactUnit(impactName, lvlCast);
		}
	}

	generateAITurn(playerUnits, monsterUnits) {
		return AIMonsterUnit.generateAITurn(playerUnits, monsterUnits, this.abilities);
	}

	generateSounds(unitConfig) {
		const randomSoundsSetUp = unitConfig.sounds.setUp[_.random(0, unitConfig.sounds.setUp.length - 1)];
		this.sounds.notYet = Utils.setAudioTrack(randomSoundsSetUp.notYet);
		this.sounds.attack = Utils.setAudioTrack(randomSoundsSetUp.attack);
		this.sounds.pain = Utils.setAudioTrack(randomSoundsSetUp.pain);
		this.sounds.death = Utils.setAudioTrack(randomSoundsSetUp.death);
		this.sounds.failure = Utils.setAudioTrack(randomSoundsSetUp.failure);
	}

}
