let tasks = []; 

const getTasks = () => tasks;

const addTask = (task) => {
    tasks.push(task);
    return task;
};

const updateTask = (id, updatedTask) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        return tasks[taskIndex];
    }
    return null;
};

const deleteTask = (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        return tasks.splice(taskIndex, 1)[0];
    }
    return null;
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
