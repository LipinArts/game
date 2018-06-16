export default {
	attack: {
		minLvl: 1,
		maxLvl: 3,
		damage: function (lvl) { return 5 * lvl; },
		status: 'normal',
		target: 'target',
		duration: function () { return 0; },
		icon_path: 'src/img/impact/attack/icon/attack.jpg',
		animationTime: 2000
	},
	fireball: {
		minLvl: 2,
		maxLvl: 15,
		damage: function (lvl) { return 5 + lvl; },
		status: 'normal',
		target: 'target',
		duration: function () { return 3; },
		icon_path: 'src/img/impact/fireball/icon/fireball.jpg',
		animationTime: 2000
	},
	burn: {
		minLvl: 3,
		maxLvl: 6,
		damage: function (lvl) { return 15 + lvl; },
		status: 'burn',
		target: 'target',
		duration: function (lvl) { return 3 + lvl; },
		icon_path: 'src/img/impact/burn/icon/burn.jpg',
		animationTime: 2000
	},
	freeze: {
		minLvl: 4,
		maxLvl: 15,
		damage: function () { return 5; },
		status: 'freeze',
		target: 'target',
		duration: function (lvl) { return 3 + Math.floor(lvl / 4); },
		icon_path: 'src/img/impact/freeze/icon/freeze.jpg',
		animationTime: 2000
	},
	healWeak: {
		minLvl: 5,
		maxLvl: 10,
		damage: function (lvl) { return -lvl; },
		status: 'normal',
		target: 'target',
		duration: function () { return 0; },
		icon_path: 'src/img/impact/healWeak/icon/healWeak.jpg',
		animationTime: 2000
	},
	bless: {
		minLvl: 6,
		maxLvl: 15,
		damage: function (lvl) { return -5 - lvl * 2; },
		status: 'heal',
		target: 'target',
		duration: function () { return 5; },
		icon_path: 'src/img/impact/bless/icon/healPeriodic.jpg',
		animationTime: 2000
	},
	poison: {
		minLvl: 7,
		maxLvl: 15,
		damage: function (lvl) { return 5 + lvl; },
		status: 'poison',
		target: 'target',
		duration: function (lvl) { return 5 + Math.floor(lvl / 2); },
		icon_path: 'src/img/impact/poison/icon/poison.jpg',
		animationTime: 2000
	},
	bash: {
		minLvl: 8,
		maxLvl: 15,
		damage: function () { return 40; },
		status: 'stun',
		target: 'target',
		duration: function (lvl) { return 3 + Math.floor(lvl / 4); },
		icon_path: 'src/img/impact/bash/icon/bash.jpg',
		animationTime: 2000
	},
	rise: {
		minLvl: 9,
		maxLvl: 10,
		damage: function () { return 0; },
		status: 'ressurect',
		target: 'target',
		duration: function () { return 0; },
		icon_path: 'src/img/impact/rise/icon/ressurect.jpg',
		animationTime: 2000
	},
	combo: {
		minLvl: 10,
		maxLvl: 15,
		damage: function (lvl) { return 30 + lvl; },
		status: 'normal',
		target: 'target',
		duration: function () { return 0; },
		icon_path: 'src/img/impact/combo/icon/attackSuper.jpg',
		animationTime: 2000
	},
	fireStorm: {
		minLvl: 11,
		maxLvl: 15,
		damage: function (lvl) { return 15 + lvl; },
		status: 'normal',
		target: 'enemies',
		duration: function () { return 0; },
		icon_path: 'src/img/impact/fireStorm/icon/fireStorm.jpg',
		animationTime: 2000
	},
	iceStorm: {
		minLvl: 12,
		maxLvl: 15,
		damage: function () { return 0; },
		status: 'freeze',
		target: 'enemies',
		duration: function (lvl) { return 5 + Math.floor(lvl / 2); },
		icon_path: 'src/img/impact/iceStorm/icon/iceStorm.jpg',
		animationTime: 2000
	},
	meteor: {
		minLvl: 13,
		maxLvl: 15,
		damage: function () { return 50; },
		status: 'stun',
		target: 'enemies',
		duration: function (lvl) { return 3 + Math.floor(lvl / 4); },
		icon_path: 'src/img/impact/meteor/icon/meteor.jpg',
		animationTime: 2000
	},
	healMass: {
		minLvl: 13,
		maxLvl: 15,
		damage: function () { return -70; },
		status: 'heal',
		target: 'allies',
		duration: function () { return 0; },
		icon_path: 'src/img/impact/healMass/icon/healMass.jpg',
		animationTime: 2000
	},
	divineHeal: {
		minLvl: 15,
		maxLvl: 15,
		damage: function () { return -100; },
		status: 'ressurect',
		target: 'allies',
		duration: function () { return 0; },
		icon_path: 'src/img/impact/divineHeal/icon/ressurectMass.jpg',
		animationTime: 2000
	},

};
