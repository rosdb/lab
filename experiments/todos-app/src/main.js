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

const incompleteTodos = todos.filter((todo) => {
  return !todo.completed
})

const newTitle = document.createElement('h3');
newTitle.textContent = `Hai ${incompleteTodos.length} attività incomplete`;
document.querySelector('body').appendChild(newTitle);

todos.forEach((todo) => {
  const newParagraph = document.createElement('p');
  newParagraph.textContent = todo.text;
  document.querySelector('.todo-list').appendChild(newParagraph);
})


document.querySelector('button#add').addEventListener('click', (evt) => {
  const newTodo = document.createElement('p');
  newTodo.textContent = 'New todo';
  document.querySelector('.todo-list').appendChild(newTodo);
})

document.querySelector('button#delete').addEventListener('click', (evt) => {
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((paragraph) => {
    paragraph.remove();
  })
})
