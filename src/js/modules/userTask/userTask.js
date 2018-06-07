import _ from 'lodash';
import taskConfig from '../../taskConfig';
import Popper from 'popper.js';

export default class UserTask {
	constructor(type = 'code') {
		this.type = type;
		this.impact = {};
		this.generate();
	}

	generate() {
		const task = this.generateTask();
		this.renderTask(task);
		this.submitAnswer(task);

	}

	generateTask() {
		switch (this.type) {
		case 'code':
			return taskConfig.code[_.random(0, taskConfig.code.length - 1)];
		case 'translate':
			return taskConfig.translate[_.random(0, taskConfig.translate.length - 1)];
		case 'sequence':
			return taskConfig.sequence[_.random(0, taskConfig.sequence.length - 1)];
		case 'audition':
			return taskConfig.audition[_.random(0, taskConfig.audition.length - 1)];
		default:
			return taskConfig.code[_.random(0, taskConfig.code.length - 1)];
		}
	}

	renderTask(task) {
		const modalOverlay = document.createElement('div');
		modalOverlay.className = 'modal-overlay';
		const taskModal = document.createElement('div');
		taskModal.className = 'task-modal';
		modalOverlay.appendChild(taskModal);

		const title = document.createElement('h2');
		title.className = 'task-modal-title';
		taskModal.appendChild(title);
		title.textContent = this.type;


		const question = document.createElement('div');
		question.className = 'task-modal-question';
		taskModal.appendChild(question);
		question.innerHTML = task[0];

		const answer = document.createElement('div');
		answer.className = 'task-modal-answer';
		const answerVariantsList = document.createElement('ul');
		answerVariantsList.className = 'task-modal-anwer-variants';

		for (let i = 0; i < task[1].length; i++) {
			const answerVariantItem = document.createElement('li');
			const label = document.createElement('label');
			answerVariantItem.appendChild(label);
			const input = document.createElement('input');
			input.setAttribute('type', 'radio');
			input.setAttribute('name', 'answer');
			input.setAttribute('value', task[1][i]);
			label.appendChild(input);
			const inputText = document.createElement('code');
			inputText.textContent = task[1][i];
			label.appendChild(inputText);
			answerVariantsList.appendChild(answerVariantItem);
		}

		answer.appendChild(answerVariantsList);
		taskModal.appendChild(answer);

		const button = document.createElement('button');
		button.className = 'task-modal-btn';
		button.setAttribute('id', 'task-answer');
		button.setAttribute('type', 'submit');
		button.textContent = 'sumbit';
		taskModal.appendChild(button);

		document.body.appendChild(modalOverlay);
	}
	checkAnswer(task) {
		let userAnswer;

		switch (this.type) {
		case 'code':
			userAnswer = document.querySelector('input[name=answer]:checked');
			if (userAnswer !== null) {
				if (userAnswer.value === task[2]) {
					console.log(true);
				} else {
					console.log(false);
				}
			}
			break;
		case 'translate':
			break;
		case 'sequence':
			break;
		case 'audition':
			break;
		}

	}

	submitAnswer(task) {
		const submit = document.getElementById('task-answer');
		submit.addEventListener('click', () => {
			this.checkAnswer(task);
		});

	}


}
