import ThrowingCast from '../animations/impacts/throwingCast';
import ImpactOnTargetAnim from '../animations/impacts/impactOnTargetAnim';
import StandBy from '../animations/units/standBy';
import Death from '../animations/units/death';
import Attack from '../animations/units/attack';
import Pain from '../animations/units/pain';


export default class AnimationManager {

	static getAnimation(name, context) {
		switch (name) {
		case 'fireball':
			return new ThrowingCast(context);
		case 'standBy':
			return new StandBy(context);
		case 'death':
			return new Death(context);
		case 'attack':
			return new Attack(context);
		case 'pain':
			return new Pain(context);
		case 'healWeak':
			return new ImpactOnTargetAnim(context);
		case 'divineHeal':
			return new ImpactOnTargetAnim(context);
		case 'healMass':
			return new ImpactOnTargetAnim(context);
		case 'bless':
			return new ImpactOnTargetAnim(context);
		default:
			return new ThrowingCast(context);
		}
	}

}

