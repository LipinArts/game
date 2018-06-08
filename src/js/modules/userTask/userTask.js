import _ from 'lodash';
import taskConfig from '../../taskConfig';
/*eslint no-case-declarations: 0*/

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
		modalOverlay.setAttribute('id', 'modal-overlay');
		const taskModal = document.createElement('div');
		taskModal.className = 'task-modal';
		modalOverlay.appendChild(taskModal);

		const title = document.createElement('h2');
		title.className = 'task-modal-title';
		taskModal.appendChild(title);

		const question = document.createElement('div');
		question.className = 'task-modal-question';
		taskModal.appendChild(question);

		const answer = document.createElement('div');
		answer.className = 'task-modal-answer';
		const answerTitle = document.createElement('p');
		answerTitle.className = 'task-modal-answer-title';
		answerTitle.textContent = 'Ваш ответ:';
		answer.appendChild(answerTitle);
		const answerVariantsList = document.createElement('ul');
		answerVariantsList.className = 'task-modal-anwer-variants';

		switch (this.type) {
		case 'code':
			title.textContent = 'Задача по JavaScript';
			question.innerHTML = task[0];

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
				answer.appendChild(answerVariantsList);
				taskModal.appendChild(answer);
			}

			break;
		case 'translate':
			title.textContent = 'Перевод слова';
			question.innerHTML = `Переведите с английского на русский слово: <code><b>${task[0]}</b></code>`;

			const answerVariantItem = document.createElement('li');
			const label = document.createElement('label');
			answerVariantItem.appendChild(label);
			const input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('name', 'answer');
			label.appendChild(input);
			answerVariantsList.appendChild(answerVariantItem);
			answer.appendChild(answerVariantsList);
			taskModal.appendChild(answer);


			break;
		case 'sequence':
			break;
		case 'audition':
			break;
		}

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
		let results;
		switch (this.type) {
		case 'code':
			userAnswer = document.querySelector('input[name=answer]:checked');
			if (userAnswer !== null) {
				if (userAnswer.value === task[2]) {
					results = true;
					console.log(results);
				} else {
					results = false;
					console.log(results);
				}
			}
			break;
		case 'translate':
			userAnswer = document.querySelector('input[name=answer]');
			if (userAnswer !== null) {
				for (let i = 0; i < task[1].length - 1; i++) {
					if (userAnswer.value.trim() === task[1][i]) {
						results = true;
						break;
					}
					results = false;
				}
				console.log(results);
			}
			break;
		case 'sequence':
			break;
		case 'audition':
			break;
		}

	}

	submitAnswer(task) {
		const modal = document.getElementById('modal-overlay');
		const submit = document.getElementById('task-answer');

		modal.addEventListener('click', (e) => {
			if (e.target === submit) {
				this.checkAnswer(task);
				// document.querySelector('.modal-overlay').remove();
			}
		});
		modal.addEventListener('keyup', (e) => {
			if (e.keyCode == 13) {
				{
					this.checkAnswer(task);
					// document.querySelector('.modal-overlay').remove();
				}
			}
		});

	}

}
