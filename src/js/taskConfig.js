export default {
	code: [
		['<pre>Верно ли, что <code>null == undefined</code>?</pre>', ['true', 'false'], 'true'],
		['<pre>Что выведет этот код?<br><code> let f = function g() { return 23; };<br> alert( typeof g() );</code></pre>', ['number', 'undefined', 'function', 'ошибка'], 'ошибка'],
		['<pre>Правда ли что <code>a == b</code>?<br><code> const a = [1, 2, 3];<br> const b = [1, 2, 3];</code></pre>', ['true', 'false'], 'false'],
		['<pre>Что выведет этот код?<br><code> alert( +"Infinity" );</code></pre>', ['Infinity', 'NaN', '0', 'ошибка'], 'Infinity'],
		['<pre>Что выведет этот код?<br><code> console.log(10..toString())</code></pre>', ['"10"', '10', 'ошибка'], '"10"'],
	],
	translate: [
		['to implement', ['выполнять', 'реализовать', 'осуществлять', 'реализовывать']],
		['layout', ['макет', 'компановка', 'разметка', 'раскладка']],
		['determinate', ['определенный', 'точно установленный', 'заданный']],
		['redundant', ['избыточный', 'лишний', 'чрезмерный', 'резервный']],
		['deployment', ['развертывание', 'размещение', 'внедрение', 'применение']]
	],
	sequence: [
		['function bind(func, context ) {', ' const bindArgs = [].slice.call(arguments, 2);', ' return function wrapper() {', '  const args = [].slice.call(arguments);', '  const unshiftArgs = bindArgs.concat(args);', '  return func.apply(context, unshiftArgs);', ' };', '}']
	],
	audition: [
		['undefined'],
		['development'],
		['feature'],
		['insertion'],
		['issue']
	]
};
