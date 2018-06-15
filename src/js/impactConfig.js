import Utils from './modules/utils/utils';

export default {
	attack: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 1, 3);
		return {
			damage: 5 * lvl,
			status: 'normal',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/attack.jpg',
			animationTime: 2000
		};
	},
	fireball: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 2, 15);
		return {
			damage: 5 + lvl,
			status: 'burn',
			target: 'target',
			duration: 3,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/fireball.jpg',
			animationTime: 2000
		};
	},
	burn: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 3, 6);
		return {
			damage: 15 + lvl,
			status: 'burn',
			target: 'target',
			duration: 3 + lvl,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/burn.jpg',
			animationTime: 2000
		};
	},
	freeze: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 4, 15);
		return {
			damage: 5,
			status: 'freeze',
			target: 'target',
			duration: 3 + Math.floor(lvl / 4),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/freeze.jpg',
			animationTime: 2000
		};
	},
	healWeak: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 5, 10);
		return {
			damage: - lvl,
			status: 'normal',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/healWeak.jpg',
			animationTime: 2000
		};
	},
	bless: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 6, 15);
		return {
			damage: -5 - lvl * 2,
			status: 'heal',
			target: 'target',
			duration: 5,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/healPeriodic.jpg',
			animationTime: 2000
		};
	},
	poison: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 7, 15);
		return {
			damage: 5 + lvl,
			status: 'poison',
			target: 'target',
			duration: 5 + Math.floor(lvl / 2),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/poison.jpg',
			animationTime: 2000
		};
	},
	bash: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 8, 15);
		return {
			damage: 40,
			status: 'stun',
			target: 'target',
			duration: 3 + Math.floor(lvl / 4),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/bash.jpg',
			animationTime: 2000
		};
	},
	rise: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 9, 9);
		return {
			damage: 0,
			status: 'ressurect',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/ressurect.jpg',
			animationTime: 2000
		};
	},
	combo: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 10, 15);
		return {
			damage: 30 + lvl,
			status: 'normal',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/attackSuper.jpg',
			animationTime: 2000
		};
	},
	fireStorm: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 11, 15);
		return {
			damage: 15 + lvl,
			status: 'normal',
			target: 'enemies',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/fireStorm.jpg',
			animationTime: 2000
		};
	},
	iceStorm: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 12, 15);
		return {
			damage: 0,
			status: 'freeze',
			target: 'enemies',
			duration: 5 + Math.floor(lvl / 2),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/iceStorm.jpg',
			animationTime: 2000
		};
	},
	meteor: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 13, 15);
		return {
			damage: 50,
			status: 'stun',
			target: 'enemies',
			duration: 3 + Math.floor(lvl / 4),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/meteor.jpg',
			animationTime: 2000
		};
	},
	healMass: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 14, 15);
		return {
			damage: -70,
			status: 'heal',
			target: 'allies',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/healMass.jpg',
			animationTime: 2000
		};
	},
	divineHeal: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 15, 15);
		return {
			damage: -100,
			status: 'ressurect',
			target: 'allies',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/ressurectMass.jpg',
			animationTime: 2000
		};
	},

};
