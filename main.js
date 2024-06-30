const btn_AddTask = document.querySelector(".add-button");
const btn_EditTask = document.querySelector(".edit-task");
const btn_DeleteTask = document.querySelector(".delete-button");

const inp_Task = document.getElementById("input-task");

const todoParent = document.getElementById("todo-drop-area");
const inProgressParent = document.getElementById("inprogress-drop-area");
const completeParent = document.getElementById("complete-drop-area");
const mainDiv = document.querySelector(".main")
const taskDetailPanel = document.querySelector(".task-detail-panel");

const dueDateToggle = document.getElementById("duedatetoggle");
const endDate = document.getElementById("enddate");
const startdate = document.getElementById("startdate");
const taskDueDate = document.getElementById("taskduedate");

const ddButtons = document.querySelectorAll(".priority-button");
const taskPriorityButton = document.getElementById("task-priority-button");
const ddStatusButtons = document.querySelectorAll(".status-button");
const taskStatusButton = document.getElementById("task-status-button");
const header = document.getElementsByClassName("detail-header")

const panelTaskTitle = document.getElementById("panel-tasktitle");
const panelTaskDueDate = document.getElementById("startdate");
const panelTaskEndDate = document.getElementById("enddate");
const panelTaskEstimate = document.getElementById("estimate-input");
const panelTaskDescription = document.getElementById("task-description");

let currentActiveTask;
let currentActiveCol;

// drag and drop
let currentColIndex;
let targetColIndex;
let taskMovedIndex;

let currentOpenedTask;

let currentTaskStatus = "Todo";

const boardData = [
  {
    colId: 1,
    colName: "ToDo",
    tasks: [],
  },
  {
    colId: 2,
    colName: "In Progress",
    tasks: [],
  },
  {
    colId: 3,
    colName: "Complete",
    tasks: [],
  },
];

let currentTaskDetails = {
  "id":0,
  "taskTitle": "",
  "statusType":"ToDo",
  "dueDate": "",
  "endDate": "",
  "estimates": 0,
  "priority": "Low",
  "taskDescription": "",
};

let counter = 1;

function ToggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

btn_AddTask.addEventListener("click", (e) => {
  e.preventDefault();

  if (inp_Task.value != "") {
    GenerateTaskSlab(inp_Task.value, counter);

    InsertData(counter, inp_Task.value);

    inp_Task.value = "";
  }
});

function GenerateTaskSlab(taskTitle, id) {
  const newTask = document.createElement("div");
  newTask.classList = "task-card";
  newTask.id = `${"task_" + id}`;
  newTask.draggable = true;

  const inputTask = document.createElement("input");
  inputTask.classList = "task";
  inputTask.disabled = true;
  inputTask.value = taskTitle;

  const actionButtons = document.createElement("div");
  actionButtons.classList = "actionbtns";

  const openButton = document.createElement("button");
  openButton.classList = "openbtn";

  const editButton = document.createElement("button");
  editButton.classList = "editbtn";

  const deleteButton = document.createElement("button");
  deleteButton.classList = "deletebtn";

  actionButtons.appendChild(openButton);
  actionButtons.appendChild(editButton);
  actionButtons.appendChild(deleteButton);

  newTask.appendChild(actionButtons);
  newTask.appendChild(inputTask);

  editButton.addEventListener("click", function (event) {
    Edit(event);
  });

  deleteButton.addEventListener("click", function (event) {
    Delete(event);
  });

  openButton.addEventListener("click", function (event) {
    Open(event);
  });

  inputTask.addEventListener("focusout", function (event) {
    EditTaskTitleOnChange(event);
  });

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("isdragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("isdragging");
  });

  todoParent.appendChild(newTask);
}

// ============== Manage Task ===========
function Edit(e) {
  const inputField =
    e.target.parentElement.parentElement.querySelector("input");
  inputField.disabled = false;

  // const colId = e.target.parentElement.parentElement;
}

