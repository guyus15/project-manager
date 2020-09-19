import parse from 'date-fns';

const task = (text, dueDate) => {
    var completed = false;

    const getStatus = () => { return completed }

    const getDate = () => {
        return dueDate;
    }

    const toggleCompleted = () => {
        completed == true ? completed = false : completed = true;
    }

    return{
        text,
        dueDate,
        completed,
        getStatus,
        getDate,
        toggleCompleted
    }
}

export default task