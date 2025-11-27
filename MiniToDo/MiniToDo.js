let Tasks = []

const addbtn = document.getElementById('add-btn')
const Modal = document.getElementById('addModal')
const closebtn = document.getElementById('closebtn')
// Open Modal btn
addbtn.addEventListener('click', ()=> {
  Modal.style.display = 'flex'
})


// Close Modal btn
closebtn.addEventListener('click', ()=> {
  Modal.style.display = 'none'
  form.reset()
})


// Make New Task
const form = document.getElementById('modal-form')
form.addEventListener('submit', function(e) {
    e.preventDefault()
    const TitleInput = document.getElementById('title-input')
    const DescriptionInput = document.getElementById('description-text')
    const now = new Date()
    const date = now.getTime()
    
    const NewTask = {
      title: TitleInput.value,
      description: DescriptionInput.value,
      id: date,
      done: false,
      NotDone: false
    }

    Tasks.push(NewTask)
    TaskF()
    form.reset()
    Modal.style.display = 'none'
    localStorage.setItem('Tasks', JSON.stringify(Tasks))
})


// Load Tasks
const Cards = document.getElementById('tasks')
const tasksList = document.getElementById('tasksList')
function TaskF() {
  tasksList.innerHTML = ''
  Tasks.forEach((task)=> {
    const Card = document.createElement('article')
    Card.className = 'task-card'
    Card.innerHTML  = `<div class="task-top">
            <div class="task-title">${task.title}</div>
            <div class="task-icons">
              <button onclick='Edit(${task.id})' class="icon-btn edit"  title="ویرایش" aria-label="ویرایش">
                <!-- pencil icon -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21l3-1 11-11 2 2L8 22 3 21zM20.7 7.3l-2-2 1-1c.4-.4 1-.4 1.4 0l.6.6c.4.4.4 1 0 1.4l-1 1z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button onclick='Delete(${task.id})' class="icon-btn delete" tite="حذف" aria-label="حذف">
                <!-- trash icon -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6h18v2H3V6zm2 3h14l-1 11H6L5 9zm3-6h6v2H8V3z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                class="icon-btn mark-done"
                title="انجام شده"
                aria-label="انجام شده"
                onclick="Done(${task.id})"
              >
                <!-- check icon -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                class="icon-btn mark-fail"
                title="انجام نشده"
                aria-label="انجام نشده"
                onclick="Fail(${task.id})"
              >
                <!-- cross icon -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3 5.71L12 12l6.3 6.29-1.41 1.41L10.59 13.4 4.29 19.7 2.88 18.29 9.18 12 2.88 5.71 4.29 4.3 10.59 10.6 16.88 4.3z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="task-desc">${task.description}</div>`
    if (task.done) {
      Card.style.backgroundColor = '#b0f5c0ff'
    }else if (task.NotDone) {
      Card.style.backgroundColor = '#f1a8aeff'
    }else {
      Card.style.backgroundColor = ''
    }
    tasksList.appendChild(Card)
})
}


// Delete Tasks
function Delete(TaskId) {
  const index = Tasks.findIndex(i => i.id === TaskId);
  if (index !== -1) {
    Tasks.splice(index, 1);
    localStorage.setItem('Tasks', JSON.stringify(Tasks))
    TaskF()
  }
  if (Tasks.length === 0) {
    localStorage.removeItem('Tasks')
    tasksList.innerHTML = `<p>هنوز هیچ تسکی ثبت نشده است.</p>`
  }
}


// Edit Tasks
let currentEditId = null
const EditForm = document.getElementById('Edit-form')
const EditModal = document.getElementById('EditModal')
function Edit(TaskId) {
  currentEditId = TaskId
  const task = Tasks.find(i => i.id === TaskId)
  if (task) {
    document.getElementById('title-Edit').value = task.title
    document.getElementById('description-Edit').value = task.description
  }
  EditModal.style.display = 'flex'
}

EditForm.addEventListener('submit', function(e) {
  e.preventDefault()
  if (currentEditId === null) return

  const TitleInput = document.getElementById('title-Edit').value.trim()
  const DescriptionInput = document.getElementById('description-Edit').value.trim()

  const task = Tasks.find(i => i.id === currentEditId)
  if (task) {
    task.title = TitleInput
    task.description = DescriptionInput
    TaskF()
  }

  EditModal.style.display = 'none'
  EditForm.reset()
  currentEditId = null
  localStorage.setItem('Tasks', JSON.stringify(Tasks))
})


// Close Edit Modal btn
const closebtnEdit = document.getElementById('closebtnEdit')
closebtnEdit.addEventListener('click', ()=> {
  EditModal.style.display = 'none'
  EditForm.reset()
})


// Mark Done Tasks
function Done(TaskId) {
  const task = Tasks.find(i => i.id === TaskId)
  if (task) {
    task.done = true
    task.NotDone = false
    localStorage.setItem('Tasks', JSON.stringify(Tasks))
    TaskF()
  }
}


// Mark Fail Tasks
function Fail(TaskId) {
  const task = Tasks.find(i => i.id === TaskId)
  if (task) {
    task.NotDone = true
    task.done = false
    localStorage.setItem('Tasks', JSON.stringify(Tasks))
    TaskF()
  }
}


// Load Saved Tasks from localStorage
const SavedTasks = JSON.parse(localStorage.getItem('Tasks'))
if (SavedTasks) {
  Tasks = SavedTasks
  TaskF()
}