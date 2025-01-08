// Get elements
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskList = document.getElementById("taskList");

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

    // Create task item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    // Task content
    const taskContentDiv = document.createElement("div");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Task time
    const timeSpan = document.createElement("span");
    timeSpan.className = "task-time ms-2";
    if (taskTimeValue) {
        timeSpan.textContent = `(${taskTimeValue})`;
    }

    taskContentDiv.appendChild(taskSpan);
    taskContentDiv.appendChild(timeSpan);

    // Buttons for actions
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "btn-group";

    const completeBtn = document.createElement("button");
    completeBtn.className = "btn btn-success btn-sm";
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => toggleComplete(taskSpan, completeBtn));

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning btn-sm";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(taskSpan, timeSpan));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(listItem));

    // Append buttons to actions div
    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // Append task content and actions to list item
    listItem.appendChild(taskContentDiv);
    listItem.appendChild(actionsDiv);

    // Add list item to task list
    taskList.appendChild(listItem);

    // Clear inputs
    taskInput.value = "";
    taskTime.value = "";
}

// Function to toggle task completion
function toggleComplete(taskSpan, completeBtn) {
    if (taskSpan.classList.contains("completed")) {
        taskSpan.classList.remove("completed");
        completeBtn.textContent = "Complete";
        completeBtn.classList.remove("btn-secondary");
        completeBtn.classList.add("btn-success");
    } else {
        taskSpan.classList.add("completed");
        completeBtn.textContent = "Undo";
        completeBtn.classList.remove("btn-success");
        completeBtn.classList.add("btn-secondary");
    }
}

// Function to edit a task
function editTask(taskSpan, timeSpan) {
    const currentTaskText = taskSpan.textContent;
    const currentTaskTime = timeSpan.textContent.replace(/[()]/g, ""); // Remove parentheses

    // Prompt user for new values
    const newTaskText = prompt("Edit your task:", currentTaskText);
    const newTaskTime = prompt("Edit task time (HH:MM):", currentTaskTime);

    // Update task text if provided
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskSpan.textContent = newTaskText;
    }

    // Update task time if provided
    if (newTaskTime !== null && newTaskTime.trim() !== "") {
        timeSpan.textContent = `(${newTaskTime})`;
    }
}

// Function to delete a task
function deleteTask(listItem) {
    taskList.removeChild(listItem);
}

// Function to delete all tasks
function deleteAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        taskList.innerHTML = "";
    }
}
