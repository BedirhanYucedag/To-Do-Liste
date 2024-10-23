document.addEventListener('DOMContentLoaded', loadTodos);

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = '';
});

function addTodo(task) {
    const todoItem = document.createElement('li');
    todoItem.textContent = task;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Erledigt';
    completeButton.addEventListener('click', () => {
        todoItem.classList.toggle('completed');
        saveTodos();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.addEventListener('click', () => {
        todoItem.remove();
        saveTodos();
    });

    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
    saveTodos();
}

function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(todoItem => {
        todos.push({
            task: todoItem.textContent.replace('ErledigtLöschen', ''),
            completed: todoItem.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        savedTodos.forEach(todo => {
            addTodo(todo.task);
            if (todo.completed) {
                todoList.lastChild.classList.add('completed');
            }
        });
    }
}
