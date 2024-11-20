<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Cute To-Do List 🌟</title>
    <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="theme-spring">
    <header>
        <h1>🐰 My Cute To-Do List 🌟</h1>
        <div class="theme-switcher">
            <button class="theme-btn spring" data-theme="spring">Spring 🌸</button>
            <button class="theme-btn summer" data-theme="summer">Summer 🌞</button>
            <button class="theme-btn autumn" data-theme="autumn">Autumn 🍂</button>
            <button class="theme-btn winter" data-theme="winter">Winter ❄️</button>
        </div>
    </header>
    <main>
        <section class="todo-app">
            <form id="todo-form">
                <input type="text" id="task-name" placeholder="🌟 Task Name" required>
                <input type="datetime-local" id="task-time">
                <select id="task-priority">
                    <option value="low">Low 🌱</option>
                    <option value="medium">Medium 🌟</option>
                    <option value="high">High 🚀</option>
                </select>
                <button type="submit" id="add-task">Add Task 📝</button>
            </form>
            <ul id="todo-list"></ul>
        </section>
    </main>
    <footer>
        <p>© 2024 My Cute To-Do List. Made with 💖.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
