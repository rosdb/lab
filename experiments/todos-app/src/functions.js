//check sui dati già presenti nel local storage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem('todos');

  if (todosJSON !== null) {
    return JSON.parse(todosJSON)
  } else {
    return []
  }
}

//salva i todos nel local storage
const saveTodos = function () {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//crea todo nel DOM
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement('p');

  //check sulla chiave text
  if (todo.text.length > 0) {
    todoEl.textContent = todo.text;
  } else {
    todoEl.textContent = 'Task senza nome'
  }

  return todoEl;
}


//renderizza todo
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
    const todoEl = generateTodoDOM(todo);
    document.querySelector('#todo-list').appendChild(todoEl);
  });
}
