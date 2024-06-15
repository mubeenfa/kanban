const btn_AddTask = document.querySelector(".add-button");
const btn_EditTask = document.querySelector(".edit-task");
const btn_DeleteTask = document.querySelector(".delete-button");

const inp_Task = document.getElementById("input-task");

const todoParent = document.getElementById("todo-drop-area");
const inProgressParent = document.getElementById("inprogress-drop-area");
const completeParent = document.getElementById("complete-drop-area");

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

const taskDetails = {
  taskTitle: "",
  dueDate: "",
  endDate: "",
  estimates: 0,
  priority: "",
  taskDescription: "",
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

  const editButton = document.createElement("button");
  editButton.classList = "editbtn";

  const deleteButton = document.createElement("button");
  deleteButton.classList = "deletebtn";

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

  const colId = e.target.parentElement.parentElement;
}

function Delete(e) {
  const task = e.target.parentElement.parentElement;
  const colId = CheckColumn(task.parentElement);
  const id = parseInt(task.id.split("_")[1]);

  DeleteData(task, colId, id);
}

function OpenTask(e) {
  const task = e.target.parentElement.parentElement;
  const colId = CheckColumn(task.parentElement);
  const id = parseInt(task.id.split("_")[1]);
}

function EditTaskTitleOnChange(e) {
  const inputField =
    e.target.parentElement.parentElement.querySelector("input");
  const taskId = inputField.parentElement.id.split("_");
  const columnEle = inputField.parentElement.parentElement;

  let colId = CheckColumn(columnEle.id);

  inputField.disabled = true;
  UpdateTaskTitle(colId, taskId[1], inputField.value);
}

function CheckColumn(col) {
  let colId;
  if (col.id === "todo-drop-area") {
    colId = 1;
  } else if (col.id === "inprogress-drop-area") {
    colId = 2;
  } else if (col.id === "complete-drop-area") {
    colId = 3;
  }

  return colId;
}
// ======================================

// ========== Task CRUD ===============
function DeleteData(taskDiv, colId, taskId) {
  // Find the column with the given colId
  const column = boardData.find((col) => col.colId === colId);

  // Check if the column was found
  if (column) {
    // Get the array of tasks from the found column
    const taskArray = column.tasks;
    // console.log('Original tasks:', taskArray);

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

  // const taskArray = column.tasks;
  // console.log(taskArray)
  // const updatedTaskArray = taskArray.filter(task => task.id !== taskId);
  // column.tasks = updatedTaskArray;

  // console.log(column.tasks)
  // console.log(boardData);
}

function InsertData(taskId, task) {
  let newTask = {
    id: taskId,
    task: task,
  };

  boardData[0].tasks.push(newTask);
  counter++;
}

function UpdateTaskTitle(colId, taskId, task) {
  if (boardData[colId].tasks.id === taskId) {
    boardData[colId].tasks.task = task;
  }

  console.log(JSON.stringify(boardData, null, 2));
}
// ======================================

// ========== Manage Task Details ==============
const dueDateToggle = document.getElementById("duedatetoggle");
const endDate = document.getElementById("enddate");
const startdate = document.getElementById("startdate");
const taskDueDate = document.getElementById("taskduedate");

const ddButtons = document.querySelectorAll(".priority-button");
const taskPriorityButton = document.getElementById("task-priority-button");
const ddStatusButtons = document.querySelectorAll(".status-button");
const taskStatusButton = document.getElementById("task-status-button");

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

ddButtons.forEach(function (btns) {
  btns.addEventListener("click", (e) => {
    const priorityButtonId = e.target;

    const sourceStyle = getComputedStyle(priorityButtonId);
    const backgroundColor = sourceStyle.backgroundColor;

    taskPriorityButton.style.backgroundColor = backgroundColor;

    taskPriorityButton.innerHTML = priorityButtonId.innerHTML;

    PriorityDropDownBtn();
  });
});

ddStatusButtons.forEach(function (btns) {
  btns.addEventListener("click", (e) => {
    const statusButtonId = e.target;

    const sourceStyle = getComputedStyle(statusButtonId);
    const backgroundColor = sourceStyle.backgroundColor;

    taskStatusButton.style.backgroundColor = backgroundColor;

    taskStatusButton.innerHTML = statusButtonId.innerHTML;

    StatusDropDownBtn();
  });
});

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
