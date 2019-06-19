let todos = getSavedTodos();

const todoTitle = document.querySelector('#todo-title');
const todoBody = document.querySelector('#todo-body');
const removeTodoEl = document.querySelector('#remove-btn');
const todoId = location.hash.substring(1);

const todo = todos.find((todo) => {
  return todo.id === todoId;
})

if (todo === undefined) {
  location.assign('./index.html')
}

todoTitle.value = todo.text;
todoBody.value = todo.description;

todoTitle.addEventListener('change', (evt) => {
  todo.text = evt.target.value;
  saveTodos(todos);
})

todoBody.addEventListener('change', (evt) => {
  todo.description = evt.target.value;
  saveTodos(todos);
})

removeTodoEl.addEventListener('click', (evt) => {
  removeTodo(todo.id);
  saveTodos(todos);
  location.assign('./index.html');
})


