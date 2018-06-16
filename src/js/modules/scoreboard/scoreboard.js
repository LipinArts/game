export default class Scoreboard {
	static createTableOfRecordsFromLocalStore(name_localStorage) {
		const records_list = document.createElement('div');
		records_list.setAttribute('id', 'records-table');
		records_list.clasName = 'records-table';
		const list = document.createElement('ol');
		const title = document.createElement('h2');
		list.appendChild(title);
		title.textContent = 'Scoreboard';
		const records = JSON.parse(localStorage.getItem(name_localStorage));
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
		const scoreboard = document.getElementById('records-table');
		btn.onclick = scoreboard.remove();
		list.appendChild(btn);
		records_list.appendChild(list);
		document.body.insertBefore(records_list);
	}

	static chkAndUpdateTop10LocalStorageRecords(name_localStorage, current_score, user_data) {
		if (!localStorage.getItem(name_localStorage)) {
			const emptyArray = new Array(10);
			const newRecords = emptyArray.fill('empty');
			newRecords[0] = { 'score': current_score, 'user_data': user_data };
			localStorage.setItem(name_localStorage, JSON.stringify(newRecords));
		} else {
			let records = JSON.parse(localStorage.getItem(name_localStorage));
			let newRecordObj = { 'score': current_score, 'user_data': user_data };
			for (let i = 0; i < 10; i++) {
				if (records[i] === 'empty') {
					records[i] = newRecordObj;
					localStorage.setItem(name_localStorage, JSON.stringify(records));
					break;
				} else {
					if (current_score > records[i].score) {
						let copyRightPartOfArr = records.slice(i, 9);
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
