export default class SelectionWheel {
	constructor(inputObj, bluredElem, infoOutputScheme = {}, parentElem = document.body, srcBackgroundImage = 'src/img/selectionWheel/wheel.png', idModule = 'dsgs35dngjy5') {
		this.bluredElem = bluredElem;
		this.infoOutputScheme = infoOutputScheme;
		this.srcBackgroundImage = srcBackgroundImage;
		this.parentOfModule = parentElem;
		this.additionalTextToID = '_selectionWheel_id';
		this.buttons = [];
		this.indexButton = -1;
		this.impactsNames = Object.keys(inputObj);
		this.buttonsQuantity = this.impactsNames.length;
		this.impactsObj = this.getAllImpactsObj(this.impactsNames, inputObj);

		this.idModule = idModule;

		return new Promise(resolvePromiseFunc => {
			this.bluredElem.classList.add('blur');
			const newModal = this.createModal(inputObj);
			this.addAllModuleEventListeners(resolvePromiseFunc, newModal);
		});
	}

	getAllImpactsObj(impactsNames, inputObj) {
		let impactsObjs = [];
		impactsNames.forEach(nameProperty => {
			impactsObjs.push(inputObj[nameProperty]);
		});
		return impactsObjs;
	}

	createModal() {
		const buttonsContainer = document.createElement('div');
		buttonsContainer.className = 'modal-overlay';
		buttonsContainer.classList.add('buttonsContainer');
		buttonsContainer.id = this.idModule;
		buttonsContainer.classList.add(this.idModule);
		const modalWrap = document.createElement('div');
		modalWrap.className = 'selectionWheel-modal-wrap';
		buttonsContainer.appendChild(modalWrap);
		const modal = document.createElement('div');
		modal.className = 'selectionWheel-modal';
		modalWrap.appendChild(modal);
		const modalBg = document.createElement('div');
		modalBg.className = 'selectionWheel-bg';
		modal.appendChild(modalBg);
		const img = document.createElement('img');
		img.setAttribute('src', this.srcBackgroundImage);
		modalBg.appendChild(img);

		const castsWrap = document.createElement('div');
		castsWrap.className = 'selection-casts-wrap';
		modalBg.appendChild(castsWrap);

		this.createButtons(castsWrap);
		this.createBackButton(modalBg);
		this.createInfoField(modalBg);

		document.body.appendChild(buttonsContainer);
		return buttonsContainer;
	}

	createButtons(parent) {
		for (let i = 0; i < this.buttonsQuantity; i++) {
			const newButton = document.createElement('button');
			this.buttons.push(newButton);
			const impact = this.impactsObj[i];
			//newButton.setAttribute('impact', JSON.stringify(impact));
			newButton.setAttribute('impact', i);
			newButton.className = 'skillButt';
			newButton.classList.add('selection-btn');
			newButton.classList.add('selection-cast-icon');
			const icon_path = impact.icon_path;
			if (icon_path) {
				newButton.style.backgroundImage = `url(${icon_path})`;
				newButton.textContent = this.impactsNames[i];
			} else {
				newButton.textContent = this.impactsNames[i];
			}
			parent.appendChild(newButton);
		}
	}

	createBackButton(modalBg) {
		const backBtn = document.createElement('button');
		backBtn.className = 'selection-btn selectionWheel-back-btn';
		backBtn.classList.add('selectionWheel-back-btn');
		backBtn.setAttribute('impact', 'backButton');
		this.buttons.push(backBtn);
		this.buttonsQuantity++;
		modalBg.appendChild(backBtn);
	}

	createInfoField(parent) {
		const infoField = document.createElement('div');
		infoField.id = 'infofield_id';
		infoField.className = 'selectionWheel-cast-info';
		const ul = document.createElement('ul');

		const schemeProperties = Object.keys(this.infoOutputScheme);
		schemeProperties.forEach(propertyName => {
			let newInfoFieldList = document.createElement('li');

			const namePropertyDiv = document.createElement('div');
			namePropertyDiv.id = propertyName + '_divName' + this.additionalTextToID;
			namePropertyDiv.classList.add('infoFieldName');
			newInfoFieldList.appendChild(namePropertyDiv);

			const valuePropertyDiv = document.createElement('div');
			valuePropertyDiv.id = propertyName + '_divValue' + this.additionalTextToID;
			valuePropertyDiv.classList.add('infoFieldValue');
			newInfoFieldList.appendChild(valuePropertyDiv);

			newInfoFieldList.classList.add('newInfoFieldList');
			ul.appendChild(newInfoFieldList);
		});

		infoField.appendChild(ul);
		parent.appendChild(infoField);
	}

