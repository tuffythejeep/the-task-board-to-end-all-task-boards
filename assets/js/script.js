// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
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
function createTaskCard(task) {
  return `
        <div class="card task-card" id="${task.id}" draggable="true">
            <div class="card-header">
                <h5 class="card-title">${task.title}</h5>
                <button class="btn btn-danger btn-sm float-end delete-task" data-task-id="${task.id}">Delete</button>
            </div>
            <div class="card-body">
                <p class="card-text">${task.description}</p>
                <p class="card-text">Due: ${task.dueDate}</p>
            </div>
        </div>
    `;
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
    done: document.getElementById("done-cards"),
  };

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

document.querySelectorAll(".lane").forEach(lane => {
    lane.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        lane.addEventListener("drop", (event) => {
            const taskId = event.dataTransfer.getData("text/plain");
            const newStatus = lane.id.replace("-cards", "");
            updateTaskStatus(taskId, newStatus);
        });
    });

    document.querySelectorAll(".delete-task").forEach(button => {
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
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Function to update task status
function updateTaskStatus(taskId, newStatus) {
    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
