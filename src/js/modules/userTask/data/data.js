export default {
	code: [
		['<pre>Верно ли, что <code>null == undefined</code>?</pre>', ['true', 'false'], 'true'],
		['<pre>Что выведет этот код?<br><code> let f = function g() { return 23; };<br> alert( typeof g() );</code></pre>', ['number', 'undefined', 'function', 'ошибка'], 'ошибка'],
		['<pre>Правда ли что <code>a == b</code>?<br><code> const a = [1, 2, 3];<br> const b = [1, 2, 3];</code></pre>', ['true', 'false'], 'false'],
		['<pre>Что выведет этот код?<br><code> alert( +"Infinity" );</code></pre>', ['Infinity', 'NaN', '0', 'ошибка'], 'Infinity'],
		['<pre>Что выведет этот код?<br><code> console.log(10..toString())</code></pre>', ['"10"', '10', 'ошибка'], '"10"'],
		['<pre>Какое событие из этого списка не существует?</pre>', ['onmousescroll', 'onclick', 'onmouseover', 'onmousemove', 'onwheel', 'все существуют'], 'onmousescroll'],
		['<pre>Как получить HTML-содержимое DOM-элемента<code>elem ?</code></pre>', ['elem.html', 'elem.innerHTML', 'elem.content'], 'elem.innerHTML'],
		['<pre>Этот код ничего не выведет. Почему?<br><code>document.onclick = function(event) {<br>  alert(event.type);<br>};<br>document.body.dispatchEvent(new CustomEvent("click"));</code></pre>', ['из JavaScript нельзя генерировать встроенные события', 'обработчик через on-свойство не срабатывает для событий, сгенерированных из JavaScript', 'встроенное событие нужно генерировать иначе, конструктор CustomEvent надо заменить на другой', 'при генерации события не указано, что оно должно всплывать'], 'обработчик через on-свойство не срабатывает для событий, сгенерированных из JavaScript'],
		['<pre>Результат <code>elem.getBoundingClientRect()</code> содержит отрицательное значение <code>top: -10</code><br>Что это означает?</pre>', ['что верх элемента вылезает за верхнюю границу документа', 'что верх элемента вылезает за верхнюю границу окна', 'что содержимое элемента прокручено на 10px', 'ничего не означает, браузер чудит'], 'что содержимое элемента прокручено на 10px'],

	],
	translate: [
		['to implement', ['выполнять', 'реализовать', 'осуществлять', 'реализовывать']],
		['layout', ['макет', 'компановка', 'разметка', 'раскладка']],
		['determinate', ['определенный', 'точно установленный', 'заданный']],
		['redundant', ['избыточный', 'лишний', 'чрезмерный', 'резервный']],
		['deployment', ['развертывание', 'размещение', 'внедрение', 'применение', 'развёртывание']],
		['overflow', ['переполнение', 'перелив', 'переливание через край', 'разлив', ' наводнение', 'избыток']],
		['inheritance', ['наследование', 'унаследование', 'получение наследства', 'наследство', 'наследие']],
		['to retrieve', ['искать', 'находить', 'выборка', 'извлекать', 'вернуть', 'возвращать']],
		['perfomance', ['производительность', 'быстродействие', 'эффективность']],
		['to evolve', ['развиваться', 'развивать', 'эволюционировать', 'издавать запах']]
	],
	sequence: [
		['function bind(func, context ) {', ' const bindArgs = [].slice.call(arguments, 2);', ' return function wrapper() {', '  const args = [].slice.call(arguments);', '  const unshiftArgs = bindArgs.concat(args);', '  return func.apply(context, unshiftArgs);', ' };', '}'],
		['function createSecret(secret) {', '	let mySecret = secret;', '	return {', '		getSecret: () => {', '			return mySecret;', '		},', '		setSecret: (newSecret) => {', '			mySecret = newSecret;', '		}', '	}', '}'],
		['const sum = a => {', 'let results = a;', '	const func = b => {', '		results += b;', '		return func;', '	};', '	func.valueOf = () => results;', '	return func;', '}']
	],
	audition: [
		['undefined'],
		['development'],
		['feature'],
		['insertion'],
		['issue'],
		['proposal'],
		['instance'],
		['implement'],
		['contribute'],
		['precision'],
		['sentinel'],
		['frustration'],
		['regard'],
		['synopsis'],
		['leverage'],
		['curiosity'],
		['workbench'],
		['spread'],
		['particular'],
		['insight'],
	],
	speech: [
		['rehersal'],
		['announcement'],
		['advertising'],
		['inheritance'],
		['immediately'],
		['assignment'],
		['established'],
		['penetrate'],
		['regadless'],
		['throughout'],
		['execute'],
		['precise'],
		['instance'],
		['rendering'],
		['collaborate'],
		['estimate'],
		['property'],
		['curriculum'],
		['anticipation'],
		['implicit']
	]
};
