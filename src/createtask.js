import { updateForms } from "./dom";

const dataBase = (function () {
    let projects = [];

    function getProjects() {
        return projects;
    };

    const getProject = (index) => {
        return projects[index];
    }

    function addProject(name, description, tasks) {
        projects.push(createNewProject(name, description, tasks));
        updateForms();
    };

    function addCategory(name, description, tasks = [], isCategory = 1) {
        projects.push(createNewProject(name, description, tasks, isCategory));
    }

    function deleteProject(projectIndex) {
        projects.splice(projectIndex, 1);
        updateForms();
    };

    return { addProject, addCategory, deleteProject, getProject, getProjects };
})();

class project {
    constructor(name, description, tasks = [], isCategory = 0, complete=0) {
        this.name = name;
        this.description = description;
        this.tasks = tasks;
        this.isCategory = isCategory;
        this.complete = complete;
    }

    addTask(name, duedate, priority, description, project) {
        this.tasks.push(createNewTask(name, duedate, priority, description, project));
    }

    deleteTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
    }
}

class task {
    constructor(name, duedate, priority, description, project, complete=0) {
        this.name = name;
        this.duedate = duedate;
        this.priority = priority;
        this.description = description;
        this.project = project;
        this.complete = complete;
    }
}

function createNewTask(name, duedate, priority, description, project) {
    const newTask = new task(name, duedate, priority, description, project);
    return newTask;
}

function createNewProject(name, description, tasks, isCategory) {
    const newProject = new project(name, description, tasks, isCategory);
    return newProject;
}

export { dataBase, createNewProject, createNewTask, project, task };