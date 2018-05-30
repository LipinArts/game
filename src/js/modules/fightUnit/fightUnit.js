class FightUnit {
	constructor(name) {
		this.gameObject = {
			name,
			hp: 100,
			abilities: {},
			sprite: {},
		};
	}
}


const sayHi = () => console.log('module fightUnit connected');
export default sayHi;
