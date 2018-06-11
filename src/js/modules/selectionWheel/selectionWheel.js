import _ from 'lodash';
export default class SelectionWheel {
	constructor(obj) {
		this.buttons = [];
		this.indexButton = -1;

		return new Promise((resolve) => {
			const newModal = this.createModal(obj);
			const gameField = document.getElementById('game-container');
			const that = this;

			function clickHandler(event) {
				let target = event.target;
				if (event.target.className === 'skillButt') {
					gameField.removeEventListener('click', clickHandler, false);
					gameField.removeEventListener('mouseover', mouseoverHandler, false);
					gameField.removeEventListener('mouseout', mouseoutHandler, false);
					gameField.removeEventListener('focus', onfocusHandler, true);
					window.removeEventListener('keyup', keyup, false);
					that.deleteModal(newModal);
					resolve(that.getAbility(target));
				}
			}

			function mouseoverHandler(event) {
				let target = event.target;
				if (event.target.className === 'skillButt') {
					that.showImpactInfo(target);
				}
			}

			function mouseoutHandler(event) {
				if (event.target.className === 'skillButt') {
					that.clearImpactInfo();
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
					that.focus_next(document.getElementById('button_next_tip'));
					break;
				case 'left':
					that.focus_prev(document.getElementById('button_prev_tip'));
					break;
				case 'esc':
					that.close_component();
					break;
				}
			}

			function onfocusHandler(event) {
				let target = event.target;
				that.showImpactInfo(target);
			}

			const modalCloseBtn = document.getElementById('selection-back-btn');
			modalCloseBtn.addEventListener('click', () => {
				gameField.classList.remove('blur');
				that.deleteModal(newModal);
			});

			gameField.addEventListener('click', clickHandler, false);
			gameField.addEventListener('mouseover', mouseoverHandler, false);
			gameField.addEventListener('mouseout', mouseoutHandler, false);
			gameField.addEventListener('focus', onfocusHandler, true);
			window.addEventListener('keyup', keyup, false);
		});
	}

	createModal(obj) {
		const impactsNameProperties = this.getAllImpactsCollection(obj);
		const impacts = [];
		impactsNameProperties.forEach(nameProperty => {
			impacts.push(obj[nameProperty]);
		});

		const buttonsContainer = document.createElement('div');
		buttonsContainer.className = 'modal-overlay';
		buttonsContainer.classList.add('buttonsContainer');
		buttonsContainer.id = 'buttonsContainer_id';
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
		const img1 = document.createElement('img');
		img1.setAttribute('src', 'src/img/selectionWheel/rocket.png');
		img1.className = 'selection-img';
		modalBg.appendChild(img1);
		const castsWrap = document.createElement('div');
		castsWrap.className = 'selection-casts-wrap';
		modalBg.appendChild(castsWrap);

		const length = impactsNameProperties.length;
		this.buttonQuantity = length;

		for (let i = 0; i < length; i++) {
			const newButton = document.createElement('button');
			this.buttons.push(newButton);
			const impact = JSON.stringify(impacts[i]);
			newButton.setAttribute('impact', impact);
			newButton.className = 'skillButt';
			newButton.classList.add('selection-btn');
			newButton.classList.add('selection-cast-icon');
			const icon_path = JSON.parse(impact).icon_path;
			newButton.style.backgroundImage = `url(${icon_path})`;
			castsWrap.appendChild(newButton);
		}

		const infoField = document.createElement('div');
		infoField.id = 'infofield_id';
		infoField.className = 'selectionWheel-cast-info';
		const ul = document.createElement('ul');
		infoField.appendChild(ul);


		modalBg.appendChild(infoField);
		const btn = document.createElement('button');
		btn.className = 'selection-btn selectionWheel-back-btn';
		btn.setAttribute('id', 'selection-back-btn');
		btn.classList.add('selectionWheel-back-btn');
		modalBg.appendChild(btn);


		document.body.appendChild(buttonsContainer);
		document.getElementById('game-container').classList.add('blur');
		return buttonsContainer;
	}

	deleteModal(elem) {
		elem.remove();
	}

	getAbility(target) {
		return target.getAttribute('impact');
	}

	getAllImpactsCollection(obj) {
		return Object.keys(obj);
	}

	showImpactInfo(target) {
		const infofield = document.getElementById('infofield_id');
		infofield.textContent = target.getAttribute('impact');
	}

	clearImpactInfo() {
		const infofield = document.getElementById('infofield_id');
		infofield.textContent = '';
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

}
