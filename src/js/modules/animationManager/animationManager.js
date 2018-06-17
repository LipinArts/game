//import attack from './animations/impacts/attack';
import Fireball from '../animations/impacts/fireball';
import HealWeak from '../animations/impacts/healWeak';
// import burn from './animations/impacts/burn';
// import freeze from './animations/impacts/freeze';
// import healWeak from './animations/impacts/healWeak';
// import bless from './animations/impacts/bless';
// import poison from './animations/impacts/poison';
// import bash from './animations/impacts/bash';
// import rise from './animations/impacts/rise';
// import combo from './animations/impacts/combo';
// import fireStorm from './animations/impacts/fireStorm';
// import iceStorm from './animations/impacts/iceStorm';
// import meteor from './animations/impacts/meteor';
// import healMass from './animations/impacts/healMass';
// import divineHeal from './animations/impacts/divineHeal';

import StandBy from '../animations/units/standBy';
import Death from '../animations/units/death';
import Attack from '../animations/units/attack';
import Pain from '../animations/units/pain';


export default class AnimationManager {

	static getAnimation(name, context) {
		switch (name) {
		case 'fireball':
			return new Fireball(context);
		case 'standBy':
			return new StandBy(context);
		case 'death':
			return new Death(context);
		case 'attack':
			return new Attack(context);
		case 'pain':
			return new Pain(context);
		case 'healWeak':
			return new HealWeak(context);


			// case 'burn':
			// 	return fireball;
			// case 'freeze':
			// 	return attack;
			// case 'healWeak':
			// 	return fireball;
			// case 'bless':
			// 	return attack;
			// case 'poison':
			// 	return fireball;
			// case 'bash':
			// 	return attack;
			// case 'rise':
			// 	return fireball;
			// case 'combo':
			// 	return attack;
			// case 'fireStorm':
			// 	return fireball;
			// case 'iceStorm':
			// 	return attack;
			// case 'meteor':
			// 	return fireball;
			// case 'healMass':
			// 	return attack;
			// case 'divineHeal':
			// 	return fireball;

		default:
			return new Fireball(context);
		}
	}

}

