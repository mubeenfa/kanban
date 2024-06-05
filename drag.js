const draggables = document.querySelectorAll(".task-card");
const droppables = document.querySelectorAll(".dropzone");

draggables.forEach(task => {
  task.addEventListener("dragstart", () => {
    task.classList.add("isdragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("isdragging");
  });
});

droppables.forEach(dropZone => {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertThisTask(dropZone, e.clientY);
    const currentTask = document.querySelector(".isdragging");
    
    if(!bottomTask) {
      dropZone.appendChild(currentTask)
    }
    else {
      dropZone.insertBefore(currentTask, bottomTask)
    }
  })
})

const insertThisTask = (dropZone, mouseYPos) => {
  const element = dropZone.querySelectorAll(".task-card:not(.isdragging");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  element.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseYPos - top;

    if(offset < 0 && offset > closestOffset) {
      closestTask = task;
      closestOffset = offset;
    }
  });

  return closestTask;
}