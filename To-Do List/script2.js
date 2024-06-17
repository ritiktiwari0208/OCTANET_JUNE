let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const categoryInput = document.getElementById('categoryInput');

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    const category = categoryInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: priority === 'high',
        dueDate: dueDate || null,
        category: category || 'other'
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'normal';
    categoryInput.value = 'other';
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(task.id));
        li.appendChild(checkbox);

        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(span);

        if (task.dueDate) {
            const dueDateSpan = document.createElement('span');
            dueDateSpan.textContent = `Due Date: ${task.dueDate}`;
            li.appendChild(dueDateSpan);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        li.appendChild(deleteBtn);

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = task.priority ? 'High Priority' : 'Normal Priority';
        prioritySpan.classList.add('priority');
        li.appendChild(prioritySpan);

        const categorySpan = document.createElement('span');
        categorySpan.textContent = task.category.charAt(0).toUpperCase() + task.category.slice(1);
        categorySpan.classList.add('category');
        li.appendChild(categorySpan);

        taskList.appendChild(li);
    });
}
