import _ from 'lodash';
import taskConfig from '../../taskConfig';
import generateAuditionTask from './tasks/audition';
import generateCodeTask from './tasks/code';
import generateSequenceTask from './tasks/sequence';
import generateTranslateTask from './tasks/translate';
import generateSpeechTask from './tasks/speech';

/*eslint no-case-declarations: 0*/

export default class UserTask {
	constructor(lvl) {
		this.type = this.checkTaskType(lvl);
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

	checkTaskType(lvl) {
		switch (true) {
		case (lvl >= 0 && lvl < 4):
			return 'code';
		case (lvl >= 4 && lvl < 8):
			return 'translate';
			//  disabled for presentation Now it not correct works if user have not micro
			// case (lvl >= 8 && lvl < 10):
			// 	return 'speech';
		case (lvl >= 10 && lvl < 13):
			return 'audition';
		case (lvl >= 13 && lvl < 16):
			return 'sequence';
		default:
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
		case 'speech':
			return taskConfig.speech[_.random(0, taskConfig.speech.length - 1)];
		default:
			return taskConfig.code[_.random(0, taskConfig.code.length - 1)];
		}
	}

	renderTask(task) {
		switch (this.type) {
		case 'code':
			generateCodeTask(task);
			break;
		case 'translate':
			generateTranslateTask(task);
			break;
		case 'sequence':
			generateSequenceTask(task);
			break;
		case 'audition':
			generateAuditionTask(task);
			break;
		case 'speech':
			generateSpeechTask(task);
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
				for (let i = 0; i < task[1].length; i++) {
					if (userAnswer.value.trim().toLowerCase() === task[1][i]) {
						return true;
					}
				}
				return false;
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
		case 'speech':
			userAnswer = document.querySelector('input[name=answer]');
			if (userAnswer !== null) {
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
