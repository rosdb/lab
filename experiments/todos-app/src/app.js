let todos = getSavedTodos();

//store dello user input
const filters = {
  searchText: '',
  hideCompleted: false
}

//filtro richiamato al load della pagina -> si vedranno tutti i todos storati e il titolo dinamico
renderTodos(todos, filters);


//Evento in ascolto che filtra il testo inserito dall'utente con l'array todos
document.querySelector('#search-text').addEventListener('input', (evt) => {
  filters.searchText = evt.target.value;
  renderTodos(todos, filters);
});


document.querySelector('#todo-form').addEventListener('submit', (evt) => {
  evt.preventDefault(); //annulla il comportamento di default del browser

  todos.push({
    text: evt.target.elements.todoText.value,
    completed: false
  });

  saveTodos(todos);

  renderTodos(todos, filters);

  evt.target.elements.todoText.value = ''; //svuota il valore dell'input dopo il submit
});

//Evento che nasconde i todos completati
document.querySelector('#hide-completed').addEventListener('change', (evt) => {
  filters.hideCompleted = evt.target.checked;
  renderTodos(todos, filters);
});

document.querySelector('#filter-by').addEventListener('change', (evt) => {
  console.log(evt.target.value);
})
