let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Очищаем список перед рендерингом
    tasks.forEach((task, index) => {
        const newRow = document.createElement('tr');
        const taskCell = document.createElement('td');
        taskCell.textContent = task.text;

        const inProgressCell = document.createElement('td');
        const inProgressCheckbox = document.createElement('input');
        inProgressCheckbox.type = 'checkbox';
        inProgressCheckbox.checked = task.inProgress;
        inProgressCheckbox.addEventListener('change', () => {
            task.inProgress = inProgressCheckbox.checked;
            saveTasks();
            renderTasks();
        });
        inProgressCell.appendChild(inProgressCheckbox);

        const completedCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        completedCell.appendChild(deleteButton);

        newRow.appendChild(taskCell);
        newRow.appendChild(inProgressCell);
        newRow.appendChild(completedCell);
        taskList.appendChild(newRow);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Задача не может быть пустой!');
        return;
    }

    tasks.push({ text: taskText, inProgress: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
});

document.getElementById('sortAsc').addEventListener('click', () => {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
    saveTasks();
    renderTasks();
});

document.getElementById('sortDesc').addEventListener('click', () => {
    tasks.sort((a, b) => b.text.localeCompare(a.text));
    saveTasks();
    renderTasks();
});

document.getElementById('styleSelect').addEventListener('change', function() {
    const selectedStyle = this.value;
    document.body.className = selectedStyle; // Устанавливаем класс на body
});

// При загрузке страницы устанавливаем сохраненный стиль
window.onload = function() {
    const savedStyle = localStorage.getItem('selectedStyle') || 'bright'; // Установите стиль по умолчанию
    document.body.className = savedStyle;
    document.getElementById('styleSelect').value = savedStyle; // Устанавливаем значение селектора
};

// Сохраняем выбранный стиль в localStorage
document.getElementById('styleSelect').addEventListener('change', function() {
    const selectedStyle = this.value;
    document.body.className = selectedStyle; // Устанавливаем класс на body
    localStorage.setItem('selectedStyle', selectedStyle); // Сохраняем стиль
});

// Инициализация
renderTasks();
