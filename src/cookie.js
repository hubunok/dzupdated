/*//
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function getCookies() {
    return document.cookie.split('; ').reduce((prev,current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev
    }, {});
}

function addCookie(name, value) {
    let newRow = document.createElement('tr');
    let columnName = document.createElement('td');
    let columnValue = document.createElement('td');
    let columnDelete = document.createElement('td');
    let dltbtn = document.createElement('button');

    columnName.textContent = name;
    columnValue.textContent = value;
    dltbtn.textContent = 'X';

    newRow.appendChild(columnName);
    newRow.appendChild(columnValue);
    newRow.appendChild(columnDelete);
    columnDelete.appendChild(dltbtn);

    dltbtn.addEventListener('click', () => {
        listTable.removeChild(dltbtn.closest('tr'));
        document.cookie = `${name}=; expires=${new Date(0)}`;
    });

    listTable.appendChild(newRow);
}

function cookiesGame(search) {
    let cookies = getCookies();
   listTable.innerHTML = '';
    for (let i = 0, keys = Object.keys(cookies); i < keys.length; i++){
        if (isMatching(cookies[keys[i]], search) || isMatching(keys[i], search)) {
            addCookie(keys[i], cookies[keys[i]]);
        }
      }
}

filterNameInput.addEventListener('keyup', () => {
    cookiesGame(filterNameInput.value);
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;

    document.cookie = `${name}=${value}`;
    cookiesGame(filterNameInput.value);
});
