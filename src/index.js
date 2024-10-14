import "./styles.css";
import { dataBase } from "./createtask";
import { setupMenu, renderMenu, renderContent } from "./dom";

dataBase.addProject('Default project', 
    'This is a default project. Add new tasks by either clicking on the button below, or in the menu on the left, where new projects may also be created. Tasks can be marked completed with the checkbox to their left, and expanded by clicking on their name. Toggling the project complete will move it into the "Completed projects" category.')

dataBase.addCategory("Today", "These tasks are due today.", [], 1)
dataBase.addCategory("This week", "These tasks are due this week.", [], 2)

renderMenu(dataBase.getProjects())
renderContent(dataBase.getProjects()[0]);
setupMenu();


