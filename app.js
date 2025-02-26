const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.querySelector('#todo-list');
const haveToAdd = document.querySelector('.error');

function addTodo(){
    todoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (todoInput.value === '') {
                haveToAdd.textContent = 'Please add a todo';
                return;
            } else {
            haveToAdd.textContent = '';
            
            const todoId = `todo-${Date.now()}`;
            
            todoListUl.innerHTML += `
                <li class="todo">
                    <input type="checkbox" id="${todoId}">
                    <label class="custom-checkbox" for="${todoId}">
                        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                        </svg>
                    </label>
                    <label for="${todoId}" class="todo-text">
                        ${todoInput.value}
                    </label>
                    <button class="delete-button">
                        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </button>
                </li>
            `;
            
            todoInput.value = '';
            saveTodos();
        }
    });
}

function deleteTodo(){
    todoListUl.addEventListener('click', e => {
        const deleteButton = e.target.closest('.delete-button');
        if (deleteButton) { 
            const todoItem = deleteButton.closest('li');
            todoItem.remove();
            saveTodos();
        }
    });
}

function saveTodos(){
    // [Not needed, HTML is a string]. const todosJson = JSON.stringify(todoListUl.innerHTML);
    const cleanedHTML = todoListUl.innerHTML.trim();
    localStorage.setItem('todos', cleanedHTML);
} 
function getTodos(){ // || '' is used to prevent null
    const todos = localStorage.getItem('todos') || '';
    todoListUl.innerHTML = todos;
}

function run(){
    getTodos();
    addTodo();
    deleteTodo();
} run();