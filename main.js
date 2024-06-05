const btn_AddTask = document.querySelector(".add-button");
const btn_EditTask = document.querySelector(".edit-task");
const btn_DeleteTask = document.querySelector(".delete-button");

const inp_Task = document.getElementById("input-task")

const todoParent = document.getElementById("todo-drop-area");
const inProgressParent = document.getElementById("inprogress-drop-area");
const completeParent = document.getElementById("complete-drop-area");

let todoColumnList = [];
let ipColumnList = [];
let doneColumnList = [];

let counter = 0;

btn_AddTask.addEventListener("click", (e) => {
  e.preventDefault();

  if(inp_Task.value != "") {
    GenerateTaskSlab(inp_Task.value, counter);
  }
});

function GenerateTaskSlab(taskTitle, id) {
  const newTask = document.createElement("div");
  newTask.classList = "task-card";
  newTask.id = `${"task"+id}`;
  newTask.draggable = true;

  const inputTask = document.createElement("input");
  inputTask.classList = "task";
  inputTask.disabled = true;
  inputTask.value = taskTitle;

  const actionButtons = document.createElement("div");
  actionButtons.classList = "actionbtns";

  const editButton = document.createElement("button");
  editButton.classList = "edit-button";

  const icon_edit = document.createElement("i");
  icon_edit.classList = "fa-solid fa-pen-to-square";

  const deleteButton = document.createElement("button");
  deleteButton.classList = "delete-button";

  const icon_delete = document.createElement("i");
  icon_delete.classList = "fa-solid fa-trash";

  deleteButton.appendChild(icon_delete);
  editButton.appendChild(icon_edit);

  actionButtons.appendChild(editButton);
  actionButtons.appendChild(deleteButton);

  newTask.appendChild(actionButtons);
  newTask.appendChild(inputTask);

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("isdragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("isdragging");
  });

  todoParent.appendChild(newTask);

  counter = id+1;

}