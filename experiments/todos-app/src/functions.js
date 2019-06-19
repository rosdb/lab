//check sui dati già presenti nel local storage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem('todos');

  if (todosJSON !== null) {
    return JSON.parse(todosJSON)
  } else {
    return []
  }
}

//prende la data in quel momento
const getTime = function () {
  const date = moment().fromNow();
  return date.toString();
}

//salva i todos nel local storage
const saveTodos = function () {
  localStorage.setItem('todos', JSON.stringify(todos));
}


//rimuove i todos
const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  })
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
}

//cambia stato completed
const toggleTodo = function (id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  })
  if (todo != undefined) {
    todo.completed = !todo.completed;
  }
}

//crea todo nel DOM
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement('div');

  const checkboxEl = document.createElement('input');
  checkboxEl.setAttribute('type', 'checkbox');
  checkboxEl.checked = todo.completed;
  todoEl.appendChild(checkboxEl);
  checkboxEl.addEventListener('change', (evt) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  //check sul title dei todos e setup
  const textEl = document.createElement('a');
  textEl.setAttribute('href', `./edit.html#${todo.id}`);
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
  button.addEventListener('click', (evt) => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  return todoEl;
}

//ordina i todo in base all'ultima modifica
const sortTodos = function (todos, sortBy) {
  if (sortBy === 'byEdited') {
    return todos.sort(function (a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return todos.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    }
  } else if (sortBy === 'alphabetical') {
    return todos.sort(function (a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    }
  } else {
    return todos;
  }
}

//renderizza todo
const renderTodos = (todos, filters) => {
  todos = sortTodos(todos, filters.sortBy);
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

