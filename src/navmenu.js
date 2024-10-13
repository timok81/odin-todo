import { dataBase } from "./createtask";
import { renderContent, renderMenu } from "./dom";

function clearContent() {
    const content = document.querySelector('#content');
    const contentContent = content.querySelectorAll('div');

    contentContent.forEach(element => {
        element.remove();
    });
}

function submitTask(e) {
    const taskModal = document.querySelector('.createtaskmodal');
    const form = document.querySelector('.newtaskform');

    const name = form.elements.name.value;
    const dueDate = form.elements.duedate.value;
    const priority = form.elements.priority.value;
    const description = form.elements.description.value;
    const project = form.elements.project.value;

    let projectIndex = 0;
    for (let i = 0; i < dataBase.getProjects().length; i++) {
        if (dataBase.getProjects()[i].name === project) {
            projectIndex = i;
        }
    }
    const targetProject = dataBase.getProject(projectIndex);
    e.preventDefault();
    targetProject.addTask(name, dueDate, priority, description, projectIndex)
    renderContent(targetProject);
    renderMenu(dataBase.getProjects())
    taskModal.close();
}

function submitProject(e) {
    const projectModal = document.querySelector('.createprojectmodal');
    const form = document.querySelector('.newprojectform');

    const name = form.elements.name.value;
    const description = form.elements.description.value;
    e.preventDefault();
    dataBase.addProject(name, description);
    renderMenu(dataBase.getProjects())
    projectModal.close();
}

export { submitTask, submitProject };