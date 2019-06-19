let todos = getSavedTodos();

const todoTitle = document.querySelector('#todo-title');
const todoBody = document.querySelector('#todo-body');
const removeTodoEl = document.querySelector('#remove-btn');
const todoId = location.hash.substring(1);
const lastEditedMsg = document.querySelector('#last-edited')

let todo = todos.find((todo) => {
  return todo.id === todoId;
})

if (todo === undefined) {
  location.assign('./index.html')
}

todoTitle.value = todo.text;
todoBody.value = todo.description;
lastEditedMsg.textContent = todo.updatedAt;

todoTitle.addEventListener('change', (evt) => {
  todo.text = evt.target.value;
  todo.updatedAt = `Ultima modifica: ${getTime()}`;

  saveTodos(todos);
})

todoBody.addEventListener('change', (evt) => {
  todo.description = evt.target.value;
  todo.updatedAt = `Ultima modifica: ${getTime()}`;

  saveTodos(todos);
})

removeTodoEl.addEventListener('click', (evt) => {
  removeTodo(todo.id);
  saveTodos(todos);
  location.assign('./index.html');
})

window.addEventListener('storage', (evt) => {
  if (evt.key === 'todos') {
    todos = JSON.parse(evt.newValue);
    todo = todos.find((todo) => {
      return todo.id === todoId;
    })
    if (todo === undefined) {
      location.assign('./index.html')
    }
    todoTitle.value = todo.text;
    todoBody.value = todo.description;
    lastEditedMsg.textContent = todo.updatedAt;
  }
})


