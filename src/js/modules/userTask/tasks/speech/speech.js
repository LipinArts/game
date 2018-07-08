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
	taskModal.appendChild(answer);
	title.textContent = 'Произношение';
	question.innerHTML = `Ваша задача правильно произнести слово:<code><b> ${task[0]}</b></code><br> Нажмите на конопку "Произнести", зетем произнесите заданное слово.<br> Нажмите на кнопку <code><b>SUBMIT</b></code>, чтобы подтвердить ответ.`;
	const btn = document.createElement('button');
	btn.className = 'btn';
	btn.textContent = 'Произнести';

	const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
	const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

	function testSpeech() {
		btn.disabled = true;
		btn.textContent = 'Запись';
		const phrase = task[0];

		const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';
		const recognition = new SpeechRecognition();
		const speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString(grammar, 1);
		recognition.grammars = speechRecognitionList;
		recognition.lang = 'en-US';
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.start();

		recognition.onresult = function (event) {
			let speechResult = event.results[0][0].transcript;
			const input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('name', 'answer');
			input.setAttribute('hidden', '');
			input.value = speechResult;
			answer.appendChild(input);
		};

		recognition.onspeechend = function () {
			recognition.stop();
			btn.disabled = false;
			btn.textContent = 'Произнести';
		};

		recognition.onerror = function (event) {
			btn.disabled = false;
			btn.textContent = 'Произнести снова';
			console.log(event.error);
		};
	}
	btn.addEventListener('click', testSpeech);
	question.appendChild(btn);


	const button = document.createElement('button');
	button.className = 'task-modal-btn';
	button.setAttribute('id', 'task-answer');
	button.setAttribute('type', 'submit');
	button.textContent = 'sumbit';
	taskModal.appendChild(button);
	document.getElementById('game-container').appendChild(modalOverlay);
}
