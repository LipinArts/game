export default class SelectionWheel {
	constructor(selectorInputObj, bluredElem, infoOutputScheme) {
		this.buttons = [];
		this.indexButton = -1;
		this.bluredElem = bluredElem;
		this.buttonQuantity;
		this.parentOfModule = document.body;
		this.impactsNameProperties = this.getAllImpactsNames(selectorInputObj);
		this.buttonQuantity = this.impactsNameProperties.length;
		this.impactsObj = this.getAllImpactsObj(this.impactsNameProperties, selectorInputObj);

		this.infoScheme = infoOutputScheme;
		this.modalBg;
		this.infoList;
		this.additionalTextToID = '_selectionWheel_id';

		return new Promise((resolve) => {
			const newModal = this.createModal(selectorInputObj);
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
					resolve(that.getAbility(target));
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
					that.closeModalWindow(newModal);
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
		});
	}

	createModal() {
		const buttonsContainer = document.createElement('div');
		buttonsContainer.className = 'modal-overlay';
		buttonsContainer.classList.add('buttonsContainer');
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
		img.setAttribute('src', 'src/img/selectionWheel/wheel.png');
		modalBg.appendChild(img);

		const castsWrap = document.createElement('div');
		castsWrap.className = 'selection-casts-wrap';
		modalBg.appendChild(castsWrap);

		this.createButtons(castsWrap);

		this.modalBg = modalBg;

		this.createInfoField(this.modalBg);

		const backBtn = document.createElement('button');
		backBtn.className = 'selection-btn selectionWheel-back-btn';
		backBtn.classList.add('selectionWheel-back-btn');
		this.buttons.push(backBtn);
		this.buttonQuantity++;
		modalBg.appendChild(backBtn);

		document.body.appendChild(buttonsContainer);
		this.bluredElem.classList.add('blur');
		return buttonsContainer;
	}

	createButtons(parent) {
		for (let i = 0; i < this.buttonQuantity; i++) {
			const newButton = document.createElement('button');
			this.buttons.push(newButton);
			const impact = this.impactsObj[i];
			newButton.setAttribute('impact', JSON.stringify(impact));
			newButton.className = 'skillButt';
			newButton.classList.add('selection-btn');
			newButton.classList.add('selection-cast-icon');
			const icon_path = impact.icon_path;
			newButton.style.backgroundImage = `url(${icon_path})`;
			parent.appendChild(newButton);
		}
	}

	createInfoField(parent) {
		const infoField = document.createElement('div');
		infoField.id = 'infofield_id';
		infoField.className = 'selectionWheel-cast-info';
		const ul = document.createElement('ul');
		this.infoList = ul;

		const schemeProperties = Object.keys(this.infoScheme);
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

	closeModalWindow(element) {
		this.bluredElem.classList.remove('blur');
		this.deleteModal(element);
	}


	deleteModal(elem) {
		elem.remove();
	}

	getAbility(target) {
		return target.getAttribute('impact');
	}

	getAllImpactsNames(selectorInputObj) {
		return Object.keys(selectorInputObj);
	}

	getAllImpactsObj(impactsNameProperties, selectorInputObj) {
		let impactsStringObj = [];
		impactsNameProperties.forEach(nameProperty => {
			impactsStringObj.push(selectorInputObj[nameProperty]);
		});
		return impactsStringObj;
	}

	showImpactInfo(target) {
		if (!target.className.includes('selectionWheel-back-btn')) {
			const targetObj = JSON.parse(target.getAttribute('impact'));
			const schemeProperties = Object.keys(this.infoScheme);
			schemeProperties.forEach(propertyName => {
				const liName = document.getElementById(propertyName + '_divName' + this.additionalTextToID);
				liName.textContent = this.infoScheme[propertyName];
				const liValue = document.getElementById(propertyName + '_divValue' + this.additionalTextToID);
				liValue.textContent = targetObj[propertyName];
			});
		}
	}

	clearImpactInfo() {
		const schemeProperties = Object.keys(this.infoScheme);
		schemeProperties.forEach(propertyName => {
			const liName = document.getElementById(propertyName + '_divName' + this.additionalTextToID);
			liName.textContent = '';
			const liValue = document.getElementById(propertyName + '_divValue' + this.additionalTextToID);
			liValue.textContent = '';
		});
	}

	nextTarget() {
		this.indexButton++;
		if (this.indexButton > this.buttonQuantity - 1) {
			this.indexButton = 0;
		}
		if (this.indexButton < this.buttonQuantity) {
			return this.buttons[this.indexButton];
		} else {
			return this.buttons[this.indexButton - 3];
		}
	}

	prevTarget() {
		this.indexButton--;
		if (this.indexButton < 0) {
			this.indexButton = this.buttonQuantity - 1;
		}
		if (this.indexButton < this.buttonQuantity) {
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
