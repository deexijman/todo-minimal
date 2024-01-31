// all storage

var allTodods = []
var completedTasks = []


const addtask = () =>{

    // get value from the #task-name-entry

    var taskinput = document.getElementById("task-name-entry")


    if(taskinput.value===''){
        alert("enter some task please")
        taskinput.value = ''
        return
    }

    if(allTodods.includes(taskinput.value)){
        alert("task already present")
        taskinput.value = ''
        return 
    }
    
    var todolayer = document.getElementsByClassName('todos-layer')[0];
    var newTodo = createToDoTask(taskinput.value)
    todolayer.appendChild(newTodo)
    taskinput.value = ''
}

const emptyTodoAlert = (emptymsg,classname) =>{

    const alerttext = document.createElement("h5");
    const parent = document.getElementsByClassName(classname)[0];
    
    alerttext.textContent = emptymsg;
    alerttext.classList.add("p-5");

    if(classname==='todos-layer'){
        alerttext.id = "alertmsg-todo"; // id to be counted on
    } else {
        alerttext.id = "alertmsg-complete"; // id to be counted on
    }
    
    parent.appendChild(alerttext);  

}

const createCompletedTasksDiv = (newlyCompletedTask) =>{
    const todoElement = document.createElement('div');

    // Set the necessary classes for the element
    todoElement.classList.add('single-todo-element','align-items-center', 'd-flex', 'justify-content-center', 'border', 'border-3', 'p-3', 'm-3', 'flex-nowrap');
    
    // Create the child elements
    const taskName = document.createElement('h5');
    taskName.classList.add("p-2","m-2")
    taskName.textContent = newlyCompletedTask; // Placeholder for actual task name

    todoElement.appendChild(taskName)

    var parent = document.getElementsByClassName("completed-tasks")[0]
    parent.appendChild(todoElement)
}

const createToDoTask = (taskname) =>{

    // store in array
    allTodods.push(taskname)

    console.log(allTodods)

    checkEmptyAlert()

    const todoElement = document.createElement('div');

    // Set the necessary classes for the element
    todoElement.classList.add('single-todo-element','align-items-center', 'd-flex', 'justify-content-between', 'border', 'border-3', 'p-3', 'm-3', 'flex-nowrap');
    
    // Create the child elements
    const taskName = document.createElement('h5');
    taskName.classList.add("p-2","m-2")
    taskName.textContent = taskname; // Placeholder for actual task name

    var longStoredTaskName = taskname
    var todoStorageContainer = taskName

    const buttonContainer = document.createElement('div');
    const completeButton = document.createElement('input');
    completeButton.type = 'button';
    completeButton.value = '✔️'
    completeButton.classList.add("p-2","m-2","btn","btn-light")
    completeButton.addEventListener('click', () => {
        const parentElement = completeButton.parentNode.parentNode; // Get the parent element
      
        if (parentElement) { // Check if the parent element exists
          parentElement.parentNode.removeChild(parentElement); // Remove the parent
          console.log(longStoredTaskName, "i want")
          createCompletedTasksDiv(longStoredTaskName)

          checkEmptyAlert()
        }
    });
    

    const editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.value = '🖊️';
    editButton.classList.add("p-2","m-2","btn","btn-light")
    editButton.addEventListener('click', () => {
        console.log('edit button pressed',taskName)

        let editedTask = "";

        while (editedTask === "") {
            editedTask = prompt("Kindly re-enter a task name : ", "Make sure to enter something");
        }

        longStoredTaskName = editedTask
        taskName.innerHTML = editedTask
    });
    

    const removeButton = document.createElement('input');
    removeButton.type = 'button';
    removeButton.value = '❌';
    removeButton.classList.add("p-2","m-2","btn","btn-light")
    removeButton.addEventListener('click', () => {
        const parentElement = completeButton.parentNode.parentNode; // Get the parent element
      
        if (parentElement) { // Check if the parent element exists
          parentElement.parentNode.removeChild(parentElement); // Remove the parent
          console.log("task deleted", longStoredTaskName)
          checkEmptyAlert()
          allTodods.pop(longStoredTaskName)
        }
    });

    // Append the child elements
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(removeButton);

    todoElement.appendChild(taskName);
    todoElement.appendChild(buttonContainer);

    return todoElement
}

function removeEmptyAlert(toBeRemovedId){
    var elementToRemove = document.getElementById(toBeRemovedId)

    if(elementToRemove===null){
        return
    }

    if (elementToRemove.parentNode!==undefined) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

function checkEmptyAlert(){
    var todoChildCountInForm = document.getElementsByClassName('todos-layer')[0].childElementCount;
    var completeChildCountInForm = document.getElementsByClassName('completed-tasks')[0].childElementCount;
    
    // check todo : dom empty || localstorage empty
    if(todoChildCountInForm===0){
        // append a text saying there isn't any tasks
        emptyTodoAlert("NO TODOS ADDED",'todos-layer')
    } else {
        removeEmptyAlert('alertmsg-todo')
    }

    // check completed : dom empty || localstorage empty
    if(completeChildCountInForm===0){
        // append a text saying there isn't any tasks
        emptyTodoAlert("DON'T PROCRASTINATE",'completed-tasks')
    } else {
        removeEmptyAlert('alertmsg-complete')
    }
}

// to give the alert element
window.addEventListener('load', ()=>{

    //let msg = getFromAnotherModule()
    console.log("Document loaded")

    checkEmptyAlert()

});

