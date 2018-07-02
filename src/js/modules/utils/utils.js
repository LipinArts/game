import $ from 'jquery';
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

	static getUserDataFromInput(inputId, propertyName) {
		const input = document.getElementById(inputId);
		let userDataObj = {};
		userDataObj[propertyName] = input.value;
		return userDataObj;
	}

	static saveDataObjToStorage(userDataObj, localStorageName) {
		localStorage.setItem(localStorageName, JSON.stringify(userDataObj));
	}

	static getLastUserDataFromStorage(localStorageName, propertyName) {
		if (localStorage.getItem(localStorageName)) {
			const lastUserData = JSON.parse(localStorage.getItem(localStorageName));
			return lastUserData[propertyName];
		}
	}

	static rotate(cx, cy, x, y, angle) {
		let radians = (Math.PI / 180) * angle,
			cos = Math.cos(radians),
			sin = Math.sin(radians),
			nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
			ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
		return [nx, ny];
	}

	static getDistanceBetweenPoints(x1, y1, x2, y2) {
		return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
	}

	static get_force_vector(rotation) {
		let force_vector = {
			x: Math.cos(rotation * (Math.PI / 180)),
			y: Math.sin(rotation * (Math.PI / 180))
		};
		return force_vector;
	}

	static showLoader() {
		$('.loader').show();
	}

	static hideLoader() {
		$('.loader').delay(400).fadeOut('slow');
	}

}
