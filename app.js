// * Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// * Functions
function addTodo(event) {
  // * Prevent from submitting
  event.preventDefault();

  // * Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // * Create li element
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // * Add to local storage
  saveToLocal(todoInput.value);

  // * Check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("check-button");
  todoDiv.appendChild(checkButton);

  // * Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-button");
  todoDiv.appendChild(deleteButton);

  // * Append to list
  todoList.appendChild(todoDiv);

  // * Clear input
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // * delete item
  if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    //Remove from local storage
    removeFromLocal(todo);
    // Remove item
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // * Check
  if (item.classList[0] === "check-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// * Filter todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// * Save to local storage
function saveToLocal(todo) {
  // check storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // * Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // * Create li element
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // * Check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);

    // * Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    // * Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeFromLocal(todo) {
  // check storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ! localStorage.clear();
