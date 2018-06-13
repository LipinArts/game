import $ from 'jquery';
import 'jquery-ui-sortable-npm';
export default

function generate(task) {
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
