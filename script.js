// Add Task
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = taskName.value.trim();
    const time = taskTime.value;
    const priority = taskPriority.value;

    if (name) {
        errorMessage.classList.add('hidden'); // Hide error message

        // Format the time
        let formattedDate = '';
        let formattedTime = '';
        if (time) {
            const date = new Date(time);
            
            // Format date (e.g., "November 20, 2024")
            formattedDate = new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long'
            }).format(date);

            // Format time (e.g., "02:37 AM")
            formattedTime = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).format(date);
        }

        // Create a new task item
        const li = document.createElement('li');
        li.className = `todo-item priority-${priority}`;
        li.innerHTML = `
            <span>${name} ${formattedDate ? `📅 ${formattedDate}` : ''} ${formattedTime ? `⏰ ${formattedTime}` : ''}</span>
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
