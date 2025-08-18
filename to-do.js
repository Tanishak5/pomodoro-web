

const taskInput = document.getElementById("to-do-task");
const taskList = document.getElementById("task-list");
const form = document.getElementById("task-form");
const clear = document.getElementById("clear");

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.id = `task-${task.id}`
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done || false;

    checkbox.addEventListener("change", async () => {
        task.done = checkbox.checked;
        if (task.done){li.classList.add('done');}
        else{
            li.classList.remove('done');
        }

        await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: task.done })

        })

    });

    const label = document.createElement("label");
    label.textContent = task.title;


    li.appendChild(checkbox);
    li.appendChild(label);
    taskList.appendChild(li);
}


async function loadTasks() {
    const res = await fetch("http://127.0.0.1:5000/tasks");
    const tasks = await res.json();

    taskList.innerHTML = "";
    tasks.forEach(addTaskToDOM);
      
  }

clear.addEventListener("click", async ()=>{
    const allTasks = document.querySelectorAll("li");
    for(const task of allTasks){
        const taskId = task.id.split('-')[1]; //gets the number part
        await deleteTask(taskId);
    }
    loadTasks();
})

async function deleteTask(taskId){
    
    await fetch(`http://127.0.0.1:5000/tasks/${taskId}`, {
        method: "DELETE", 
    });

}



form.addEventListener("submit", async(e) =>{
    e.preventDefault(); // no reload
    const addedTask = taskInput.value.trim();
    if(!addedTask) return;

    const res = await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: addedTask })
    });

    const task = await res.json();
    addTaskToDOM(task);
    taskInput.value=""
    

});

loadTasks();