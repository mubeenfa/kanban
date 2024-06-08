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

    inp_Task.value = "";
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

  const deleteButton = document.createElement("button");
  deleteButton.classList = "deletebtn";

  actionButtons.appendChild(editButton);
  actionButtons.appendChild(deleteButton);

  newTask.appendChild(actionButtons);
  newTask.appendChild(inputTask);

  editButton.addEventListener("click", function(event) {
    Edit(event)
  });

  deleteButton.addEventListener("click", function(event) {
    Delete(event)
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
}

function Edit(e) {
  const inputField = e.target.parentElement.parentElement.querySelector('input');
  inputField.disabled = false;

  const colId = e.target.parentElement.parentElement;
}

function Delete(e) {
  const task = e.target.parentElement.parentElement;
  const colId = CheckColumn(task.parentElement);
  const id = parseInt(task.id.split("_")[1])

  DeleteData (task, colId, id);
}

function EditTaskTitleOnChange(e){
  const inputField = e.target.parentElement.parentElement.querySelector('input');
  const taskId = inputField.parentElement.id.split("_");
  const columnEle = inputField.parentElement.parentElement;
  
  let colId = CheckColumn(columnEle.id);


  // if(columnEle.id === "todo-drop-area") {
  //   colId = 1;
  // }
  // else if(columnEle.id === "inprogress-drop-area") {
  //   colId = 2;
  // }
  // else if(columnEle.id === "complete-drop-area") {
  //   colId = 3;
  // }
  
  inputField.disabled = true;
  UpdateTaskTitle(colId, taskId[1], inputField.value);
}

function CheckColumn(col) {
  let colId;
  if(col.id === "todo-drop-area") {
    colId = 1;
  }
  else if(col.id === "inprogress-drop-area") {
    colId = 2;
  }
  else if(col.id === "complete-drop-area") {
    colId = 3;
  }

  return colId;
}


function DeleteData(taskDiv, colId, taskId) {
  // Find the column with the given colId
  const column = boardData.find(col => col.colId === colId);

  // Check if the column was found
  if (column) {
    // Get the array of tasks from the found column
    const taskArray = column.tasks;
    // console.log('Original tasks:', taskArray);

    // Filter out the task with the specified taskId
    const updatedTaskArray = taskArray.filter(task => {
      // console.log(`Checking task with id ${task.id}`);  // Debug: Log task IDs being checked
      return task.id !== taskId;
    });

    // Reassign the filtered tasks back to the column's tasks
    column.tasks = updatedTaskArray;

    const taskDiv = document.getElementById(`task_${taskId}`);

    if (taskDiv) {
      taskDiv.remove();
    }
  }
  else {
    console.log('Column not found');
  }

  // const taskArray = column.tasks;
  // console.log(taskArray)
  // const updatedTaskArray = taskArray.filter(task => task.id !== taskId);
  // column.tasks = updatedTaskArray;

  // console.log(column.tasks)
  // console.log(boardData);
}

function InsertData(taskId, task){
  let newTask = {
    "id":taskId,
    "task":task
   };

   boardData[0].tasks.push(newTask);
   counter++;
}

function UpdateTaskTitle(colId, taskId, task){
   if(boardData[colId].tasks.id === taskId) {
    boardData[colId].tasks.task = task;
   }
   
   console.log(JSON.stringify(boardData, null, 2));
}
