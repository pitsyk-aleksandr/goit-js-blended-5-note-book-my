/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

// Імпорт посилань сторінки
import refs from './js/refs';

// Імпорт функцій перемикання кольорової теми
import { setColorTheme } from './js/theme-switcher';

// Імпорт функцій для роботи з LocalStorage
import {
  getThemeLS,
  setThemeLS,
  getTasksLS,
  setTasksLS,
  getLastIdLS,
  setLastIdLS,
} from './js/local-storage-api';

// Імпорт функцій для створення розмітки
import { markupTaskList } from './js/markup-tasks';

// Імпорт функцій для роботи з DOM (додавання, видалення елементів)
import { renderAllTaskList } from './js/render-tasks';

// Імпорт функцій для для управління задачами
import { addTask, removeTask } from './js/tasks';

// ====================================================================
// Встановлюємо кольорову тему
// --------------------------------------------------------------------
// Визначення поточної теми з LocalStorage
let currentTheme = getThemeLS();
// Встановлення кольорів згідно поточної теми
setColorTheme(currentTheme);
// ====================================================================

// ====================================================================
// Формуємо список задач
// --------------------------------------------------------------------
// Витягування з LocalStorage масиву поточних задач (ключ - 'tasks')
let tasks = getTasksLS();
// Створюємо розмітку
const markup = markupTaskList(tasks);
// Рендеримо розмітку
renderAllTaskList(markup);
// ====================================================================

// Слухач кнопки перемикання кольорової теми
refs.btnThemeToggle.addEventListener('click', onThemeToggle);

// Слухач події 'submit' на формі вводу нової задачі
refs.taskForm.addEventListener('submit', onFormSubmit);

// Слухач події 'click' на списку задач (вираховуючи кнопки Delete)
refs.taskList.addEventListener('click', onTaskList);

// ====================================================================
// Функція-обробник події 'submit' на формі вводу нової задачі
// --------------------------------------------------------------------
function onFormSubmit(event) {
  // Відміна події за замовчуванням
  event.preventDefault();

  let confirm = window.confirm(`Add task ?`);

  // Отримуємо дані з форми та прибираємо можливі наружні пробіли
  let name = refs.taskName.value.trim();
  let description = refs.taskDescription.value.trim();
  // Встановлюємо дані з форми - без наружних пробілів
  refs.taskName.value = name;
  refs.taskDescription.value = description;

  // Перевіряємо повноту даних
  if (name === '') {
    console.log(`Input name task !`);
    return;
  }
  if (description === '') {
    console.log(`Input description task !`);
    return;
  }

  // Витягування з LocalStorage масиву поточних задач (ключ - 'tasks')
  let tasks = getTasksLS();
  // Отримання з LocalStorage номеру останньої задачі (ключ - 'lastId')
  let lastId = getLastIdLS();
  // Унікальний номер нової задачі
  let newId = lastId + 1;
  // Додаємо задачу в список задач - отримуємо масив з включеною новою задачею
  tasks = addTask(newId, name, description, tasks);
  // Запис в LocalStorage масиву поточних задач (ключ - 'tasks')
  setTasksLS(tasks);
  // Запис в LocalStorage номеру останньої задачі (ключ - 'lastId')
  setLastIdLS(newId);

  // Створюємо розмітку
  const markup = markupTaskList(tasks);

  // Рендеримо розмітку
  renderAllTaskList(markup);

  // Перезагрузка форми
  refs.taskForm.reset();
}
// ====================================================================

// ====================================================================
// Функція-обробник кнопки перемикання кольорової теми
// color = 'theme-dark' / 'theme-light';
// --------------------------------------------------------------------
function onThemeToggle(event) {
  // Переключаємо поточну тему кольорів
  if (currentTheme === 'theme-dark') {
    currentTheme = 'theme-light';
  } else {
    currentTheme = 'theme-dark';
  }
  // Встановлення кольорів згідно поточної теми
  setColorTheme(currentTheme);
  // Запис поточної кольорової теми в LocalStorage
  setThemeLS(currentTheme);
}
// ====================================================================

// ====================================================================
// Функція-обробник кнопки Delete на задачі
// --------------------------------------------------------------------
function onTaskList(event) {
  // Перевіряємо, що клик був на кнопці
  if (event.target.nodeName !== 'BUTTON') {
    // Якщо клик був не на кнопці, то виходимо
    return;
  }

  let confirm = window.confirm(`Delete task ?`);

  // Витягування з LocalStorage масиву поточних задач (ключ - 'tasks')
  let tasks = getTasksLS();

  // Шукаємо номер видаляємої задачі на батьківському елементі <li> та переводимо в число
  let id = Number(event.target.closest('li').dataset.task);

  // Видаляємо задачу з масиву - отримуємо масив без видаленої задачі
  tasks = removeTask(id, tasks);

  // Запис в LocalStorage масиву поточних задач (ключ - 'tasks')
  setTasksLS(tasks);

  // Створюємо розмітку
  const markup = markupTaskList(tasks);

  // Рендеримо розмітку
  renderAllTaskList(markup);
}
// ====================================================================
