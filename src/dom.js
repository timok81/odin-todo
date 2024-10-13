import { dataBase, project, task } from "./createtask";
import { submitTask, submitProject } from "./navmenu";
import projectImage from "./images/folder-open.svg";
import categoryTodayImage from "./images/calendar.svg"
import categoryWeekImage from "./images/calendar-week.svg"
import editImage from "./images/pencil.svg";
import addImage from "./images/plus-circle.svg";
import { isSameISOWeek } from "date-fns";

const taskModal = document.querySelector('.createtaskmodal');
const projectModal = document.querySelector('.createprojectmodal');

//Renders basic menu elements
function setupMenu() {
    const addProjectButton = document.querySelector('.addproject');
    const addTaskButton = document.querySelector('.addtask');
    const submitTaskButton = document.querySelector('.newtasksubmit');
    const closeNewTaskButton = document.querySelector('.newtaskclose');
    const submitProjectButton = document.querySelector('.newprojectsubmit');
    const closeNewProjectButton = document.querySelector('.newprojectclose');

    addProjectButton.addEventListener('click', () => projectModal.show());
    submitProjectButton.addEventListener('click', submitProject)
    closeNewProjectButton.addEventListener('click', () => projectModal.close())

    addTaskButton.addEventListener('click', () => taskModal.showModal());
    submitTaskButton.addEventListener('click', submitTask)
    closeNewTaskButton.addEventListener('click', () => taskModal.close())
};

//Renders all nav menu items based on projects array from dataBase
function renderMenu(projects = []) {
    const taskList = document.querySelector('#tasklist');
    const projectList = document.querySelector('#projectlist');
    const currentProjectItems = document.querySelectorAll('.projectitem');

    currentProjectItems.forEach(element => {
        element.remove();
    });

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].isCategory === 0) {
            const projectItem = projectList.appendChild(document.createElement('button'));
            projectItem.classList.add('projectitem')
            const projectIcon = projectItem.appendChild(document.createElement('img'));
            projectIcon.src = projectImage;
            projectIcon.setAttribute('width', '25px');
            const projectItemText = projectItem.appendChild(document.createElement('p'));
            projectItemText.textContent = projects[i].name;

            projectItem.addEventListener('click', function () { renderContent(projects[i]) })
        }
        else if (projects[i].isCategory === 1 || projects[i].isCategory === 2) {
            const categoryItem = taskList.appendChild(document.createElement('button'));
            categoryItem.classList.add('projectitem')
            const categoryIcon = categoryItem.appendChild(document.createElement('img'));
            if (projects[i].isCategory === 1) {
                categoryIcon.src = categoryTodayImage;
            }
            else if (projects[i].isCategory === 2) {
                categoryIcon.src = categoryWeekImage;
            }
            categoryIcon.setAttribute('width', '25px');
            const categoryItemText = categoryItem.appendChild(document.createElement('p'));
            categoryItemText.textContent = projects[i].name;

            categoryItem.addEventListener('click', function () { renderContent(projects[i]) })
        }
    };
}

//Adds new project option to task creation form
function updateForms(projectName = '', taskName = '') {
    const projectOptions = document.querySelector('#projectoptions');
    const newProjectOption = projectOptions.appendChild(document.createElement('option'));
    newProjectOption.setAttribute('value', projectName);
    newProjectOption.textContent = projectName;
}

//Sets project as auto-selected for task creation form
function setDefaultProject(projectName) {
    const allOptions = document.querySelector('#projectoptions').querySelectorAll('option');
    allOptions.forEach(element => {
        if (element.value === projectName) {
            element.setAttribute('selected', 'true');
        }
        else {
            element.removeAttribute('selected', 'false');
        }
    });
}

//Autoselects currently viewed project and opens the task creation form
function showTaskCreationForm(projectName) {
    setDefaultProject(projectName);
    taskModal.showModal()
}

