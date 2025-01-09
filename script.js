// Get elements
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Event listener for adding a new task
addTaskBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAllTasks);

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    const taskTimeValue = taskTime.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task object
    const task = {
        text: taskText,
        time: taskTimeValue,
        completed: false
    };

    // Add task to the UI
    addTaskToUI(task);

    // Save task to Local Storage
    saveTaskToLocalStorage(task);

    // Clear inputs
    taskInput.value = "";
    taskTime.value = "";
}

// Function to add a task to the UI
function addTaskToUI(task) {
    // Create task item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    // Task content
    const taskContentDiv = document.createElement("div");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    // Add completed class if task is marked completed
    if (task.completed) {
        taskSpan.classList.add("completed");
    }

    // Task time
    const timeSpan = document.createElement("span");
    timeSpan.className = "task-time ms-2";
    if (task.time) {
        timeSpan.textContent = `(${task.time})`;
    }

    taskContentDiv.appendChild(taskSpan);
    taskContentDiv.appendChild(timeSpan);

    // Buttons for actions
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "btn-group";

    const completeBtn = document.createElement("button");
    completeBtn.className = task.completed ? "btn btn-secondary btn-sm" : "btn btn-success btn-sm";
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", () => toggleComplete(task, taskSpan, completeBtn));

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning btn-sm";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(task, taskSpan, timeSpan));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task, listItem));

    // Append buttons to actions div
    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // Append task content and actions to list item
    listItem.appendChild(taskContentDiv);
    listItem.appendChild(actionsDiv);

    // Add list item to task list
    taskList.appendChild(listItem);
}

// Function to toggle task completion
function toggleComplete(task, taskSpan, completeBtn) {
    // Toggle task's completed state
    task.completed = !task.completed;

    // Update UI
    if (task.completed) {
        taskSpan.classList.add("completed");
        completeBtn.textContent = "Undo";
        completeBtn.classList.remove("btn-success");
        completeBtn.classList.add("btn-secondary");
    } else {
        taskSpan.classList.remove("completed");
        completeBtn.textContent = "Complete";
        completeBtn.classList.remove("btn-secondary");
        completeBtn.classList.add("btn-success");
    }

    // Update task in Local Storage
    updateTaskInLocalStorage(task);
}

// Function to edit a task
function editTask(task, taskSpan, timeSpan) {
    const currentTaskText = taskSpan.textContent;
    const currentTaskTime = timeSpan.textContent.replace(/[()]/g, ""); // Remove parentheses

    // Prompt user for new values
    const newTaskText = prompt("Edit your task:", currentTaskText);
    const newTaskTime = prompt("Edit task time (HH:MM):", currentTaskTime);

    // Update task text if provided
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskSpan.textContent = newTaskText;
        task.text = newTaskText;
    }

    // Update task time if provided
    if (newTaskTime !== null && newTaskTime.trim() !== "") {
        timeSpan.textContent = `(${newTaskTime})`;
        task.time = newTaskTime;
    }

    // Update task in Local Storage
    updateTaskInLocalStorage(task);
}

// Function to delete a task
function deleteTask(task, listItem) {
    taskList.removeChild(listItem);
    removeTaskFromLocalStorage(task);
}

// Function to delete all tasks
function deleteAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        taskList.innerHTML = "";
        localStorage.removeItem("tasks");
    }
}

// Local Storage Functions

// Save task to Local Storage
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from Local Storage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Update task in Local Storage
function updateTaskInLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    const index = tasks.findIndex(t => t.text === task.text && t.time === task.time);
    if (index !== -1) {
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(t => t.text !== task.text || t.time !== task.time);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Load tasks from Local Storage and display them
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToUI(task));
}

