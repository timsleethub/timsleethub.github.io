const todoForm = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoText = input.value;

    if (todoText) {
      const todoElement = document.createElement('li');
      todoElement.innerText = todoText;

      todoElement.addEventListener('click', () => {
        todoElement.classList.toggle('completed');
      })

      todoElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        todoElement.remove();
      })

      todos.appendChild(todoElement);

      input.value = '';
    }
  });
