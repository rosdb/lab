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
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const checkboxEl = document.createElement('input');
  const textEl = document.createElement('a');
  const statusEl = document.createElement('p');
  const button = document.createElement('button');

  todoEl.classList.add('list-item');

  checkboxEl.setAttribute('type', 'checkbox');
  checkboxEl.checked = todo.completed;
  containerEl.appendChild(checkboxEl);
  checkboxEl.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });


  // eslint-disable-next-line no-undefined
  if (todo.text.length > 0) {
    textEl.textContent = todo.text;
  } else {
    textEl.textContent = 'Unnamed Todo';
  }
  textEl.classList.add('list-item__title');
  textEl.setAttribute('href', `./edit.html#${todo.id}`);
  containerEl.appendChild(textEl);


  statusEl.textContent = generateLastEdited(todo.updatedAt);
  statusEl.classList.add('list-item__subtitle');
  containerEl.appendChild(statusEl);

  button.textContent = 'remove';
  button.setAttribute('class', 'button button--text');
  containerEl.appendChild(button);
  button.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);



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
  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      const todoEl = generateTodoDOM(todo);
      document.querySelector('#todo-list').appendChild(todoEl);
    });
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No todos to show';
    document.querySelector('#todo-list').appendChild(messageEl);
  }

};

//renderizza summary
const generateSummaryDOM = function (incompleteTodos) {
  const summaryTitle = document.createElement('h3');
  if (incompleteTodos.length === 1) {
    summaryTitle.textContent = `You have ${incompleteTodos.length} todo left`;
  } else {
    summaryTitle.textContent = `You have ${incompleteTodos.length} todos left`;
  }

  summaryTitle.setAttribute('class', 'summary');
  return summaryTitle;
};


// eslint-disable-next-line no-unused-vars
const generateLastEdited = function (timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`;
};
