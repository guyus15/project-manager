import {createEventListeners, addNewTask, removeProjectTask, deleteProject, getProjects, completeTask} from './controller';
import project from './project';

var projectNumber = 0;

const updateProjectList = (projects) => {
    const projectContainer = document.querySelector('.projects');
    const containerTitle = document.querySelector('h2.container-title');

    containerTitle.textContent = `Projects (${projects.length})`;

    while(projectContainer.hasChildNodes()){
        projectContainer.removeChild(projectContainer.lastChild);
    }

    if(projects.length > 0){
        projects.forEach((project, index) => {
            let projectElement = document.createElement('div');
            projectElement.classList.add('project');

            let projectText = document.createElement('p');
            projectText.textContent = project.title;

            projectElement.appendChild(projectText);
            
            //Determining the current project number
            projectElement.setAttribute('data-number', index);
            projectElement.addEventListener('click', e => {
                projectNumber = e.target.closest('div').dataset.number;
                viewProject(projectNumber);
            });

            projectContainer.appendChild(projectElement);
        });
    }
    else{
        let projectElement = document.createElement('div');
        projectElement.classList.add('project');

        let projectText = document.createElement('p');
        projectText.textContent = "There are no projects, create one below."

        projectElement.appendChild(projectText);
        projectContainer.appendChild(projectElement);
    }
}

const viewProject = (projectIndex) => {
    //Creating elements to be used regardless.
    const taskContainer = document.querySelector('.tasks-container');

    while (taskContainer.hasChildNodes()){
        taskContainer.removeChild(taskContainer.lastChild);
    }

    var projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title');

    var projectDesc = document.createElement('p');
    projectDesc.classList.add('project-description');

    //Checking for valid project
    if(getProjects()[projectIndex] != undefined){
        const removeProjectBtn = document.createElement('button');
        removeProjectBtn.classList.add('btn', 'danger-btn');
        removeProjectBtn.textContent = "Delete";

        removeProjectBtn.addEventListener('click', deleteProject);

        var flexContainer = document.createElement('div');
        flexContainer.classList.add('flex-container');

        flexContainer.append(projectTitle, removeProjectBtn);

        var tasksHeader = document.createElement('h4');
        tasksHeader.classList.add('tasks-header');

        var tasks = document.createElement('ol');
        tasks.classList.add('tasks');

        var addTaskBtn = document.createElement('button');
        addTaskBtn.classList.add('btn','new-task-btn');
        addTaskBtn.textContent = "+";
        addTaskBtn.addEventListener('click', () => {
            toggleForm('task');
        });

        var currentProject = getProjects()[projectIndex];

        if(currentProject.tasks.length == 0){
            tasksHeader.textContent = "There are no tasks for this project. To add tasks, click the plus icon below.";
        }
        else{
            tasksHeader.textContent = `Tasks (${currentProject.tasks.length})`;
        }

        //Rendering tasks
        currentProject.tasks.forEach((task,index) => {
            let taskElement = document.createElement('li');
            taskElement.classList.add('task');
            taskElement.setAttribute('data-number', index);

            let taskText = document.createElement('p');
            taskText.textContent = task.text;
            
            let taskDetails = document.createElement('div');
            taskDetails.classList.add('task-details');

            let taskDate = document.createElement('p');
            taskDate.classList.add('task-date');
            taskDate.textContent = `Due: ${task.getDate()}`;

            let taskCompleted = document.createElement('div');
            taskCompleted.classList.add('completed-container');
            
            taskCompleted.addEventListener('click', e => {
                const completedElement = e.target.parentNode.parentNode.dataset.number;
                completeTask(projectIndex, index);
                taskCompleted.classList.toggle('completed');
            });

            if (task.getStatus() == true){
                taskCompleted.classList.add('completed');
            }

            let deleteTaskBtn = document.createElement('button');
            deleteTaskBtn.classList.add('btn', 'danger-btn');
            deleteTaskBtn.textContent = "Delete";

            deleteTaskBtn.addEventListener('click', e => {
                let taskIndex = e.target.parentNode.dataset.number;
                removeProjectTask(projectIndex, taskIndex);
            })

            taskDetails.append(taskDate, taskCompleted);
            taskElement.append(taskText, taskDetails, deleteTaskBtn);
            tasks.appendChild(taskElement);
        });

        projectTitle.textContent = currentProject.title;
        projectDesc.textContent = currentProject.description;

        taskContainer.append(flexContainer, projectDesc, tasksHeader, tasks, addTaskBtn);
    }
    else{
        taskContainer.innerHTML = "";

        projectTitle.textContent = "No project selected";
        projectDesc.textContent = "To select a project, click on the project name in the project bar on the left.";

        taskContainer.append(projectTitle, projectDesc);
    }
}

//Toggles the create new project/create new task forms.
const toggleForm = (form) => {
    var formContainer;

    if(form == "project"){
        formContainer = document.querySelector('.project-form')
    }
    else if(form == "task"){
        formContainer = document.querySelector('.task-form')
    }

    if(getComputedStyle(formContainer).opacity == 1){
        formContainer.style.opacity = '0';
        formContainer.style.pointerEvents = 'none';
    }
    else{
        formContainer.style.opacity = '100%';
        formContainer.style.pointerEvents = 'all';
    }
}

//Resets the forms
const clearForms = () => {
    const projectTitle = document.querySelector('#project-title');
    const projectDesc = document.querySelector('#project-description');
    
    const taskText = document.querySelector('#task-text');

    projectTitle.value = "";
    projectDesc.value = "";
    taskText.value = "";
}

const currentProject = () => {return projectNumber}

export {updateProjectList, viewProject, toggleForm, currentProject, clearForms}