//Renders project's data to content div
function renderContent(project) {
    const oldContent = document.querySelector('#content');
    oldContent.remove();
    const content = document.createElement('div');
    document.body.appendChild(content);
    content.id = 'content';

    const projectHeader = content.appendChild(document.createElement('div'));
    projectHeader.classList.add('projectheader')
    const projectHeaderText = projectHeader.appendChild(document.createElement('h2'));
    projectHeaderText.textContent = project.name;
    const editProjectButton = projectHeader.appendChild(document.createElement('button'));
    editProjectButton.classList.add('editbutton');
    const editIcon = editProjectButton.appendChild(document.createElement('img'));
    editIcon.src = editImage;
    editIcon.setAttribute('width', '25px');

    const projectDescription = content.appendChild(document.createElement('div'));
    projectDescription.classList.add('projectdescription')
    projectDescription.textContent = project.description;

    const projectTaskList = content.appendChild(document.createElement('div'));
    projectTaskList.classList.add('projecttasklist');
    const tasksHeader = projectTaskList.appendChild(document.createElement('div'));
    tasksHeader.classList.add('tasksheader')

    const addTaskButton = tasksHeader.appendChild(document.createElement('button'));
    addTaskButton.classList.add('addtaskbutton');
    addTaskButton.setAttribute('title', 'Add new task');

    const addTaskIcon = addTaskButton.appendChild(document.createElement('img'));
    addTaskIcon.src = addImage;

    addTaskButton.addEventListener('click', function () { showTaskCreationForm(project.name) });

    const tasksColumnTitle = tasksHeader.appendChild(document.createElement('h3'));
    tasksColumnTitle.classList.add('taskscolumntitle');
    tasksColumnTitle.textContent = 'Tasks';
    const dueDateColumnTitle = tasksHeader.appendChild(document.createElement('h3'));
    dueDateColumnTitle.classList.add('duedatecolumntitle')
    dueDateColumnTitle.textContent = 'Due';

    //If normal project
    if (project.isCategory === 0) {
        for (let i = 0; i < project.tasks.length; i++) {
            createTaskForList(projectTaskList, project.tasks[i], i)
        }
    }
    //If category today
    else if (project.isCategory === 1) {
        const date = new Date();
        const todayDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

        for (let i = 0; i < dataBase.getProjects().length; i++) {
            for (let j = 0; j < dataBase.getProjects()[i].tasks.length; j++) {
                if (dataBase.getProjects()[i].tasks[j].duedate === todayDate) {
                    createTaskForList(projectTaskList, dataBase.getProjects()[i].tasks[j], i, j)
                }
            }
        }
    }
    //if category week
    else if (project.isCategory === 2) {
        const date = new Date();
        const todayDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

        for (let i = 0; i < dataBase.getProjects().length; i++) {
            for (let j = 0; j < dataBase.getProjects()[i].tasks.length; j++) {
                if (isSameISOWeek(dataBase.getProjects()[i].tasks[j].duedate, todayDate)) {
                    createTaskForList(projectTaskList, dataBase.getProjects()[i].tasks[j], i, j)
                }
            }
        }
    }
}

function createTaskForList(projectTaskList, task, i = 0, j = 0) {
    const taskListTask = projectTaskList.appendChild(document.createElement('div'));
    taskListTask.classList.add('tasklisttask');
    taskListTask.id = 'minimizedtask';

    const taskCheckBox = taskListTask.appendChild(document.createElement('input'));
    taskCheckBox.setAttribute('type', 'checkbox');
    taskCheckBox.setAttribute('name', 'taskcheckbox');
    taskCheckBox.setAttribute('id', 'taskcheckbox');
    taskCheckBox.classList.add('taskcheckbox');

    const taskListTaskName = taskListTask.appendChild(document.createElement('button'));
    taskListTaskName.classList.add('tasklisttaskname');
    if (task.priority === 'High') {
    taskListTaskName.classList.add('highpriority');
    }
    if (task.priority === 'Low') {
        taskListTaskName.classList.add('lowpriority');
        }
    taskListTaskName.textContent = task.name;

    taskListTaskName.addEventListener('click', function () {
        toggleTaskSize(taskListTask, task.priority, task.description)
    });

    const taskDueDate = taskListTask.appendChild(document.createElement('p'));
    taskDueDate.classList.add('taskduedate');
    taskDueDate.textContent = task.duedate;

    const editTaskButton = taskListTask.appendChild(document.createElement('button'));
    editTaskButton.classList.add('editbutton');
    const editIcon = editTaskButton.appendChild(document.createElement('img'));
    editIcon.src = editImage;
    editIcon.setAttribute('width', '25px');
}

//Logic for toggling task big/small
function toggleTaskSize(task, priority, description) {
    if (task.id === 'minimizedtask') {
        task.style.height = '300px';
        task.classList.add('tasklisttask-expanded');
        task.id = 'maximizedtask'

        const taskPriority = task.appendChild(document.createElement('div'));
        taskPriority.classList.add('tasklisttask-priority')
        taskPriority.textContent = `Priority: ${priority}`;

        const taskDescription = task.appendChild(document.createElement('textarea'));
        taskDescription.classList.add('tasklisttask-description');
        taskDescription.setAttribute('name', 'taskdescription');
        taskDescription.textContent = description;
    }
    else {
        const a = document.querySelector('.tasklisttask-priority');
        a.remove();
        const b = document.querySelector('.tasklisttask-description');
        b.remove();
        task.style.height = '50px';
        task.id = 'minimizedtask';
        task.classList.remove('tasklisttask-expanded');
    }
}

export { setupMenu, renderMenu, renderContent, updateForms, setDefaultProject }