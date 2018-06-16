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
		//this.animation = AnimationManager.getAnimation(name);
	}
}