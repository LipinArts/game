export default class Scoreboard {
	static createTableOfRecordsFromLocalStore(name_localStorage) {
		const records_list = document.createElement('div');
		records_list.setAttribute('id', 'records-table');
		records_list.className = 'records-table';
		const list = document.createElement('ol');
		const title = document.createElement('h2');
		list.appendChild(title);
		title.textContent = 'Scoreboard';
		let records = JSON.parse(localStorage.getItem(name_localStorage));
		if (records === null) {
			const quantityScoreRecords = 10;
			const emptyArray = new Array(quantityScoreRecords);
			const newRecords = emptyArray.fill('empty');
			localStorage.setItem(name_localStorage, JSON.stringify(newRecords));
		}
		records = JSON.parse(localStorage.getItem(name_localStorage));
		records.forEach(recordObj => {
			let listElem = document.createElement('li');
			if (recordObj === 'empty') listElem.textContent = 'empty';
			else {
				let scoreDiv = document.createElement('div');
				scoreDiv.setAttribute('class', 'record-score');
				scoreDiv.textContent = recordObj.score;
				if (recordObj.user_data.nickname === '') {
					scoreDiv.textContent = scoreDiv.textContent + ' unknown';
				} else {
					scoreDiv.textContent = scoreDiv.textContent + ' ' + recordObj.user_data.nickname;
				}
				listElem.appendChild(scoreDiv);
			}
			list.appendChild(listElem);
		});
		const btn = document.createElement('button');
		btn.textContent = 'close';

		function closeScoreTable() {
			const scoreboard = document.getElementById('records-table');
			scoreboard.remove();
		}
		btn.onclick = closeScoreTable;
		list.appendChild(btn);
		records_list.appendChild(list);
		const gameField = document.getElementById('game-container');
		document.body.insertBefore(records_list, gameField);
	}

	static chkAndUpdateTop10LocalStorageRecords(name_localStorage, current_score, user_data) {
		const quantityScoreRecords = 10;
		if (!localStorage.getItem(name_localStorage)) {
			const emptyArray = new Array(quantityScoreRecords);
			const newRecords = emptyArray.fill('empty');
			newRecords[0] = {
				'score': current_score,
				'user_data': user_data
			};
			localStorage.setItem(name_localStorage, JSON.stringify(newRecords));
		} else {
			let records = JSON.parse(localStorage.getItem(name_localStorage));
			let newRecordObj = {
				'score': current_score,
				'user_data': user_data
			};
			for (let i = 0; i < quantityScoreRecords; i++) {
				if (records[i] === 'empty') {
					records[i] = newRecordObj;
					localStorage.setItem(name_localStorage, JSON.stringify(records));
					break;
				} else {
					if (current_score > records[i].score) {
						let copyRightPartOfArr = records.slice(i, quantityScoreRecords - 1);
						let copyLeftPartOfArr = records.slice(0, i);
						copyLeftPartOfArr.push(newRecordObj);
						records = copyLeftPartOfArr.concat(copyRightPartOfArr);
						localStorage.setItem(name_localStorage, JSON.stringify(records));
						break;
					}
				}
			}
		}
	}


}
