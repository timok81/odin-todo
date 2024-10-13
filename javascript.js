const addProjectButton = document.querySelector('.addproject');

const dataBase = (function () {
    let projects = [];

    function addProject(name, description) {
        projects.push(createNewProject(name, description));
        console.log('New project added');
    };

    function deleteProject(projectIndex) {
        projects.splice(projectIndex, 1);
    };

    return { addProject, deleteProject, projects };
})();


class project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    addTask(name, duedate, priority, description, project) {
        this.tasks.push(createNewTask(name, duedate, priority, description, project));
    }

    deleteTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
    }
}

class task {
    constructor(name, duedate, priority, description, project) {
        this.name = name;
        this.duedate = duedate;
        this.priority = priority;
        this.description = description;
        this.project = project;
    }
}

function createNewTask(name, duedate, priority, description, project) {
    const newTask = new task(name, duedate, priority, description, project);
    return newTask;
}

function createNewProject(name, description) {
    const newProject = new project(name, description);
    return newProject;
}

function clearContent() {
    const content = document.querySelector('#content');
    const contentContent = content.querySelectorAll('div');

    contentContent.forEach(element => {
        element.remove();
    });
}

addProjectButton.addEventListener('click', dataBase.addProject('My Project', 'This is my new project!'))


