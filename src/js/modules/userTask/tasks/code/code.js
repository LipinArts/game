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
