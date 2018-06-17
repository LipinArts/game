import impactConfig from '../../impactConfig';
import Utils from '../utils/utils';
import AnimationManager from '../animationManager/animationManager';

export default class ImpactUnit {
	constructor(name, lvl) {
		this.name = name;
		this.lvl = Utils.minMaxValid(lvl, this.minLvl, this.maxlvl);
		this.damage = impactConfig[name].damage(this.lvl);
		this.status = impactConfig[name].status;
		this.target = impactConfig[name].target;
		this.duration = impactConfig[name].duration(this.lvl);
		this.icon_path = impactConfig[name].icon_path;
		this.animationTime = impactConfig[name].animationTime;

		this.position = {
			x: 0,
			y: 0
		},
		this.movement = {
			x: 0,
			y: 0
		},
		this.setTimeOut_id;
		this.rotation = 45,
		this.sprite = {
			image: Utils.setSprite('src/img/impact/fireball/sprites/10.png'),
			path: 'src/img/impact/fireball/sprites/10.png',
			width: 256,
			height: 256,
			sX: 0,
			sY: 0,
			dX: 0,
			dY: 0,
			rotation: 0
		},

		this.animation = AnimationManager.getAnimation('fireball', this);
	}
}