function Delete(e) {
  const task = e.target.parentElement.parentElement;
  // console.log(task)
  const colId = CheckColumn(task.parentElement.id);
  // console.log(colId)
  
  const id = parseInt(task.id.split("_")[1]);

  DeleteData(task, colId, id);
}

function Open(e) {
  const taskCard = e.target.parentElement.parentElement;
  const colId = CheckColumn(taskCard.parentElement.id);
  const id = parseInt(taskCard.id.split("_")[1]);

  OpenTask(taskCard, colId, id);
}

function EditTaskTitleOnChange(e) {
  const inputField = e.target.parentElement.querySelector("input");
  const taskId = inputField.parentElement.id.split("_");
  console.log(inputField.parentElement.id)
  const columnEle = inputField.parentElement.parentElement;

  let colId = CheckColumn(columnEle.id);

  inputField.disabled = true;
  console.log(colId +" - "+taskId[1] +" - "+ inputField.value);

  UpdateTaskTitle(colId, taskId[1], inputField.value);
}

// =========== Detail Panel ===============

function EditPanel_TitleOnChange(e) {
  const inputField = e.target.querySelector("input");
  // console.log(e.target.value)
  const label = e.target.parentElement.querySelector("label").id;
  // console.log(label)

  const col_Task_Id = label.split("-")

  UpdateTaskFields(col_Task_Id[0], col_Task_Id[1], e.target.value, "", "", "", "", "", "");
}

function EditPanel_StatusOnChange(e) {
  const inputField = e.target.querySelector("input");
  // console.log(e.target.value)
  const label = e.target.parentElement.querySelector("label").id;
  // console.log(label)

  const col_Task_Id = label.split("-")

  UpdateTaskFields(col_Task_Id[0], col_Task_Id[1], "", e.target.value, "", "", "", "", "");
}

function EditPanel_StartDateOnChange(e) {
  const inputField = e.target.querySelector("input");
  // console.log(e.target.value)
  const label = e.target.parentElement.querySelector("label").id;
  // console.log(label)

  const col_Task_Id = label.split("-")

  UpdateTaskFields(col_Task_Id[0], col_Task_Id[1], e.target.value, "", "", "", "", "", "");
}

function EditPanel_EndDateOnChange(e) {
  const inputField = e.target.querySelector("input");
  // console.log(e.target.value)
  const label = e.target.parentElement.querySelector("label").id;
  // console.log(label)

  const col_Task_Id = label.split("-")

  UpdateTaskFields(col_Task_Id[0], col_Task_Id[1], e.target.value, "", "", "", "", "", "");
}

function EditPanel_EstimateOnChange(e) {
  const inputField = e.target.querySelector("input");
  // console.log(e.target.value)
  const label = e.target.parentElement.querySelector("label").id;
  // console.log(label)

  const col_Task_Id = label.split("-")

  UpdateTaskFields(col_Task_Id[0], col_Task_Id[1], e.target.value, "", "", "", "", "", "");
}

function EditPanel_PriorityOnChange(e) {
  const inputField = e.target.querySelector("input");
  // console.log(e.target.value)
  const label = e.target.parentElement.querySelector("label").id;
  // console.log(label)

  const col_Task_Id = label.split("-")

  UpdateTaskFields(col_Task_Id[0], col_Task_Id[1], e.target.value, "", "", "", "", "", "");
}

function EditPanel_DescriptionOnChange(e) {
  const inputField = e.target.querySelector("input");
  // console.log(e.target.value)
  const label = e.target.parentElement.querySelector("label").id;
  // console.log(label)

  const col_Task_Id = label.split("-")

  UpdateTaskFields(col_Task_Id[0], col_Task_Id[1], e.target.value, "", "", "", "", "", "");
}
// =================================

function CheckColumn(col) {
  let colId;
  if (col === "todo-drop-area") {
    colId = 0;
  } else if (col === "inprogress-drop-area") {
    colId = 1;
  } else if (col === "complete-drop-area") {
    colId = 2;
  }

  return colId;
}
// ======================================

