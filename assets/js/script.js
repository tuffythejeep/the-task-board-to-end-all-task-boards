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

// Todo: create a function to create a task card
function createTaskCard(taskId, taskTitle, taskDescription, taskDueDate) {
  const taskCard = {
    id: taskId,
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
  };

  // The below will return the task card object
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
const tasks = [
  {
    id: generateTaskId(),
    title: "Task 1",
    description: "Description for Task 1",
  },
  {
    id: generateTaskId(),
    title: "Task 2",
    description: "Description for Task 2",
  },
  // Add more tasks as needed
];

const taskContainer = document.getElementById("task-container");

function renderTaskList() {
  taskContainer.innerHTML = ""; // Clear existing content
  tasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    taskContainer.insertAdjacentHTML("beforeend", taskCard);
  });
}

renderTaskList();

// Add event listeners for drag and drop functionality
const taskCards = document.querySelectorAll(".task-card");

taskCards.forEach((card) => {
  card.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", card.id);
  });
});



// Todo: create a function to handle adding a new task
//function handleAddTask(event) {}
function addTask(taskName) {
  // Generate a unique ID for the new task
  const taskId = generateUniqueId();

  // Create a new task object with the provided name and generated ID
  const newTask = {
    id: taskId,
    name: taskName,
    completed: false,
  };

  // Add the new task to the task list
  tasks.push(newTask);

  // Update the UI to reflect the new task
  renderTaskList();
}



// Todo: create a function to handle deleting a task
//function handleDeleteTask(event) {}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId); // Assuming tasks is your array of tasks
}





// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
