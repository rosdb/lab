'use strict';

// eslint-disable-next-line no-unused-vars
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (err) {
    return [];
  }

};


const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};



const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//cambia stato completed
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};


const generateTodoDOM = todo => {
  const todoEl = document.createElement('div');

  const checkboxEl = document.createElement('input');
  checkboxEl.setAttribute('type', 'checkbox');
  checkboxEl.checked = todo.completed;
  todoEl.appendChild(checkboxEl);
  checkboxEl.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });


  const textEl = document.createElement('a');
  textEl.setAttribute('href', `./edit.html#${todo.id}`);
  if (todo.text.length > 0) {
    textEl.textContent = todo.text;
  } else {
    textEl.textContent = 'Task senza nome';
  }
  todoEl.appendChild(textEl);


  const button = document.createElement('button');
  button.textContent = 'x';
  todoEl.appendChild(button);
  button.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};


const sortTodos = (todos, sortBy) => {
  if (sortBy === 'byEdited') {
    return todos.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return todos.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'alphabetical') {
    return todos.sort((a, b) => {
      if (a.text.toLowerCase() > b.text.toLowerCase()) {
        return -1;
      } else if (a.text.toLowerCase() < b.text.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return todos;
  }
};


const renderTodos = (todos, filters) => {
  const elements = sortTodos(todos, filters.sortBy);

  let filteredTodos = elements.filter(todo => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));

  //array filtrato che nasconde i todo completati
  filteredTodos = filteredTodos.filter(todo => {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  //array dei todos da completare e da utilizzare nel titolo dinamico
  const incompleteTodos = todos.filter(todo => !todo.completed);


  //svuota l'elemento html in cui sono i todos
  document.querySelector('#todo-list').innerHTML = '';

  //titolo dinamico
  document.querySelector('#todo-list').appendChild(generateSummaryDOM(incompleteTodos));

  //crea nuovi elementi html per i todos risultato del filtro iniziale
  filteredTodos.forEach(todo => {
    const todoEl = generateTodoDOM(todo);
    document.querySelector('#todo-list').appendChild(todoEl);
  });
};

//renderizza summary
const generateSummaryDOM = function (incompleteTodos) {
  const summaryTitle = document.createElement('h3');
  summaryTitle.textContent = `Hai ${incompleteTodos.length} attività incomplete`;
  return summaryTitle;
};


// eslint-disable-next-line no-unused-vars
const generateLastEdited = function (timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`;
};
