// Add Task
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = taskName.value.trim();
    const time = taskTime.value; // ISO 格式: "2024-11-20T02:37"
    const priority = taskPriority.value;

    if (name) {
        errorMessage.classList.add('hidden'); // 隐藏错误提示

        // 强制格式化日期和时间为英文
        let formattedDate = '';
        let formattedTime = '';
        if (time) {
            const date = new Date(time);

            // 格式化日期为英文 (e.g., "November 20, 2024")
            formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);

            // 格式化时间为英文 (e.g., "02:37 AM")
            formattedTime = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
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