// ========== Task CRUD ===============
function OpenTask(taskCard, colId, taskId) {
  taskDetailPanel.classList.add("task-panel-active");
  mainDiv.style["width"] = "60%";

  console.log(header[0])
  // console.log(header[0].childNodes[5])
  header[0].childNodes[5].id = "";
  header[0].childNodes[5].id = `${colId}-${taskId}`;

  console.log(colId+"-"+taskId)

  currentActiveCol = colId;
  currentActiveTask = taskId;

  let tasks = boardData[currentActiveCol].tasks;
  let task = tasks.find(tk => tk.id === parseInt(currentActiveTask));

  // console.log(task)

  panelTaskTitle.addEventListener("focusout", function (event) {
    EditPanel_TitleOnChange(event);
  });

  panelTaskTitle.value = task.taskTitle
  taskStatusButton.innerHTML = task.statusType
  panelTaskDueDate.innerHTML = task.dueDate
  panelTaskEndDate.innerHTML = task.endDate
  panelTaskEstimate.innerHTML = task.estimates
  taskPriorityButton.innerHTML = task.priority
  panelTaskDescription.innerHTML = task.taskDescription

  //console.log(taskCard.id+"-"+colId+"-"+taskId)
}

function DeleteData(taskDiv, colId, taskId) {
  const column = boardData[colId];
  if (column) {
    const taskArray = column.tasks;

    // Filter out the task with the specified taskId
    const updatedTaskArray = taskArray.filter((task) => {
      // console.log(`Checking task with id ${task.id}`);  // Debug: Log task IDs being checked
      return task.id !== taskId;
    });

    // Reassign the filtered tasks back to the column's tasks
    column.tasks = updatedTaskArray;

    const taskDiv = document.getElementById(`task_${taskId}`);

    if (taskDiv) {
      taskDiv.remove();
    }
  } else {
    console.log("Column not found");
  }
}

function InsertData(taskId, task) {
  let taskDetails = {
    "id":taskId,
    "taskTitle": task,
    "statusType":"Todo",
    "dueDate": "",
    "endDate": "",
    "estimates": 0,
    "priority": "Low",
    "taskDescription": "",
  };

  if (boardData[1].tasks.id != taskId) {
    boardData[0].tasks.push(taskDetails);
  }
  else {
    console.log(`Task with ID ${taskId} already exists `)
  }
   console.log(JSON.stringify(boardData, null, 2));
  counter++;
}

function UpdateTaskTitle(colId, taskId, task) {

  let taskArray = boardData[parseInt(colId)].tasks
  console.log(taskArray)
  
  let taskToUpdate = taskArray.find(tk => tk.id === parseInt(taskId))
  console.log(taskToUpdate)

  if (taskToUpdate) {
    taskToUpdate.taskTitle = task;
  }
}

function UpdateTaskFields(colId, taskId, title, status, stDate, endDate, estimate, priority, description) {

  let taskArray = boardData[parseInt(colId)].tasks
  // console.log(taskArray)
  
  let taskToUpdate = taskArray.find(tk => tk.id === parseInt(taskId))
  // console.log(taskToUpdate)

  if (taskToUpdate) {
    if(taskToUpdate.taskTitle != "")
          taskToUpdate.taskTitle = title;

    if(taskToUpdate.statusType != "")
      taskToUpdate.statusType = status;

    if(taskToUpdate.dueDate != "")
      taskToUpdate.dueDate = stDate;

    if(taskToUpdate.endDate != "")
      taskToUpdate.endDate = endDate;

    if(taskToUpdate.estimates != "")
      taskToUpdate.estimates = estimate;

    if(taskToUpdate.priority != "")
      taskToUpdate.priority = priority;

    if(taskToUpdate.taskDescription != "")
      taskToUpdate.taskDescription = description;
  }
}
// ======================================

// ========== Manage Task Details ==============

