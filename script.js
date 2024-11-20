document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const themeBtns = document.querySelectorAll('.theme-btn');

    // Add Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = todoInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            `;
            todoList.appendChild(li);
            todoInput.value = '';
        }
    });

    // Mark Complete or Delete Task
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            e.target.parentElement.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        }
    });

    // Theme Switching
    themeBtns.forEach((btn) =>
        btn.addEventListener('click', () => {
            document.body.className = `${btn.classList[1]}-mode`;
        })
    );
});
