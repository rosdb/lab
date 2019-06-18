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
  const todoEl = document.createElement('div');

  const checkboxEl = document.createElement('input');
  checkboxEl.setAttribute('type', 'checkbox');
  todoEl.appendChild(checkboxEl);

  //check sul title dei todos e setup
  const textEl = document.createElement('span');
  if (todo.text.length > 0) {
    textEl.textContent = todo.text;
  } else {
    textEl.textContent = 'Task senza nome'
  }
  todoEl.appendChild(textEl);

  //bottone delete
  const button = document.createElement('button');
  button.textContent = 'x';
  todoEl.appendChild(button);

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
  document.querySelector('#todo-list').appendChild(generateSummaryDOM(incompleteTodos));

  //crea nuovi elementi html per i todos risultato del filtro iniziale
  filteredTodos.forEach((todo) => {
    const todoEl = generateTodoDOM(todo);
    document.querySelector('#todo-list').appendChild(todoEl);
  });
}

//renderizza summary
const generateSummaryDOM = function (incompleteTodos) {
  const summaryTitle = document.createElement('h3');
  summaryTitle.textContent = `Hai ${incompleteTodos.length} attività incomplete`;
  return summaryTitle;
}
