// refs.js, у якому експортується об'єкт з усіма DOM-елементами (посиланнями).

export default {
  btnThemeToggle: document.querySelector('#themeToggle'),
  taskList: document.querySelector('#task-list'),
  taskForm: document.querySelector('#task-form'),
  taskName: document.querySelector('[name="taskName"]'),
  taskDescription: document.querySelector('[name="taskDescription"]'),
};
