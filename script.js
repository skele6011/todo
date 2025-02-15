const input = document.querySelector('#todoInput');
const list = document.querySelector('#todoList');
const addBtn = document.querySelector('#addTodo');
const clearBtn = document.querySelector('#clearAll');
const error = document.querySelector('#error');

function addTodo(){
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(input.value.trim() === ''){
            error.style.display = 'block';
        } else {
            error.style.display = 'none';
            const li = document.createElement('li');
            li.innerHTML = `${input.value} <img src="src/white-trash.png" class="delete" alt="delete">`;
            list.appendChild(li);
            saveTodos();
            input.value = '';
        }
    });
} addTodo();

function clearAll(){
    clearBtn.addEventListener('click', () => {
        list.innerHTML = '';
        saveTodos();
    });
} clearAll();

function controlDeleteHover(){
list.addEventListener('mouseover', (e) => {
    if(e.target.classList.contains('delete')){
        e.target.src = "src/red-trash.png";
    }
});

list.addEventListener('mouseout', (e) => {
    if(e.target.classList.contains('delete')){
        e.target.src = "src/white-trash.png";
    }
});
} controlDeleteHover();

function singleDelete(){
    list.addEventListener('click', (e) => {
        if(e.target.classList.contains('delete')){
            e.target.parentElement.remove();
            saveTodos();
        }
    });
} singleDelete();

function keepData(){
    // Load todos when page loads
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        list.innerHTML = savedTodos;
    }
} keepData();

function saveTodos() {
    localStorage.setItem('todos', list.innerHTML);
} saveTodos();