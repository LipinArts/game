import _ from 'lodash';
import unitConfig from '../../unitConfig';
import ImpactConfig from '../../impactConfig';
import AIMonsterUnit from '../AIMonsterUnit/AIMonsterUnit';
import ImpactUnit from '../ImpactUnit/ImpactUnit';
import SoundManager from '../soundManager/soundManager';
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
		this.generateUnitAbilities();
		switch (this.type) {
		case 'player':
			this.generateUnit(unitConfig.players.adjectives, unitConfig.players.names_1, unitConfig.players.names_2, unitConfig.players.hp);
			this.generateSprites(unitConfig.players.sprites.head, unitConfig.players.sprites.body, unitConfig.players.sprites.hands_left, unitConfig.players.sprites.hands_right, unitConfig.players.sprites.legs_left, unitConfig.players.sprites.legs_right, unitConfig.players.unitSize);
			this.generateSounds(unitConfig.players);
			break;
		case 'monster':
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands_left, unitConfig.monsters.sprites.hands_right, unitConfig.monsters.sprites.legs_left, unitConfig.monsters.sprites.legs_right, unitConfig.monsters.unitSize);
			this.generateSounds(unitConfig.monsters);
			break;
		default:
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands_left, unitConfig.monsters.sprites.hands_right, unitConfig.monsters.sprites.legs_left, unitConfig.monsters.sprites.legs_right, unitConfig.monsters.unitSize);
			this.generateSounds(unitConfig.monsters);
			break;
		}
	}

	generateUnit(adj, names_1, names_2, unitConfigHP) {
		this.generateUnitName(adj, names_1, names_2);
		this.hp = unitConfigHP * this.difficulty;
		this.maxHP = this.hp;
	}

	generateSprites(head, body, hands_left, hands_right, legs_left, legs_right, unitSize) {
		this.sprites.head = _.clone(head);
		this.sprites.head.image = Utils.setSprite(head.path);
		this.sprites.head.sX = head.sX[_.random(0, head.sX.length - 1)];
		this.sprites.body = _.clone(body);
		this.sprites.body.image = Utils.setSprite(body.path);
		this.sprites.body.sX = body.sX[_.random(0, body.sX.length - 1)];

		this.sprites.hands_left = _.clone(hands_left);
		this.sprites.hands_left.image = Utils.setSprite(hands_left.path);
		this.sprites.hands_left.sX = hands_left.sX[_.random(0, hands_left.sX.length - 1)];
		this.sprites.hands_right = _.clone(hands_right);
		this.sprites.hands_right.image = Utils.setSprite(hands_right.path);
		this.sprites.hands_right.sX = this.sprites.hands_left.sX;

		this.sprites.legs_left = _.clone(legs_left);
		this.sprites.legs_left.image = Utils.setSprite(legs_left.path);
		this.sprites.legs_left.sX = legs_left.sX[_.random(0, legs_left.sX.length - 1)];
		this.sprites.legs_right = _.clone(legs_right);
		this.sprites.legs_right.image = Utils.setSprite(legs_right.path);
		this.sprites.legs_right.sX = this.sprites.legs_left.sX;

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
		console.log(allCastsNames);

		for (let numberUnitCast = 0; numberUnitCast < 6; numberUnitCast++) {
			const impactName = allCastsNames[_.random(0, allCastsNames.length - 1)];
			const lvlCast = _.random(1, this.difficulty);
			this.abilities[impactName] = new ImpactUnit(impactName, lvlCast);
		}
	}

	generateAITurn(playerUnits, monsterUnits) {
		return AIMonsterUnit.generateAITurn(playerUnits, monsterUnits, this.abilities);
	}

	generateSounds(unitConfig) {
		const randomSoundsSetUp = unitConfig.sounds.setUp[_.random(0, unitConfig.sounds.setUp.length - 1)];
		this.sounds.notYet = SoundManager.setAudioTrack(randomSoundsSetUp.notYet);
		this.sounds.attack = SoundManager.setAudioTrack(randomSoundsSetUp.attack);
		this.sounds.pain = SoundManager.setAudioTrack(randomSoundsSetUp.pain);
		this.sounds.death = SoundManager.setAudioTrack(randomSoundsSetUp.death);
		this.sounds.failure = SoundManager.setAudioTrack(randomSoundsSetUp.failure);
	}

}
