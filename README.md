# The Game project

Using webpack 4 to bundle all .js files into one file. Compiles new ES features with babel and its transformation runtime plugin.

### Version

1.0.0

## Install Dependencies

```bash
npm i
```

## Build

```bash
npm run build
```

## Run Dev Server

```bash
npm run start
```

### основные фичи функциональность:
1) Этот проект делался как можно гибче и разбивался на множество независимых модулей, которым всё равно кто их вызывает, главное чтобы им давали нужные входные данные. Поэтому проект максимально гибок и масштабируем.
2)Он создан так, чтобы можно было максимально легко заполнять его контентом.
Хотите другой спрайт у  каста, просто вставьте спрайт в папку img/impact/name_cast/sprites И пропишите размеры и координаты свидгов. Всё оно будет работать. Кстати мы ещё успели подключить спрайты хилла,
3) Хотите чтобы у каста была другая кастомная анимация, чтобы он по спирали летел к противнику? Просто создайте отдельный файл-класс, в котором вы будите менять через сеттаймаут координаты входного объекта и подключите этот тип анимации к каким вы желаете кастам через AnimationManager, и он используя свои спрайты будет летать как прописали.
4) Модуль SelectionWheel это по сути визуалиция попертей входного объекта, с последующим ретурном выбранного проперти объекта. В планах даже есть возможность углубляться в эти свойства пока не достигнешь заданного уровня или последнего. При этом можно кастомизировать что именно будет выдаваться в окне инфо при достижении заданных свойств, и какие из этих свойств будут выводится(перечисленные), а какие нет. Именно это мы и продемонстрировали использовав этот модуль не только для выбора кастов, но и игрового меню.
5)Ну и я очень хочу верить, что мой код получился достаточно чистым, лаконичным и главное понятным.
Т.е. я как координатор и главный конструктор коней в вакууме поставил нам задачу, не просто выполнить ТЗ, а сделать это красиво и чисто.
6)Скореборд он не только рисует таблицу рекордов, но ещё и сравнивает текущий результат с уже существующими и при необходимости вставляет его в нужное место.
7)AI, он выбирает максимально лучший ход по след принципу, снаала он перебирает всех врагов и все свои абилки, и если он может убить кого-то из юнитов игрока, то пытается убить того у кого больше ХП, потом выбирает из своих абилок ту, которая наиболее меньшего левела(типа дешевле). Если же он не может никого убить то он в том же цикле перебора одновременно выбиралтакую комбинацию таргета и своей абилки, чтобы просадить юнит игрока до мин хп, потом он перебирает свои абилки лечения и возвращает таргет союзника котого он может похилить на максимальное колличество % и потом сравнивает ход где он может нанести макс урон игроку с тем где он может похилить союзника и выбирает лучщий из них.
8)Конфиги, сделаны так, что можно легко и непринуждённо менять захардкодженные величины, как то формулы кастов, то где юниты расположены, их ХП, спрайты и всё прочее что нужно для кастомизации и балланса гемлея.
9)FightUnit это отдельная суперсущность в которую входят другие сущности, например как его нарандомленные абилки, каждая из которых это отдельный объект со своими спрайтами, звуками.
10)Каждая деталь FighUnit это отдельная рука, нога, голова, тело, которое можно как угодно ворочать и смещатть позиции или даже заменять спрайты, что позволяет делать очень гибкую анимацию юнитов. Всё что нужно это просто менять в файле анимайции их position.x position.y  и rotation
11)Архитектура построена так, что крайне легко в главном игровом модуле Fight вызывать анимацию или звук по тому или иному игровому ивенту, например хотите, чтобы юнит сделал анимацию атаки? unit.animation.attack.start(), хотите чтобы он озвучит это? unit.sounds.attack.play().
12)Звуки юнитов также рандомятся случайно, т.е. есть сетапы звуков 2 мужских 2 женских для игрока и 4 для роботов. При генерации юнита присваивается случайный из них.