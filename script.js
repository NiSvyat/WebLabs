document.getElementById('styleSelect').addEventListener('change', function() {
    const selectedStyle = this.value;
    document.body.className = selectedStyle; // Устанавливаем класс на body
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    const taskList = document.getElementById('taskList');

    const newRow = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = taskText;

    const inProgressCell = document.createElement('td');
    const inProgressCheckbox = document.createElement('input');
    inProgressCheckbox.type = 'checkbox';
    inProgressCheckbox.addEventListener('change', function() {
        if (inProgressCheckbox.checked) {
            taskCell.classList.add('completed');
        } else {
            taskCell.classList.remove('completed');
        }
    });
    inProgressCell.appendChild(inProgressCheckbox);

    const completedCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(newRow);
    });
    completedCell.appendChild(deleteButton);

    newRow.appendChild(taskCell);
    newRow.appendChild(inProgressCell);
    newRow.appendChild(completedCell);

    taskList.appendChild(newRow);

    taskInput.value = '';
});
