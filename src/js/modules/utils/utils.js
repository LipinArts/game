export default class Utils {

	static setSprite(src) {
		let img = document.createElement('img');
		img.setAttribute('src', src);
		return img;
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

	static setLastUserDataFromStorageToInput(inputId, localStorageName, propertyName) {
		if (localStorage.getItem(localStorageName)) {
			const lastUserData = JSON.parse(localStorage.getItem(localStorageName));
			const input = document.getElementById(inputId);
			input.value = lastUserData[propertyName];
		}
	}

}
