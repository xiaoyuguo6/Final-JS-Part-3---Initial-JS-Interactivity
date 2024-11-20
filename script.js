document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables for theme buttons, form elements, and task list
    const themeButtons = document.querySelectorAll('.theme-btn'); // Theme buttons
    const todoForm = document.getElementById('todo-form'); // Task input form
    const taskName = document.getElementById('task-name'); // Input field for task name
    const taskTime = document.getElementById('task-time'); // Input field for date and time
    const taskPriority = document.getElementById('task-priority'); // Dropdown for task priority
    const todoList = document.getElementById('todo-list'); // Task list container
    const errorMessage = document.getElementById('error-message'); // Error message for missing task name

    // Setup Flatpickr for date and time input
    flatpickr(taskTime, {
        enableTime: true, // Enable time selection
        dateFormat: "Y/m/d H:i", // Display format
        locale: "en" // Ensure English display
    });

    // Set default theme
    let currentTheme = 'theme-spring';
    document.body.classList.add(currentTheme); // Apply default theme

    // Add theme switching functionality
    themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            document.body.classList.replace(currentTheme, btn.getAttribute('data-theme')); // Replace theme
            currentTheme = btn.getAttribute('data-theme'); // Update current theme
        });
    });

    // Handle task submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        const name = taskName.value.trim(); // Get task name
        const time = taskTime.value; // Get selected time
        const priority = taskPriority.value; // Get selected priority

        if (name) {
            errorMessage.classList.add('hidden'); // Hide error message

            // Create and add task to the list
            const li = document.createElement('li');
            li.className = `todo-item priority-${priority}`;
            li.innerHTML = `
                <span>${name} ${time ? `📅 ${time}` : ''}</span>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            `;
            todoList.appendChild(li);

            // Clear form inputs
            taskName.value = '';
            taskTime.value = '';
            taskPriority.value = 'low';
        } else {
            errorMessage.classList.remove('hidden'); // Show error message if name is empty
        }
    });

    // Handle task actions (complete or delete)
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            e.target.parentElement.classList.toggle('completed'); // Toggle completed status
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove(); // Remove task from list
        }
    });
});
