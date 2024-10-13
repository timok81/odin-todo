import "./styles.css";
import { dataBase, createNewProject, createNewTask, project, task } from "./createtask";
import { setupMenu, renderMenu, renderContent, updateForms } from "./dom";

setupMenu();

dataBase.addProject('Default project', 'This is the default project. Add new tasks by either clicking on the button below, or in the menu on the left side, where new projects may also be created. Tasks can be marked completed with the checkbox to their left, and expanded by clicking on their name.')

dataBase.addCategory("Today", "These tasks are due today.", [], 1)
dataBase.addCategory("This week", "These tasks are due this week.", [], 2)

renderMenu(dataBase.getProjects())
renderContent(dataBase.getProjects()[0]);

