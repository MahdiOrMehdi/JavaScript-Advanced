const taskList = document.getElementById("taskList");
const modal = document.getElementById("taskModal");
const addBtn = document.getElementById("addTaskBtn");
const saveBtn = document.getElementById("saveBtn");
const titleInput = document.getElementById("taskTitle");
const textInput = document.getElementById("taskText");
const modalTitle = document.getElementById("modalTitle");

const taskManager = (function(){
  let tasks = JSON.parse(localStorage.getItem('tasks')) || []
  function save() { localStorage.setItem('tasks', JSON.stringify(tasks)) }

  return {
    get: ()=> tasks,
    add: (task)=> { tasks.push(task); save() },
    remove: (index)=> { tasks.splice(index, 1); save() },
    update: (index, task)=> { tasks[index] = task; save() },
    complete: (index, bool)=> { tasks[index].completed = bool ? Number(bool) : 0; save() }
  }
})();

let editIndex = null
addBtn.addEventListener('click', ()=> {
  editIndex = null
  modalTitle.textContent = 'تسک جدید'
  titleInput.value = ''
  textInput.value = ''
  modal.showModal()
})

saveBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  if (!titleInput.value.trim() || !textInput.value.trim()) {
    alert('لطفا عنوان و توضیحات را وارد کنید')
    return
  }

  const newTask = {
    title: titleInput.value,
    description: textInput.value,
    date: new Date().toLocaleString("fa-IR"),
    completed: 0
  }
  if(editIndex !== null){
    taskManager.update(editIndex, newTask)
  }else{
    taskManager.add(newTask)
  }
  modal.close()
  render()
})


function deleteTask(i) {
  taskManager.remove(i)
  render()
}

function completeTask(i, bool) {
  taskManager.complete(i, bool)
  render()
}

window.editTask = (i) => {
  editIndex = i;
  const t = taskManager.get()[i];
  modalTitle.textContent = "ویرایش تسک";
  titleInput.value = t.title;
  textInput.value = t.description;
  modal.showModal();
};

render()

function render(){
  taskList.innerHTML = ''
  taskManager.get().forEach((task, i) => {
    const li = document.createElement('li')
    li.style.backgroundColor = task.completed === 1 ? "#16a34a" : task.completed === 2 ? "#dc2626" : "";
    li.innerHTML = `<div class="task-header">
            <span class="task-title">${task.title}</span>
            <div class="task-actions">
              <button class="yellow fs_2x shadow" 
              title="ویرایش" 
              onclick="editTask(${i})">&#9998;</button>
              
              <button class="red fs_2x " 
              title="حذف" 
              onclick="deleteTask(${i})">&#x1F5D1; </button>

              <button class="green fs_2x " 
              title="تکمیل" 
              onclick="completeTask(${i}, 1)" >&#x2611;</button>

              <button class="orange fs_2x " 
              title="عدم تکمیل" 
              onclick="completeTask(${i}, 2)" >&#10006;</button>
            </div>
          </div>
          <div>${task.description}</div>
          <div class="task-date">${task.date}</div>`
    taskList.appendChild(li)
  });
}