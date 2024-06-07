// import Data from "./KanbanData.js";

const btn_AddTask = document.querySelector(".add-button");
const btn_EditTask = document.querySelector(".edit-task");
const btn_DeleteTask = document.querySelector(".delete-button");

const inp_Task = document.getElementById("input-task")

const todoParent = document.getElementById("todo-drop-area");
const inProgressParent = document.getElementById("inprogress-drop-area");
const completeParent = document.getElementById("complete-drop-area");


const boardData = [
  {
    "colId": 1,
    "colName": "ToDo",
    "tasks": []  
  },
  {
    "colId": 2,
    "colName": "In Progress",
    "tasks": []  
  },
  {
    "colId":3,
    "colName": "Complete",
    "tasks": []  
  }
]

let counter = 1;

btn_AddTask.addEventListener("click", (e) => {
  e.preventDefault();

  if(inp_Task.value != "") {
    GenerateTaskSlab(inp_Task.value, counter);

    InsertData(counter, inp_Task.value);
  }
});

function GenerateTaskSlab(taskTitle, id) {
  const newTask = document.createElement("div");
  newTask.classList = "task-card";
  newTask.id = `${"task_"+id}`;
  newTask.draggable = true;

  const inputTask = document.createElement("input");
  inputTask.classList = "task";
  inputTask.disabled = true;
  inputTask.value = taskTitle;

  const actionButtons = document.createElement("div");
  actionButtons.classList = "actionbtns";

  const editButton = document.createElement("button");
  editButton.classList = "editbtn";

  // const icon_edit = document.createElement("i");
  // icon_edit.classList = "fa-solid fa-pen-to-square";

  const deleteButton = document.createElement("button");
  deleteButton.classList = "deletebtn";

  // const icon_delete = document.createElement("i");
  // icon_delete.classList = "fa-solid fa-trash";

  // deleteButton.appendChild(icon_delete);
  // editButton.appendChild(icon_edit);

  actionButtons.appendChild(editButton);
  actionButtons.appendChild(deleteButton);

  newTask.appendChild(actionButtons);
  newTask.appendChild(inputTask);

  editButton.addEventListener("click", function(event) {
    EditTask(event)
  });

  inputTask.addEventListener("focusout", function(event) {
    EditTaskTitleOnChange(event)
  });

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("isdragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("isdragging");
  });

  todoParent.appendChild(newTask);

  counter = id+1;

}





function EditTask(e) {
  const inputField = e.target.parentElement.parentElement.querySelector('input');
  inputField.disabled = false;

  const colId = e.target.parentElement.parentElement;
}

function EditTaskTitleOnChange(e){
  const inputField = e.target.parentElement.parentElement.querySelector('input');
  const taskId = inputField.parentElement.id.split("_");
  const columnEle = inputField.parentElement.parentElement;
  let colId;

  if(columnEle.id === "todo-drop-area") {
    colId = 1;
  }
  else if(columnEle.id === "inprogress-drop-area") {
    colId = 2;
  }
  else if(columnEle.id === "complete-drop-area") {
    colId = 3;
  }
  
  inputField.disabled = true;
  UpdateTaskTitle(colId, taskId[1], inputField.value);
}

function InsertData(taskId, task){
  let newTask = {
    "id":taskId,
    "task":task
   };

   boardData[0].tasks.push(newTask);
   console.log(JSON.stringify(boardData, null, 2));
}

function UpdateTaskTitle(colId, taskId, task){
   if(boardData[colId].tasks.id === taskId) {
    boardData[colId].tasks.task = task;
   }
   
   console.log(JSON.stringify(boardData, null, 2));
}
