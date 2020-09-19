const project = (title, description, taskArray) => {
    var tasks;

    if (taskArray != null){
        tasks = taskArray;
    } else{
        tasks = [];
    }

    const getDescription = () => { return description }

    const addTask = (task) => {
        tasks.push(task);
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        return index; 
    }

    return {
        title,
        description,
        tasks,
        addTask,
        removeTask
    }
}

export default project