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

	title.textContent = 'Перевод слова';
	question.innerHTML = `Переведите с английского на русский слово:<code><b> ${task[0]}</b></code>`;

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
