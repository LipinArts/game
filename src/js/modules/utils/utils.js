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

}
