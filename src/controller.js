import project from './project';
import task from './task';
import {updateProjectList, viewProject, toggleForm, currentProject, clearForms} from './DOMmanager';

var projects = []

const createEventListeners = () => {
    const newProjectBtn = document.querySelector('.new-project-btn');
    const submitProjectBtn = document.querySelector('#addProjectBtn');

    newProjectBtn.addEventListener('click', () => { 
        toggleForm('project'); 
    });
    submitProjectBtn.addEventListener('click', addNewProject);

    const newTaskBtn = document.querySelector('.new-task-btn');
    const submitTaskBtn = document.querySelector('#addTaskBtn');

    if(newTaskBtn != null){
        newTaskBtn.addEventListener('click', () => {
            toggleForm('task')
        });   
    }
    submitTaskBtn.addEventListener('click', () => {
        addNewTask(currentProject());
    });

    createDefaultProject();
}

const addNewProject = () => {
    const projectTitle = document.querySelector('#project-title');
    const projectDesc = document.querySelector('#project-description');

    projects.push(project(projectTitle.value, projectDesc.value));
    localStorage.setItem('projects', JSON.stringify(projects));

    projectTitle.value = "";
    projectDesc.value = "";

    toggleForm('project');
    updateProjectList(projects);
    clearForms();

}

const addNewTask = (projectIndex) => {
    const taskText = document.querySelector('#task-text');
    const taskDate = document.querySelector('#task-date');

    console.log(projects[projectIndex]);

    projects[projectIndex].addTask(task(taskText.value, taskDate.value));
    localStorage.setItem('projects', JSON.stringify(projects));

    var savedProjects = JSON.parse(localStorage.getItem("projects"));

    viewProject(projectIndex);

    toggleForm('task');
    clearForms();
}

const deleteProject = () => {
    projects.splice(currentProject(), 1);
    localStorage.setItem('projects', JSON.stringify(projects));

    updateProjectList(projects);
    viewProject(currentProject());
}

const removeProjectTask = (projectIndex, taskIndex) => {
    projects[projectIndex].removeTask(taskIndex);
    localStorage.setItem('projects', JSON.stringify(projects));

    viewProject(projectIndex);
}

const createDefaultProject = () => {
    var existingProjects = JSON.parse(localStorage.getItem('projects'));

    if(existingProjects != null){
        existingProjects.forEach(p => {
            projects.push(project(p.title, p.description, p.tasks));
        });
    }
    else{
        projects.push(project('Default', 'This is the default project'));
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    console.log(projects);

    updateProjectList(projects);
    viewProject(0);
}

const getProjects = () => {return projects}

const completeTask = (projectIndex, taskIndex) => {
    projects[projectIndex].tasks[taskIndex].toggleCompleted();
}   

export {createEventListeners, addNewTask, removeProjectTask, deleteProject, getProjects, completeTask}