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
  document.querySelector('body').appendChild(newParagraph);
})


