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
		const parent = document.getElementById('game-container');
		let buttonsContainer = document.createElement('div');
		buttonsContainer.id = 'buttonsContainer_id';
		buttonsContainer.className = 'buttonsContainer';
		const length = impactsNameProperties.length;
		this.buttonQuantity = length;
		for (let i = 0; i < length; i++) {
			const newButton = document.createElement('button');
			this.buttons.push(newButton);
			const impact = JSON.stringify(impacts[i]);
			newButton.setAttribute('impact', impact);
			newButton.className = 'skillButt';
			newButton.textContent = impactsNameProperties[i];
			buttonsContainer.appendChild(newButton);
		}
		const infoField = document.createElement('div');
		infoField.id = 'infofield_id';
		buttonsContainer.appendChild(infoField);
		parent.appendChild(buttonsContainer);
		return buttonsContainer;
	}

	deleteModal(elem) {
		const gameField = document.getElementById('game-container');
		gameField.removeChild(elem);
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
		}
		else {
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
		}
		else {
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