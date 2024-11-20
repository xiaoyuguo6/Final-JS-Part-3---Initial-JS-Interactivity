document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const todoForm = document.getElementById('todo-form');
    const taskName = document.getElementById('task-name');
    const taskTime = document.getElementById('task-time');
    const taskPriority = document.getElementById('task-priority');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    // Initialize Flatpickr
    flatpickr(taskTime, {
        enableTime: true,
        dateFormat: "Y/m/d H:i",
        locale: "en"
    });

    // Load saved theme
    let currentTheme = localStorage.getItem('currentTheme') || 'theme-spring';
    document.body.classList.add(currentTheme);

    // Theme switching
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.replace(currentTheme, btn.getAttribute('data-theme'));
            currentTheme = btn.getAttribute('data-theme');
            localStorage.setItem('currentTheme', currentTheme); // Save theme
        });
    });

    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => renderTask(task));
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            tasks.push({
                name: item.dataset.name,
                time: item.dataset.time,
                priority: item.dataset.priority
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render a task to the DOM
    function renderTask(task) {
        const li = document.createElement('li');
        li.className = `todo-item priority-${task.priority}`;
        li.dataset.name = task.name;
        li.dataset.time = task.time;
        li.dataset.priority = task.priority;

        li.draggable = true; // Enable drag-and-drop
        li.innerHTML = `
            <span>${task.name} ${task.time ? `📅 ${task.time}` : ''}</span>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        `;
        todoList.appendChild(li);
    }

    // Drag-and-drop functionality
    let draggedItem = null;

    todoList.addEventListener('dragstart', e => {
        if (e.target.classList.contains('todo-item')) {
            draggedItem = e.target;
            e.target.classList.add('dragging');
        }
    });

    todoList.addEventListener('dragend', e => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
            saveTasks(); // Save updated order
        }
    });

    todoList.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todoList, e.clientY);
        if (draggedItem && afterElement) {
            todoList.insertBefore(draggedItem, afterElement);
        } else if (draggedItem) {
            todoList.appendChild(draggedItem);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Handle form submission
    todoForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = taskName.value.trim();
        const time = taskTime.value;
        const priority = taskPriority.value;

        if (name) {
            errorMessage.classList.add('hidden');
            const task = { name, time, priority };
            renderTask(task);
            saveTasks();

            taskName.value = '';
            taskTime.value = '';
            taskPriority.value = 'low';
        } else {
            errorMessage.classList.remove('hidden');
        }
    });

    // Handle task actions (complete or delete)
    todoList.addEventListener('click', e => {
        if (e.target.classList.contains('complete-btn')) {
            e.target.parentElement.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
            saveTasks();
        }
    });

    // Load tasks and theme
    loadTasks();
});
