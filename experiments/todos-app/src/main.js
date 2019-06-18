const todos = [{
  text: 'Fare la spesa',
  completed: true
}, {
  text: 'Comprare il vestito',
  completed: false
}, {
  text: 'Fare sport',
  completed: false
}, {
  text: 'Studiare',
  completed: true
}, {
  text: 'Fare pulizie',
  completed: true
}, {
  text: 'Pitturare Casa',
  completed: false
}, {
  text: 'Prendere il treno',
  completed: false
}]

//FILTRO

//store dello user input
const filters = {
  searchText: ''
}

const renderTodos = (todos, filters) => {
  //array risultato dei todos filtrati con il testo inserito nell'input e storato nella const filters
  const filteredTodos = todos.filter((todo) => {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  //array dei todos da completare e da utilizzare nel titolo dinamico
  const incompleteTodos = todos.filter((todo) => {
    return !todo.completed
  })

  //svuota l'elemento html in cui sono i todos
  document.querySelector('.todo-list').innerHTML = '';

  //titolo dinamico
  const newTitle = document.createElement('h3');
  newTitle.textContent = `Hai ${incompleteTodos.length} attività incomplete`;
  document.querySelector('.todo-list').appendChild(newTitle);

  //crea nuovi elementi html per i todos risultato del filtro iniziale
  filteredTodos.forEach((todo) => {
    const todoEl = document.createElement('p');
    todoEl.textContent = todo.text;
    document.querySelector('.todo-list').appendChild(todoEl);
  })
}

//filtro richiamato al load della pagina -> si vedranno tutti i todos storati e il titolo dinamico
renderTodos(todos, filters);


//Evento in ascolto che filtra il testo inserito dall'utente con l'array todos
document.querySelector('#search-text').addEventListener('input', (evt) => {
  filters.searchText = evt.target.value;
  renderTodos(todos, filters);
})


document.querySelector('#todo-form').addEventListener('submit', (evt) => {
  evt.preventDefault(); //annulla il comportamento di default del browser

  todos.push({
    text: evt.target.elements.todoText.value,
    completed: false
  });

  renderTodos(todos, filters);

  evt.target.elements.todoText.value = ''; //svuota il valore dell'input dopo il submit
})