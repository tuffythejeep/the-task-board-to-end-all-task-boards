// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const timestamp = Date.now(); // this will get me the current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number less than 1000
  const uniqueId = `${timestamp}-${randomNum}`; // this will combine timestamp and random number

  return uniqueId;
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
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
