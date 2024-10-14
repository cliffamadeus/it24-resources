class TodoList {
    constructor() {
        this.editingIndex = -1;
        this.addButton = document.getElementById('addButton');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');

        this.init();
    }

    init() {
        this.addButton.addEventListener('click', () => this.addOrUpdateTask());
        this.todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('removeButton')) {
                this.removeTask(e);
            } else if (e.target.classList.contains('editButton')) {
                this.editTask(e);
            }
        });
    }

    addOrUpdateTask() {
        const taskText = this.todoInput.value.trim();
        if (taskText) {
            if (this.editingIndex === -1) {
                this.addTask(taskText);
            } else {
                this.updateTask(taskText);
            }
            this.todoInput.value = '';
        }
    }

    addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item todo-item';
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <button class="btn btn-warning btn-sm editButton">Edit</button>
                <button class="btn btn-danger btn-sm removeButton">Remove</button>
            </div>
        `;
        this.todoList.appendChild(listItem);
    }

    updateTask(taskText) {
        const taskItem = this.todoList.children[this.editingIndex];
        taskItem.querySelector('.task-text').textContent = taskText;
        this.editingIndex = -1; 
        this.addButton.textContent = 'Add';
    }

    removeTask(event) {
        const taskItem = event.target.closest('.todo-item');
        this.todoList.removeChild(taskItem);
    }

    editTask(event) {
        const taskItem = event.target.closest('.todo-item');
        const taskText = taskItem.querySelector('.task-text').textContent;
        this.todoInput.value = taskText;
        this.editingIndex = Array.from(this.todoList.children).indexOf(taskItem);
        this.addButton.textContent = 'Update';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
});