	addAllModuleEventListeners(resolvePromiseFunc, newModal) {
		const parent = this.parentOfModule;
		const that = this;
		function clickHandler(event) {
			let target = event.target;
			if (target.className.includes('skillButt') || target.className.includes('selectionWheel-back-btn')) {
				parent.removeEventListener('click', clickHandler, false);
				parent.removeEventListener('mouseover', mouseoverHandler, false);
				parent.removeEventListener('mouseout', mouseoutHandler, false);
				parent.removeEventListener('focus', onfocusHandler, true);
				window.removeEventListener('keyup', keyup, false);
				that.closeModalWindow(newModal);
				resolvePromiseFunc(that.getAbility(target));
			}
		}

		function mouseoverHandler(event) {
			let target = event.target;
			if (target.className.includes('skillButt') || target.className.includes('selectionWheel-back-btn')) {
				that.focus_that(target);
				that.showImpactInfo(target);
			}
		}

		function mouseoutHandler(event) {
			if (event.target.className.includes('skillButt') || event.target.className.includes('selectionWheel-back-btn')) {
				that.clearImpactInfo();
				that.unfocus_that(event.target);
			}
		}

		const keyMap = {
			39: 'right',
			37: 'left',
			27: 'esc',
		};

		function keyup(event) {
			switch (keyMap[event.keyCode]) {
			case 'right':
				that.focus_next();
				break;
			case 'left':
				that.focus_prev();
				break;
			case 'esc':
				parent.removeEventListener('click', clickHandler, false);
				parent.removeEventListener('mouseover', mouseoverHandler, false);
				parent.removeEventListener('mouseout', mouseoutHandler, false);
				parent.removeEventListener('focus', onfocusHandler, true);
				window.removeEventListener('keyup', keyup, false);
				that.closeModalWindow(newModal);
				resolvePromiseFunc();
				break;
			}
		}

		function onfocusHandler(event) {
			that.showImpactInfo(event.target);
		}

		parent.addEventListener('click', clickHandler, false);
		parent.addEventListener('mouseover', mouseoverHandler, false);
		parent.addEventListener('mouseout', mouseoutHandler, false);
		parent.addEventListener('focus', onfocusHandler, true);
		window.addEventListener('keyup', keyup, false);
	}

	closeModalWindow(element) {
		this.bluredElem.classList.remove('blur');
		this.deleteModal(element);
	}

	deleteModal(elem) {
		elem.remove();
	}

	getAbility(target) {
		const index = Number(target.getAttribute('impact'));
		return this.impactsObj[index];
	}

	showImpactInfo(target) {
		if (!target.className.includes('selectionWheel-back-btn')) {
			const index = Number(target.getAttribute('impact'));
			const targetObj = this.impactsObj[index];
			const schemeProperties = Object.keys(this.infoOutputScheme);
			schemeProperties.forEach(propertyName => {
				const liName = document.getElementById(propertyName + '_divName' + this.additionalTextToID);
				liName.textContent = this.infoOutputScheme[propertyName];
				const liValue = document.getElementById(propertyName + '_divValue' + this.additionalTextToID);
				liValue.textContent = targetObj[propertyName];
			});
		}
	}

	clearImpactInfo() {
		const schemeProperties = Object.keys(this.infoOutputScheme);
		schemeProperties.forEach(propertyName => {
			const liName = document.getElementById(propertyName + '_divName' + this.additionalTextToID);
			liName.textContent = '';
			const liValue = document.getElementById(propertyName + '_divValue' + this.additionalTextToID);
			liValue.textContent = '';
		});
	}

	nextTarget() {
		this.indexButton++;
		if (this.indexButton > this.buttonsQuantity - 1) {
			this.indexButton = 0;
		}
		if (this.indexButton < this.buttonsQuantity) {
			return this.buttons[this.indexButton];
		} else {
			return this.buttons[this.indexButton - 3];
		}
	}

	prevTarget() {
		this.indexButton--;
		if (this.indexButton < 0) {
			this.indexButton = this.buttonsQuantity - 1;
		}
		if (this.indexButton < this.buttonsQuantity) {
			return this.buttons[this.indexButton];
		} else {
			return this.buttons[this.indexButton - 3];
		}
	}

	focus_next() {
		const nextButton = this.nextTarget();
		this.focus_that(nextButton);
	}

	focus_prev() {
		const prevButton = this.prevTarget();
		this.focus_that(prevButton);
	}

	focus_that(element_id) {
		element_id.focus();
	}

	unfocus_that(element_id) {
		element_id.dispatchEvent(new Event('blur'));
		element_id.blur();
	}

}