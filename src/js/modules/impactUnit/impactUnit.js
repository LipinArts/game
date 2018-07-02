import impactConfig from '../../impactConfig';
import Utils from '../utils/utils';
import SoundManager from '../soundManager/soundManager';
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
		this.rotation = 0;

		this.sprite = {
			image: Utils.setSprite(impactConfig[name].spritesheet),
			width: impactConfig[name].sprites.width,
			height: impactConfig[name].sprites.height,
			allSprites_sX: impactConfig[name].sprites.sX,
			sX: 0,
			sY: 0,
			dX: 0,
			dY: 0,
			rotation: 0
		},

		this.animation = AnimationManager.getAnimation(name, this);

		const src = impactConfig[name].sounds.moving;
		this.sound = SoundManager.setAudioTrack(src);
	}
}