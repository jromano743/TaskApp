document.getElementById('formTask').addEventListener('submit', saveTask)

function saveTask(e) {
    //Carga de los valores del formulario
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value

    let task = {
        title,
        description
    }

    if(localStorage.getItem('tasks') === null){
        let tasks = []
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }else{
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    getTasks()
    document.getElementById('formTask').reset()
    e.preventDefault()
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let tasksView = document.getElementById('tasks')
    tasksView.innerHTML = ''
    for(let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
    
        tasksView.innerHTML += 
        `<div class="card mb-3"  style="border: 2px solid; border-radius: 15px;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="#" onclick="deleteTask('${title}', '${description}')" class="btn btn-danger">Delete</a>
            </div>
        </div>`
    }
}

function deleteTask(title, description){
    let tasks = JSON.parse(localStorage.getItem('tasks'))

    for(let i=0;i<tasks.length;i++){
        if(tasks[i].title == title && tasks[i].description == description){
            tasks.splice(i, 1)
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    getTasks()
}
getTasks()