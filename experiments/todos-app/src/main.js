let todos = []

//FILTRO

//store dello user input
const filters = {
  searchText: '',
  hideCompleted: false
}


//check sui dati già presenti nel local storage
const todosJSON = localStorage.getItem('todos');

if (todosJSON !== null) {
  todos = JSON.parse(todosJSON)
}


const renderTodos = (todos, filters) => {
  //array risultato dei todos filtrati con il testo inserito nell'input e storato nella const filters
  let filteredTodos = todos.filter((todo) => {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  });

  //array filtrato che nasconde i todo completati
  filteredTodos = filteredTodos.filter((todo) => {
    if (filters.hideCompleted) {
      return !todo.completed
    } else {
      return true
    }
  })

  //array dei todos da completare e da utilizzare nel titolo dinamico
  const incompleteTodos = todos.filter((todo) => {
    return !todo.completed
  });


  //svuota l'elemento html in cui sono i todos
  document.querySelector('#todo-list').innerHTML = '';

  //titolo dinamico
  const newTitle = document.createElement('h3');
  newTitle.textContent = `Hai ${incompleteTodos.length} attività incomplete`;
  document.querySelector('#todo-list').appendChild(newTitle);

  //crea nuovi elementi html per i todos risultato del filtro iniziale
  filteredTodos.forEach((todo) => {
    const todoEl = document.createElement('p');

    //check sulla chiave text
    if (todo.text.length > 0) {
      todoEl.textContent = todo.text;
    } else {
      todoEl.textContent = 'Task senza nome'
    }

    document.querySelector('#todo-list').appendChild(todoEl);
  });
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

  localStorage.setItem('todos', JSON.stringify(todos)); //salva nel local storage

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
