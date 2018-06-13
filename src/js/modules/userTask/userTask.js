import _ from 'lodash';
import $ from 'jquery';
import 'jquery-ui-sortable-npm';
import taskConfig from '../../taskConfig';

/*eslint no-case-declarations: 0*/

export default class UserTask {
	constructor(type) {
		this.type = this.checkTaskType(type);
		this.generate();
		this.taskObject;
		return new Promise((resolve, reject) => {
			const that = this;
			const modal = document.getElementById('modal-overlay');
			const submit = document.getElementById('task-answer');

			function clickHandler(e) {
				if (e.target === submit) {
					const answer = that.checkAnswer(that.taskObject);

					if (answer !== undefined) {
						resolve(answer);
						document.querySelector('.modal-overlay').remove();
					}

				}
			}

			function keyupHandler(e) {
				if (e.keyCode == 13) {
					const answer = that.checkAnswer(that.taskObject);
					if (answer !== undefined) {
						resolve(answer);
						document.querySelector('.modal-overlay').remove();
					}
				}
			}

			modal.addEventListener('click', clickHandler);
			modal.addEventListener('keyup', keyupHandler);
		});
	}
	checkTaskType(type) {
		if (typeof type === 'string' && type === 'code' || type === 'translate' || type === 'sequence' || type === 'audition') {
			return type;
		} else {
			return 'code';
		}
	}

	generate() {
		const taskObject = this.generateTask();
		this.taskObject = taskObject;
		this.renderTask(taskObject);
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

	generateCodeTask(task) {
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

		const button = document.createElement('button');
		button.className = 'task-modal-btn';
		button.setAttribute('id', 'task-answer');
		button.setAttribute('type', 'submit');
		button.textContent = 'sumbit';
		taskModal.appendChild(button);
		document.getElementById('game-container').appendChild(modalOverlay);
	}

	generateTranslateTask(task) {
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

		const button = document.createElement('button');
		button.className = 'task-modal-btn';
		button.setAttribute('id', 'task-answer');
		button.setAttribute('type', 'submit');
		button.textContent = 'sumbit';
		taskModal.appendChild(button);
		document.getElementById('game-container').appendChild(modalOverlay);
	}

	generateSequenceTask(task) {
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

		title.textContent = 'Правильная последовательность';
		question.innerHTML = 'Расположите в правильной последовательности следующий код:';
		const taskShuffle = _.shuffle(task);
		for (let i = 0; i < task.length; i++) {
			const answerVariantItem = document.createElement('li');
			const pre = document.createElement('pre');
			const inputText = document.createElement('code');
			pre.appendChild(inputText);
			inputText.textContent = taskShuffle[i];
			answerVariantsList.classList.add('task-modal-answer-sequence');
			answerVariantItem.appendChild(pre);
			answerVariantsList.appendChild(answerVariantItem);
			answer.appendChild(answerVariantsList);
			taskModal.appendChild(answer);
		}

		const button = document.createElement('button');
		button.className = 'task-modal-btn';
		button.setAttribute('id', 'task-answer');
		button.setAttribute('type', 'submit');
		button.textContent = 'sumbit';
		taskModal.appendChild(button);
		document.getElementById('game-container').appendChild(modalOverlay);
		$('.task-modal-anwer-variants').sortable();
	}

	generateAuditionTask(task) {
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
		title.textContent = 'Аудирование';
		question.innerHTML = 'Ваша задача написать воспроизведенное слово. Нажмите на конопку, чтобы воспроизвести.';
		const btn = document.createElement('button');
		btn.className = 'btn';
		btn.textContent = 'Воспроизвести';

		const awaitVoices = new Promise(done =>
			window.speechSynthesis.onvoiceschanged = done);
		const speakTaskWord = () => {
			awaitVoices.then(() => {
				const synth = window.speechSynthesis;
				const speech = new SpeechSynthesisUtterance(task);
				let voices = [];
				voices = synth.getVoices();
				speech.voice = voices[8];
				speech.rate = 0.8;
				synth.speak(speech);
			});
		};

		btn.onclick = speakTaskWord;
		question.appendChild(btn);

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

		const button = document.createElement('button');
		button.className = 'task-modal-btn';
		button.setAttribute('id', 'task-answer');
		button.setAttribute('type', 'submit');
		button.textContent = 'sumbit';
		taskModal.appendChild(button);
		document.getElementById('game-container').appendChild(modalOverlay);
	}

	renderTask(task) {
		switch (this.type) {
		case 'code':
			this.generateCodeTask(task);
			break;
		case 'translate':
			this.generateTranslateTask(task);
			break;
		case 'sequence':
			this.generateSequenceTask(task);
			break;
		case 'audition':
			this.generateAuditionTask(task);
			break;
		}
	}

	checkAnswer(task) {
		let userAnswer;
		switch (this.type) {
		case 'code':
			userAnswer = document.querySelector('input[name=answer]:checked');
			if (userAnswer !== null) {
				if (userAnswer.value === task[2]) {
					return true;
				} else {
					return false;
				}
			}
			break;
		case 'translate':
			userAnswer = document.querySelector('input[name=answer]');
			if (userAnswer.value !== '') {
				for (let i = 0; i < task[1].length - 1; i++) {
					if (userAnswer.value.trim().toLowerCase() === task[1][i]) {
						return true;
					}
					return false;
				}
			}
			break;
		case 'sequence':
			userAnswer = document.querySelectorAll('.task-modal-anwer-variants')[0];
			let results = [];
			let taskAnswer = [];
			for (let i = 0; i < userAnswer.children.length; i++) {
				results.push(userAnswer.children[i].innerText.trim());
				taskAnswer.push(task[i].trim());
			}
			taskAnswer = taskAnswer.join('');
			results = results.join('');
			if (results === taskAnswer) {
				return true;
			} else {
				return false;
			}
		case 'audition':
			userAnswer = document.querySelector('input[name=answer]');
			if (userAnswer.value !== '') {
				if (userAnswer.value.trim().toLowerCase() === task[0]) {
					return true;
				} else {
					return false;
				}
			}
			break;
		}

	}

}
