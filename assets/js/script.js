// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const timestamp = Date.now(); // this will get me the current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number less than 1000
  return `${timestamp}-${randomNum}`; // this will generate (combine timestamp and random) number
}
const taskId = generateTaskId();
console.log(taskId);

// Todo: create a function to create a task card and return it
function createTaskCard(taskId, taskTitle, taskDescription) {
  const taskCard = {
    id: taskId,
    title: taskTitle,
    description: taskDescription,
    // Add more properties as needed
  };

  // You can return the task card object or perform other actions with it
 taskList.push(taskCard)
  return taskCard;
}

const newTaskCard = createTaskCard(
  "uniqueTaskId",
  "Task Title",
  "Task Description",
  "Due Date"
);
console.log(newTaskCard);
// Output: should be { id: 'uniqueTaskId', title: 'Task Title', description: 'Task Description', dueDate: 'Due Date'}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const columns = {
    "to-do": document.getElementById("todo-cards"),
    "in-progress": document.getElementById("in-progress-cards"),
    "done": document.getElementById("done-cards"),
  };

  if (!columns["to-do"] || !columns["in-progress"] || !columns["done"]) {
    console.error("One or more columns are not found in the DOM.");
    return;
  }

  Object.values(columns).forEach((column) => (column.innerHTML = "")); // Clear existing content

  taskList.forEach((task) => {
    columns[task.status].insertAdjacentHTML("beforeend", createTaskCard(task));
  });

  addEventListeners();
}

renderTaskList();

// Add event listeners for drag and drop functionality
function addEventListeners() {
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.id);
    });
  });

  document.querySelectorAll(".lane").forEach((lane) => {
    lane.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    lane.addEventListener("drop", (event) => {
      const taskId = event.dataTransfer.getData("text/plain");
      const newStatus = lane.id.replace("-cards", "");
      updateTaskStatus(taskId, newStatus);
    });
  });

  document.querySelectorAll(".delete-task").forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskId = button.getAttribute("data-task-id");
      deleteTask(taskId);
    });
  });
}

// Todo: create a function to handle adding a new task
function addTask(taskTitle, taskDescription, taskDueDate) {
  const taskId = generateTaskId();

  const newTask = {
    id: taskId,
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
    status: "to-do",
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function deleteTask(taskId) {
  taskList = taskList.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Function to update task status
function updateTaskStatus(taskId, newStatus) {
  const task = taskList.find((task) => task.id === taskId);
  if (task) {
    task.status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// Function to initialize the modal and date picker
function initializeModal() {
  const addTaskButton = document.querySelector(".btn-success");
  const saveTaskButton = document.getElementById("save-task");

  addTaskButton.addEventListener("click", () => {
    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("task-due-date").value = "";
  });

  saveTaskButton.addEventListener("click", () => {
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDueDate = document.getElementById("task-due-date").value;
    addTask(taskTitle, taskDescription, taskDueDate);
  });

  $("#task-due-date").datepicker();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  initializeModal();
});
