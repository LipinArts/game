export default {
	players: {
		names_1: ['Капитан', 'Паладин', 'Владыка', 'Воин', 'Мастер', 'Рыцарь', 'Магистр', 'Странник', 'Герой', 'Некромант', 'Чародей', 'Пиромант', 'Генерал', 'Командир', 'Лучник', 'Мечник', 'Вор', 'Разбойник', 'Тень', 'Хранитель'],
		names_2: ['Александра', 'Всеволод', 'Никита', 'Фома', 'Ирина', 'Михаил', 'Елена', 'Агап', 'Лукьян', 'Алексей ', 'Лилия', 'Кондрат', 'Артем', 'Наталья', 'Данила', 'Дарья', 'Андрей', 'Ева', 'Егор', 'Клара', 'Юнона', 'Виктор', 'Татьяна', 'Елизар', 'Дина', 'Вадим', 'Кирилл', 'Артур', 'Константин', 'Анна', 'Светлана', 'Максимильян', 'Максим', 'Марина', 'Яна', 'Владилен', 'Сергей', 'Наталия', 'Стела', 'Ангелина', 'Самуил', 'Диана', 'Степан', 'Евгения', 'Илья', 'Кондратий', 'Мирослав', 'Иван', 'Герман', 'Юрий', 'Евгений', 'Дмитрий', 'Мария', 'Агафья', 'Алиса', 'Игорь', 'Роза', 'Потап', 'Полина', 'Доминика', 'Григорий', 'Оксана', 'Валентина', 'Павел', 'Ксения', 'Анисья', 'Надежда', 'Антип', 'Ярослав', 'Руслан', 'Юлия', 'Варвара', 'Владимир', 'Нина', 'Алина', 'Анастасия'],
		adjectives: ['Умный', 'Красивый', 'Бесстрашный', 'Привлекательный', 'Непобедимый', 'Непоколебимый', 'Милый', 'Воинственный', 'Железный', 'Непробиваемый', 'Стойкий', 'Неуязвимый', 'Пушистый', 'Талантливый', 'Ловкий', 'Сообразительный', 'Смелый', 'Титановый', 'Пуленепробиваемый', 'Суперский', 'Мастерский', 'Лапушный', 'Мимимишный', 'Зайчиковый', 'Обалденный', 'Богоподобный', 'Искренний', 'Кайфовый'],
		hp: 100,
		unitSize: {
			width: 168,
			height: 130
		},
		sounds: {
			setUp: [
				{ notYet: 'src/audio/sounds/player/invoker/notyet.mp3', attack: 'src/audio/sounds/player/invoker/attack.mp3', pain: 'src/audio/sounds/player/invoker/pain.mp3', death: 'src/audio/sounds/player/invoker/death.mp3', failure: 'src/audio/sounds/player/invoker/failure.mp3' },
				{ notYet: 'src/audio/sounds/player/legion/notyet.mp3', attack: 'src/audio/sounds/player/legion/attack.mp3', pain: 'src/audio/sounds/player/legion/pain.mp3', death: 'src/audio/sounds/player/legion/death.mp3', failure: 'src/audio/sounds/player/legion/failure.mp3' },
				{ notYet: 'src/audio/sounds/player/cm/notyet.mp3', attack: 'src/audio/sounds/player/cm/attack.mp3', pain: 'src/audio/sounds/player/cm/pain.mp3', death: 'src/audio/sounds/player/cm/death.mp3', failure: 'src/audio/sounds/player/cm/failure.mp3' },
				{ notYet: 'src/audio/sounds/player/bara/notyet.mp3', attack: 'src/audio/sounds/player/bara/attack.mp3', pain: 'src/audio/sounds/player/bara/pain.mp3', death: 'src/audio/sounds/player/bara/death.mp3', failure: 'src/audio/sounds/player/bara/failure.mp3' }
			]
		},
		sprites: {
			head: {
				path: 'src/img/player/heads/heads.png',
				width: 168,
				height: 86,
				sX: [0, 168, 336, 504, 672, 840, 1008, 1176],
				sY: 0,
				dX: 0,
				dY: 0,
				rotation: 0
			},
			body: {
				path: 'src/img/player/bodies/bodies.png',
				width: 168,
				height: 103,
				sX: [0, 168, 336, 504, 672, 840],
				sY: 0,
				dX: 0,
				dY: 60,
				rotation: 0
			},
			hands_right: {
				path: 'src/img/player/hands/hands-right.png',
				width: 168,
				height: 130,
				sX: [0, 168, 336, 504, 672, 840],
				sY: 0,
				dX: 0,
				dY: 75,
				rotation: 0
			},
			hands_left: {
				path: 'src/img/player/hands/hands-left.png',
				width: 168,
				height: 130,
				sX: [0, 168, 336, 504, 672, 840],
				sY: 0,
				dX: 0,
				dY: 75,
				rotation: 0
			},
			legs_right: {
				path: 'src/img/player/legs/legs-right.png',
				width: 168,
				height: 112,
				sX: [0, 168, 336, 504, 672, 840],
				sY: 0,
				dX: 0,
				dY: 150,
				rotation: 0
			},
			legs_left: {
				path: 'src/img/player/legs/legs-left.png',
				width: 168,
				height: 112,
				sX: [0, 168, 336, 504, 672, 840],
				sY: 0,
				dX: 0,
				dY: 150,
				rotation: 0
			},
		}
	},
	monsters: {
		names_1: ['Шкурочафк', 'Могилогной', 'Адорыш', 'Адогной', 'Чернодемон', 'Могилочервь', 'Хмурорыш', 'Черночафк', 'Дуборыш', 'Злослон', 'Огнедемон', 'Хмурочервь', 'Демонотрон', 'Краснотрон', 'Хмурогной', 'Шкурокоп', 'Могилочерт', 'Могилохрум', 'Некрослон', 'Воздухомет', 'Землекол', 'Светорез', 'Дубинозавр', 'Светомонстр', 'Булавотерз', 'Ножетерз', 'Водозавр', 'Топоробур', 'Молотобур', 'Черепомаг', 'Астралокид', 'Светобур', 'Воздухорез', 'Копьебур', 'Экспокид', 'Астраломаг', 'Черепотык', 'Ножебур', 'Мечебур', 'Плотокол', 'Темнокол', 'Плотоед', 'Головолом', 'Булавотерз', 'Копьелом', 'Астралокид', 'Землемах', 'Темнобур', 'Молотозавр', 'Некродемон', 'Мегаужас', 'Шкуромерз', 'Некроцап', 'Рогокоп', 'Плотомаг', 'Костемонстр', 'Костелом', 'Экспокид', 'Темнорез', 'Астралобур', 'Плотокол', 'Топоротерз', 'Палицомаг', 'Костелом', 'Дубинотык', 'Пикомаг', 'Пикотерз', 'Огнекид', 'Мечелом', 'Палицомаг', 'Плотобур', 'Светотерз', 'Копьебур', 'Палицозавр', 'Водомонстр', 'Молотомах', 'Мечемаг', 'Пикомах', 'Молотомонстр', 'Палицолом', 'Копьетык', 'Костебур', 'Головотык', 'Темнолом', 'Демоноужас', 'Мегаед', 'Злослон', 'Могилодемон', 'Некротрон', 'Дуборыш', 'Шкуроцап', 'Смерточафк', 'Рогогной', 'Мегачервь', 'Рогозавр', 'Хмурослон', 'Огнецап', 'Злокоп', 'Роготрон', 'Адопуз', 'Хмуродемон', 'Бякокоп', 'Смертозавр', 'Рогохрум', 'Огнедемон', 'Адослон', 'Чернорыш', 'Адогной', 'Бякохрум', 'Демонохрум', 'Кровомерз', 'Дуботруп', 'Кроворыш', 'Грязетрон', 'Бякоужас', 'Кровоцап', 'Демонотрон', 'Адочерт', 'Кровослон', 'Бякохрум'],
		names_2: ['Движухаотик', 'Светохаос', 'Килотрон', 'Коксотрон', 'Вспыходрыг', 'Яркотрой', 'Неотрой', 'Криотрой', 'Гиперслон', 'Гексоглюк', 'Неотрон', 'Гипертаракан', 'Битотрон', 'Килотаракан', 'Психомуха', 'Трансвирус', 'Коксоноль', 'Цифрозомби', 'Роботаракан', 'Гамманоль', 'Бетасталкер', 'Гаммахаотик', 'Мегавирус', 'Робосталкер', 'Темноглюк', 'Яркотаракан', 'Технокрыл', 'Коксобаг', 'Робозомби', 'Килохаос', 'Трансмуха', 'Килокрыл', 'Диждикрыл', 'Роботрой', 'Рободрыг', 'Киломуха', 'Гексохаотик', 'Гаммаснег', 'Битокрыл', 'Терраслон', 'Коксослон', 'Террахаотик', 'Робослон', 'Психолёт', 'Цифроплыв', 'Альфазомби', 'Бетатаракан', 'Движудрыг', 'Гексоноль', 'Трансглюк', 'Терратрой', 'Гексослон', 'Роботаракан', 'Диждиглюк', 'Битовирус', 'Психотрой', 'Темнозомби', 'Рободрыг', 'Светохаос', 'Вспыхотрон', 'Светохаотик', 'Битотрой', 'Бетабаг', 'Ярконоль', 'Вспыхотрой', 'Рободрыг', 'Гамматрон', 'Светокрыл', 'Бетадрыг', 'Психоновик', 'Психовирус', 'Трансзомби', 'Движуснег', 'Трансвирус', 'Битодрыг', 'Темнохаотик', 'Дельтасталкер', 'Робобаг', 'Движуслон', 'Темнохаотик', 'Гаммадрыг', 'Криобаг', 'Движуновик', 'Бетановик', 'Психоснег', 'Неоплыв', 'Темноновик', 'Бетатрой', 'Гаммалёт', 'Вспыхомуха'],
		adjectives: ['Гыгышный', 'Аццкый', 'Пафассный', 'Гламурный', 'Нимецкая', 'Газенвагенскый', 'Пафассный', 'Миталлюгскый', 'Ржачный', 'Падонкаффский', 'Йадовитый', 'Пятибальный', 'Лольный', 'Имошный', 'Анимэшный', 'Албанский', 'Онглискый', 'Ипаццкый', 'Сапожный', 'Онглиский', 'Злобный', 'Сопливый', 'Ужасный', 'Мерзкий', 'Зеленый', 'Плановый', 'Фиолетовый', 'Укуренный', 'Косяковый', 'Оранжевый', 'Косячный', 'Aгрессивный', 'Aзартный', 'Aморальный', 'Безумный', 'Жадный', 'Железный', 'Злой', 'Занудный', 'Коварный', 'Ловкий', 'Наглый', 'Медлительный', 'Осторожный', 'Подозрительный', 'Сумашедший', 'Твердолобы', 'Тупой', 'Тресливый', 'Угрюмый', 'Холодный', 'Цельнометаллический', 'Юродивый', 'Мутный', 'Ловкий', 'Одноглазый', 'Быстрый', 'Пьяный', 'Смертоносный', 'Ловкий', 'Танцующий', 'Черный', 'Дерзкий', 'Бесшумный', 'Ирладский', 'Бешеный ', 'Меткий'],
		hp: 30,
		unitSize: {
			width: 168,
			height: 130
		},
		sounds: {
			setUp: [
				{ notYet: 'src/audio/sounds/monster/clock/notyet.mp3', attack: 'src/audio/sounds/monster/clock/attack.mp3', pain: 'src/audio/sounds/monster/clock/pain.mp3', death: 'src/audio/sounds/monster/clock/death.mp3', failure: 'src/audio/sounds/monster/clock/failure.mp3' },
				{ notYet: 'src/audio/sounds/monster/gyro/notyet.mp3', attack: 'src/audio/sounds/monster/gyro/attack.mp3', pain: 'src/audio/sounds/monster/gyro/pain.mp3', death: 'src/audio/sounds/monster/gyro/death.mp3', failure: 'src/audio/sounds/monster/gyro/failure.mp3' },
				{ notYet: 'src/audio/sounds/monster/tech/notyet.mp3', attack: 'src/audio/sounds/monster/tech/attack.mp3', pain: 'src/audio/sounds/monster/tech/pain.mp3', death: 'src/audio/sounds/monster/tech/death.mp3', failure: 'src/audio/sounds/monster/tech/failure.mp3' },
				{ notYet: 'src/audio/sounds/monster/timber/notyet.mp3', attack: 'src/audio/sounds/monster/timber/attack.mp3', pain: 'src/audio/sounds/monster/timber/pain.mp3', death: 'src/audio/sounds/monster/timber/death.mp3', failure: 'src/audio/sounds/monster/timber/failure.mp3' }
			]
		},
		sprites: {
			head: {
				path: 'src/img/monster/heads/heads.png',
				width: 168,
				height: 90,
				sX: [0, 168, 336, 504, 672],
				sY: 0,
				dX: 0,
				dY: 0,
				rotation: 0
			},
			body: {
				path: 'src/img/monster/bodies/bodies.png',
				width: 168,
				height: 103,
				sX: [0, 168, 336, 504, 672],
				sY: 0,
				dX: 0,
				dY: 80,
				rotation: 0
			},
			hands_right: {
				path: 'src/img/monster/hands/hands-right.png',
				width: 168,
				height: 140,
				sX: [0, 168, 336, 504, 672],
				sY: 0,
				dX: 0,
				dY: 105,
				rotation: 0
			},
			hands_left: {
				path: 'src/img/monster/hands/hands-left.png',
				width: 168,
				height: 140,
				sX: [0, 168, 336, 504, 672],
				sY: 0,
				dX: 0,
				dY: 105,
				rotation: 0
			},
			legs_right: {
				path: 'src/img/monster/legs/legs-right.png',
				width: 168,
				height: 115,
				sX: [0, 168, 336, 504, 672],
				sY: 0,
				dX: 0,
				dY: 165,
				rotation: 0
			},
			legs_left: {
				path: 'src/img/monster/legs/legs-left.png',
				width: 168,
				height: 115,
				sX: [0, 168, 336, 504, 672],
				sY: 0,
				dX: 0,
				dY: 165,
				rotation: 0
			},
		}
	},
};
