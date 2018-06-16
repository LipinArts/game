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
			standBy: AnimationManager.getAnimation('standBy', this).start(),
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
			this.generateSprites(unitConfig.players.sprites.head, unitConfig.players.sprites.body, unitConfig.players.sprites.hands, unitConfig.players.sprites.legs);
			this.generateSounds(unitConfig.players);
			break;
		case 'monster':
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands, unitConfig.monsters.sprites.legs);
			this.generateSounds(unitConfig.monsters);
			break;
		default:
			this.generateUnit(unitConfig.monsters.adjectives, unitConfig.monsters.names_1, unitConfig.monsters.names_2, unitConfig.monsters.hp);
			this.generateSprites(unitConfig.monsters.sprites.head, unitConfig.monsters.sprites.body, unitConfig.monsters.sprites.hands, unitConfig.monsters.sprites.legs);
			this.generateSounds(unitConfig.monsters);
			break;
		}
	}

	generateUnit(adj, names_1, names_2, unitConfigHP) {
		this.generateUnitName(adj, names_1, names_2);
		this.hp = unitConfigHP * this.difficulty;
		this.maxHP = this.hp;
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