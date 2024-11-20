document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const todoForm = document.getElementById('todo-form');
    const taskName = document.getElementById('task-name');
    const taskTime = document.getElementById('task-time');
    const taskPriority = document.getElementById('task-priority');
    const todoList = document.getElementById('todo-list');

    let currentTheme = 'spring'; // Default theme
    document.body.classList.add(`theme-${currentTheme}`);

    // Theme Switching
    themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            document.body.className = ''; // Reset all classes
            currentTheme = btn.classList[1];
            document.body.classList.add(`theme-${currentTheme}`);
        });
    });

    // Add Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = taskName.value.trim();
        const time = taskTime.value;
        const priority = taskPriority.value;

        if (name) {
            const li = document.createElement('li');
            li.className = `todo-item priority-${priority}`;
            li.innerHTML = `
                <span>${name} ${time ? `📅 ${time}` : ''}</span>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            `;
            todoList.appendChild(li);

            // Clear inputs
            taskName.value = '';
            taskTime.value = '';
            taskPriority.value = 'low';
        }
    });

    // Task Actions (Complete/Delete)
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            e.target.parentElement.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        }
    });
});
