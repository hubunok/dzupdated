/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
 function loadTowns() {
     return new Promise((resolve, reject) => {
         var xhr = new XMLHttpRequest();
         xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
         xhr.send();
         xhr.responseType = 'json';
         xhr.addEventListener('load', ()=> {
             if (xhr.status >= 400) {
                 console.log('something went wrong');
                 reject();
             } else {
                 const obj = xhr.response;
                 obj.sort((a, b) => {
                     let textA = a.name.toUpperCase();
                     let textB = b.name.toUpperCase();
                     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                 });
                 resolve(obj);
             }
         });
     });
 }

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1)  return true;
    else  return false;
}


/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
var array = [];
loadTowns()
 .then (obj =>
   {for (const o of obj){
     array.push(o);
   }
   })
 .catch(() => console.log('wtf'));


console.log(array);
filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    let filtr = filterInput.value;

    filterResult.innerText = '';
    filterResult.innerHTML = '';
    if (filtr) {
     for (var i = 0; i < array.length; i++){
      if (isMatching(array[i].name, filtr)){
      const town = document.createElement('div');
      town.classList.add('town');
      town.textContent = array[i].name;
      filterResult.appendChild(town);}
}
}
else return;
});

export {
    loadTowns,
    isMatching
};
