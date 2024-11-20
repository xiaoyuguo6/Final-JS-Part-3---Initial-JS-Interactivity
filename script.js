document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Default theme (can be set to user preference)
    let currentTheme = 'spring';
    document.body.classList.add(`theme-${currentTheme}`);

    // Theme Switching
    themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Remove the current theme class
            document.body.classList.remove(`theme-${currentTheme}`);

            // Add the new theme class
            currentTheme = btn.classList[1]; // Get the theme name (e.g., 'spring', 'summer')
            document.body.classList.add(`theme-${currentTheme}`);
        });
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
            taskName.value = '';
            taskTime.value = '';
            taskPriority.value = 'low';
        }
    });

    // Complete or Delete Task
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            e.target.parentElement.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        }
    });

    // Theme Switching
    themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            document.body.className = `theme-${btn.classList[1]}`;
        });
    });

    // Language Switching
    langButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            alert(`Switching language to: ${btn.classList[1].toUpperCase()}`);
            // Placeholder for real i18n logic
        });
    });
});
