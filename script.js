document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const todoForm = document.getElementById('todo-form');
    const taskName = document.getElementById('task-name');
    const taskTime = document.getElementById('task-time');
    const taskPriority = document.getElementById('task-priority');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    // Default theme
    let currentTheme = 'theme-spring';
    document.body.classList.add(currentTheme);

    // Theme Switching
    themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-theme');

            // Remove the current theme class
            document.body.classList.remove(currentTheme);

            // Add the new theme class
            document.body.classList.add(newTheme);

            // Update the current theme
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
            errorMessage.classList.add('hidden'); // 隐藏错误提示

            // Format the time
            let formattedDate = '';
            let formattedTime = '';
            if (time) {
                const date = new Date(time);

                // 格式化日期和时间
                formattedDate = new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'long'
                }).format(date);
                formattedTime = new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).format(date);
            }

            // 创建新的任务列表项
            const li = document.createElement('li');
            li.className = `todo-item priority-${priority}`;
            li.innerHTML = `
                <span>${name} ${formattedDate ? `📅 ${formattedDate}` : ''} ${formattedTime ? `⏰ ${formattedTime}` : ''}</span>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            `;
            todoList.appendChild(li);

            // 清空输入框
            taskName.value = '';
            taskTime.value = '';
            taskPriority.value = 'low';
        } else {
            errorMessage.classList.remove('hidden'); // 显示错误提示
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
