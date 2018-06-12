import Utils from './modules/utils/utils';

export default {
	attack: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 1, 15);
		return {
			damage: 10 * lvl,
			status: 'normal',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/attack.jpg'
		};
	},
	fireball: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 2, 15);
		return {
			damage: 1 + lvl,
			status: 'burn',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/fireball.jpg'
		};
	},
	burn: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 3, 15);
		return {
			damage: 5 * lvl,
			status: 'burn',
			target: 'target',
			duration: 3 + lvl,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/burn.jpg'
		};
	},
	freeze: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 4, 15);
		return {
			damage: 1 + lvl,
			status: 'freeze',
			target: 'target',
			duration: 3 + Math.floor(lvl / 4),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/freeze.jpg'
		};
	},
	healWeak: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 5, 15);
		return {
			damage: -10 - lvl,
			status: 'normal',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/healWeak.jpg'
		};
	},
	healPeriodic: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 6, 15);
		return {
			damage: -5 - lvl * 2,
			status: 'heal',
			target: 'target',
			duration: 5 + Math.floor(lvl / 3),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/healPeriodic.jpg'
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
			icon_path: 'src/img/selectionWheel/casts/poison.jpg'
		};
	},
	bash: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 8, 15);
		return {
			damage: 40 + lvl,
			status: 'stun',
			target: 'target',
			duration: 3 + Math.floor(lvl / 4),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/bash.jpg'
		};
	},
	ressurect: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 9, 15);
		return {
			damage: 0 - lvl * 2,
			status: 'ressurect',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/ressurect.jpg'
		};
	},
	attackSuper: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 10, 15);
		return {
			damage: 100 + lvl * 3,
			status: 'normal',
			target: 'target',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/attackSuper.jpg'
		};
	},
	fireStorm: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 11, 15);
		return {
			damage: 50 + lvl * 2,
			status: 'burn',
			target: 'enemies',
			duration: 5 + Math.floor(lvl / 2),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/fireStorm.jpg'
		};
	},
	iceStorm: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 12, 15);
		return {
			damage: 0 + lvl * 3,
			status: 'freeze',
			target: 'enemies',
			duration: 5 + Math.floor(lvl / 2),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/iceStorm.jpg'
		};
	},
	meteor: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 13, 15);
		return {
			damage: 100,
			status: 'stun',
			target: 'enemies',
			duration: 3 + Math.floor(lvl / 4),
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/meteor.jpg'
		};
	},
	healMass: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 14, 15);
		return {
			damage: -100 - lvl * lvl,
			status: 'heal',
			target: 'allies',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/healMass.jpg'
		};
	},
	ressurectMass: function (lvl) {
		lvl = Utils.minMaxValid(lvl, 15, 15);
		return {
			damage: 0 - lvl * 10,
			status: 'ressurect',
			target: 'allies',
			duration: 0,
			lvl: lvl,
			icon_path: 'src/img/selectionWheel/casts/ressurectMass.jpg'
		};
	},

};
