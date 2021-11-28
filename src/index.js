import "./styles.css";

let taskList = [];
// localStorage.clear();
let recieved = localStorage.getItem("completedTask");
console.log("recieved", typeof recieved);
let tempvar = JSON.parse(recieved);
let doneTask = tempvar ? tempvar : [];

let addListen = (tasks, index, array) => {
  let tem = document.getElementById(`${tasks.uid}-done`);
  tem.addEventListener("click", function () {
    handleDone(tasks);
  });
  let temp = document.getElementById(`${tasks.uid}-del`);
  temp.addEventListener("click", function () {
    handleDel(tasks);
  });
  let temp2 = document.getElementById(`${tasks.uid}-edit`);
  temp2.addEventListener("click", function () {
    handleEdit(tasks);
  });
};

let handleEdit = (tasks) => {
  let edited = prompt("Enter the changed task:", `${tasks.task}`);
  if (edited) {
    tasks.task = edited;
  }
  showTasks();
};

let handleDel = (task) => {
  let temp1 = taskList.filter((value, index, array) => {
    return value.uid !== task.uid;
  });
  taskList = [...temp1];
  let heading = document.getElementById("task-heading");
  heading.innerHTML = `Pending Tasks (${taskList.length})`;
  showTasks();
};

let handleDone = (task) => {
  doneTask.push(task);
  localStorage.setItem("completedTask", JSON.stringify(doneTask));
  let doneList = "";
  doneTask.forEach((tasks) => {
    doneList += `<div class='done-list-ele' ><div class='done-list-ele-task'>${tasks.task}</div><div class='undo-btn' id='${tasks.uid}-undo' >Undo Task</div></div></br>`;
  });
  handleDel(task);
  showDone(doneList);
};

let handleDoneStart = () => {
  let doneList = "";
  doneTask.forEach((tasks) => {
    doneList += `<div class='done-list-ele'><div class='done-list-ele-task'>${tasks.task}</div><div class='undo-btn' id='${tasks.uid}-undo' >Undo Task</div></div></br>`;
  });
  showDone(doneList);
};

let handleSubmit = () => {
  let newTask = document.getElementById("newTask-input");
  newTask.value = newTask.value.trim();
  if (newTask.value !== "") {
    let uid = Math.random() * Math.random() * Math.random();
    console.log(uid);
    taskList.push({ uid: uid, task: newTask.value });
    newTask.value = "";
    let heading = document.getElementById("task-heading");
    heading.innerHTML = `Pending Tasks (${taskList.length})`;
    showTasks();
  }
};

let submit = document.getElementById("add");
if (submit) submit.addEventListener("click", handleSubmit);
let input = document.getElementById("newTask-input");
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add").click();
  }
});

let addListenUndo = (value, index, array) => {
  let val = document.getElementById(`${value.uid}-undo`);
  val.addEventListener("click", () => {
    handleUndo(value);
  });
};

let handleUndo = (value) => {
  console.log(value);

  let temp1 = doneTask.filter((tasks, index, array) => {
    return tasks.uid !== value.uid;
  });
  doneTask = [...temp1];
  localStorage.setItem("completedTask", JSON.stringify(doneTask));
  handleDoneStart();
  taskList.push(value);
  let heading = document.getElementById("task-heading");
  heading.innerHTML = `Pending Tasks (${taskList.length})`;
  showTasks();
};

let showTasks = () => {
  let list = "";
  taskList.forEach((tasks) => {
    list +=
      `<div class="current-list-ele"><div class='current-list-ele-task'>` +
      tasks.task +
      `</div><div class='current-btns'><div class='edit-btn' id="${tasks.uid}-edit" >Edit</div><div class="done-btn" id="${tasks.uid}-done" >&#10004;</div><div class="del-btn" id="${tasks.uid}-del" >&times;</div></div></div></br>`;
  });
  document.getElementById("task-list").innerHTML = list;
  taskList.forEach(addListen);
};
let showDone = (doneList) => {
  let element = document.getElementById("done-list");
  element.innerHTML = doneList;
  doneTask.forEach(addListenUndo);
};
showTasks();
handleDoneStart();
