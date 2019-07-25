'use strict';

let todos = getSavedTodos();

//store dello user input
const filters = {
  searchText: '',
  hideCompleted: false,
  sortBy: 'byEdited',
};

//filtro richiamato al load della pagina -> si vedranno tutti i todos storati e il titolo dinamico
renderTodos(todos, filters);

//Evento in ascolto che filtra il testo inserito dall'utente con l'array todos
document.querySelector('#search-text').addEventListener('input', evt => {
  filters.searchText = evt.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#todo-form').addEventListener('submit', evt => {
  evt.preventDefault(); //annulla il comportamento di default del browser

  const timestamp = moment().valueOf();
  const id = uuidv4();

  todos.push({
    id: id,
    text: evt.target.elements.todoText.value.trim(),
    description: '',
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  saveTodos(todos);
  location.assign(`./edit.html#${id}`); //redirect

  evt.target.elements.todoText.value = ''; //svuota il valore dell'input dopo il submit
});

document.querySelector('#hide-completed').addEventListener('change', evt => {
  filters.hideCompleted = evt.target.checked;
  renderTodos(todos, filters);
});

document.querySelector('#filter-by').addEventListener('change', evt => {
  filters.sortBy = evt.target.value;
  renderTodos(todos, filters);
});

window.addEventListener('storage', evt => {
  if (evt.key === 'todos') {
    todos = JSON.parse(evt.newValue);
    renderTodos(todos, filters);
  }
});