dueDateToggle.addEventListener("change", (e) => {
  if (e.currentTarget.checked) {
    endDate.classList.remove("enddate-active");
    taskDueDate.style.width = "100%";
    startdate.style.width = "50%";
    endDate.style.width = "50%";
  } else {
    endDate.classList.add("enddate-active");
    taskDueDate.style.width = "50%";
    startdate.style.width = "100%";
    endDate.style.width = "100%";
  }
});

function PriorityDropDownBtn(e) {
  const dropdown = document.getElementById("priority-dropdown");
  dropdown.classList.toggle("show");
}

function StatusDropDownBtn(e) {
  const dropdown = document.getElementById("status-dropdown");
  dropdown.classList.toggle("show");
}

function ToggleTaskPanel(e) {
  taskDetailPanel.classList.remove("task-panel-active");
  
  mainDiv.style["width"] = "100%";
}

ddButtons.forEach(function (btns) {
  btns.addEventListener("click", (e) => {
    const priorityButtonId = e.target;

    let tasks = GetColumnTasks(currentActiveCol);
    let task = GetTask(tasks, currentActiveTask);

    let priorityStatus;
    if(priorityButtonId.id === "low"){
      priorityStatus = "Low"
    }
    else if(priorityButtonId === "medium"){
      priorityStatus = "Medium"
    }
    else {
      priorityStatus = "High"
    }
    task.priority = priorityStatus;

    const sourceStyle = getComputedStyle(priorityButtonId);
    const backgroundColor = sourceStyle.backgroundColor;

    taskPriorityButton.style.backgroundColor = backgroundColor;

    taskPriorityButton.innerHTML = priorityButtonId.innerHTML;

    PriorityDropDownBtn();
  });
});

ddStatusButtons.forEach(function (btns) {
  btns.addEventListener("click", (e) => {
    const selectedStatusButton = e.target;

    let tasks = GetColumnTasks(currentActiveCol);
    let task = GetTask(tasks, currentActiveTask);

    console.log(currentActiveCol+"-"+currentActiveTask)

    let statusType;
    if(selectedStatusButton.id === "todo"){
      statusType = "Todo"
    }
    else if(selectedStatusButton === "inprogress"){
      statusType = "In Progress"
    }
    else {
      statusType = "Complete"
    }
    task.statusType = statusType;

    const sourceStyle = getComputedStyle(selectedStatusButton);
    const backgroundColor = sourceStyle.backgroundColor;

    taskStatusButton.style.backgroundColor = backgroundColor;

    taskStatusButton.innerHTML = selectedStatusButton.innerHTML;

    StatusDropDownBtn();

    // console.log(JSON.stringify(boardData, null, 2));
  });
});

function ChangeBtnColor(btn) {
  const sourceStyle = getComputedStyle(btn);
  return sourceStyle.backgroundColor;
}

function CheckTaskStatus(value) {
  let statusType;
  if(value === "todo" || value === "Todo"){
    statusType = "Todo"
  }
  else if(value === "inprogress" || value === "In Progress"){
    statusType = "In Progress"
  }
  else {
    statusType = "Complete"
  }
  return statusType;
}

function GetColumnTasks(colId) {
  return boardData[colId].tasks;
}

function GetTask(tasks, taskId) {
  return tasks.find(tk => tk.id === parseInt(taskId));
}

window.onclick = function (event) {
  if (!event.target.matches("#task-priority-button")) {
    var sharedowns = document.getElementsByClassName("prioritydd");
    var i;
    for (i = 0; i < sharedowns.length; i++) {
      var openSharedown = sharedowns[i];
      if (openSharedown.classList.contains("show")) {
        openSharedown.classList.remove("show");
      }
    }
  }
  if (!event.target.matches("#task-status-button")) {
    var sharedowns = document.getElementsByClassName("statusdd");
    var i;
    for (i = 0; i < sharedowns.length; i++) {
      var openSharedown = sharedowns[i];
      if (openSharedown.classList.contains("show")) {
        openSharedown.classList.remove("show");
      }
    }
  }
};

document.getElementById("priority-dropdown")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

document.getElementById("status-dropdown")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

