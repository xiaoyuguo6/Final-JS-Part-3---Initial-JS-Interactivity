document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const todoForm = document.getElementById('todo-form');
    const taskName = document.getElementById('task-name');
    const taskTime = document.getElementById('task-time');
    const taskPriority = document.getElementById('task-priority');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    // Initialize Flatpickr for date and time selection
    flatpickr(taskTime, {
        enableTime: true,
        dateFormat: "Y/m/d H:i", // Example: "2024/11/20 02:37"
        locale: "en" // Force English display
    });

    // Default theme
    let currentTheme = 'theme-spring';
    document.body.classList.add(currentTheme);

    // Theme Switching
    themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-theme');
            document.body.classList.remove(currentTheme);
            document.body.classList.add(newTheme);
            currentTheme = newTheme;
        });
    });

    // Add Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = taskName.value.trim();
        const time = taskTime.value;
        const priority = taskPriority.value;

        if (name) {
            errorMessage.classList.add('hidden'); // Hide error message

            // Create a new task item
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
        } else {
            errorMessage.classList.remove('hidden'); // Show error message
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
