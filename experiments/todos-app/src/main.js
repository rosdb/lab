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
  text: 'Pittare Casa',
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

//funzione che filtra l'array todos con il testo inserito nell'input e storato nella const filters
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  //svuota l'elemento html in cui sono i todos
  document.querySelector('.todo-list').innerHTML = '';

  //crea nuovi elementi html per i todos risultato del filtro
  filteredTodos.forEach((todo) => {
    const todoEl = document.createElement('p');
    todoEl.textContent = todo.text;
    document.querySelector('.todo-list').appendChild(todoEl);
  })
}

//filtro richiamato al load della pagina -> si vedranno tutti i todos storati
renderTodos(todos, filters);

//Filtro dei todos da completare e da utilizzare nel titolo dinamico
const incompleteTodos = todos.filter((todo) => {
  return !todo.completed
})

//Titolo dinamico
const newTitle = document.createElement('h3');
newTitle.textContent = `Hai ${incompleteTodos.length} attività incomplete`;
document.querySelector('body').appendChild(newTitle);


//Evento button add
document.querySelector('button#add').addEventListener('click', (evt) => {
  const newTodo = document.createElement('p');
  const inputText = document.querySelector('#search-text');
  newTodo.textContent = 'New todo';
  document.querySelector('.todo-list').appendChild(newTodo);
})

//Evento button delete
document.querySelector('button#delete').addEventListener('click', (evt) => {
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((paragraph) => {
    paragraph.remove();
  })
})

//Evento in ascolto che filtra il testo inserito dall'utente con l'array todos
document.querySelector('#search-text').addEventListener('input', (evt) => {
  filters.searchText = evt.target.value;
  renderTodos(todos, filters);
})
