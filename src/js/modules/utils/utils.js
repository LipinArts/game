export default class Utils {

	static setSprite(src) {
		let img = document.createElement('img');
		img.setAttribute('src', src);
		return img;
	}

	static minMaxValid(value, min, max) {
		if (value > max) {
			value = max;
		}
		if (value < min) {
			value = min;
		}
		return value;
	}

	//unit canvas render test function
	static testUnitRender(unit, posX = 0, posY = 0) {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		const head = new Image();
		const body = new Image();
		const hands = new Image();
		const legs = new Image();
		head.src = unit.sprites.head.path;
		hands.src = unit.sprites.hands.path;
		legs.src = unit.sprites.legs.path;
		body.src = unit.sprites.body.path;
		body.onload = function () {
			draw();
		};

		function draw() {
			ctx.drawImage(legs, unit.sprites.legs.sX, unit.sprites.legs.sY, unit.sprites.legs.width, unit.sprites.legs.height, unit.sprites.legs.dX + posX, unit.sprites.legs.dY + posY, unit.sprites.legs.width, unit.sprites.legs.height);
			ctx.drawImage(body, unit.sprites.body.sX, unit.sprites.body.sY, unit.sprites.body.width, unit.sprites.body.height, unit.sprites.body.dX + posX, unit.sprites.body.dY + posY, unit.sprites.body.width, unit.sprites.body.height);
			ctx.drawImage(head, unit.sprites.head.sX, unit.sprites.head.sY, unit.sprites.head.width, unit.sprites.head.height, unit.sprites.head.dX + posX, unit.sprites.head.dY + posY, unit.sprites.head.width, unit.sprites.head.height);
			ctx.drawImage(hands, unit.sprites.hands.sX, unit.sprites.hands.sY, unit.sprites.hands.width, unit.sprites.hands.height, unit.sprites.hands.dX + posX, unit.sprites.hands.dY + posY, unit.sprites.hands.width, unit.sprites.hands.height);
		}

	}
}
