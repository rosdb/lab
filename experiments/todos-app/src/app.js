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

  const id = uuidv4();

  todos.push({
    id: id,
    text: evt.target.elements.todoText.value,
    description: '',
    completed: false
  });

  saveTodos(todos);
  location.assign(`./edit.html#${id}`); //redirect

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

window.addEventListener('storage', (evt) => {
  if (evt.key === 'todos') {
    todos = JSON.parse(evt.newValue);
    renderTodos(todos, filters);
  }
})

const date1 = new Date('Nov 10 1989');
const date2 = new Date('May 11 1953');
const timestamp1 = date1.getTime();
const timestamp2 = date2.getTime();

const print = function (data1, data2) {
  if (data1 > data2) {
    return `${date2.toString()}\n ${date1.toString()}`
  } else {
    return `${date1.toString()}\n ${date2.toString()}`
  }
}

console.log(print(timestamp1, timestamp2));


