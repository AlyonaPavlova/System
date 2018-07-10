"use strict";

class Company {
    constructor(departments, director) {
        this.departments = departments;
        this.director = director;
    }
}

let maxNumberProjectsPurDay = 4;

class Director {
    constructor() {
        this.projectsCounter = 0;
    }

    createNewProject() {
        this.projectsCounter ++;

        return Math.random() > 0.5 ? new WebProject(this.projectsCounter): new MobProject(this.projectsCounter);
    }

    getProjects(webDeptQueue, mobDeptQueue) {
        let projectsCount = Math.floor(Math.random() * maxNumberProjectsPurDay);

        while (projectsCount) {
            let project = this.createNewProject();

            if (project instanceof WebProject) {
                webDeptQueue.push(project);
            }
            else {
                mobDeptQueue.push(project);
            }

            projectsCount --;
        }
    }
}

class Project {
    constructor(id) {
        this.id = id;
        this.state = 1;
        this.complexity = this.getRandComplexity();
    }

    openState() {
        this.stateStatus = 1;
    }

    closeState() {
        this.stateStatus = 0;
    }

    getRandComplexity() {
        return Math.floor(Math.random() * 3) + 1;
    }
}

class WebProject extends Project {

}


class MobProject extends Project {

}

class Department {
    constructor() {
        this.projectsInQueue = [];
        this.projectsInProgress = [];
        this.freeDevelopers = [];
        this.busyDevelopers = [];
        this.developerToHire = 0;
    }

    addDeveloper() {

    }

    delDeveloper() {

    }
}

class WebDepartment extends Department {
    // Возвращаем разработчика, у которого указан передаваемый id проекта

    getDeveloperByProject (projectId) {
        this.busyDevelopers.find(function (developer) {
            return developer.currentProject === projectId;
        });
    }

    // Возвращаем проекты, у которых сложность = 0

    getProjectsWithComplexityNull () {
        this.projectsInProgress.filter(function (project) {
            return project.complexity === 0;
        });
        return null;
    }

    justCompleteProjects () {
        let nullComplexityProjectsArr = this.getProjectsWithComplexityNull();

        nullComplexityProjectsArr.forEach(function (project) {
            project.complexity++;

            let currentDeveloper = this.getDeveloperByProject(project.id);
            currentDeveloper.currentProject = "";
            currentDeveloper.numberDoneProjects++;

            let freedDeveloper = this.busyDevelopers.splice(this.busyDevelopers.indexOf(currentDeveloper), 1);

            this.freeDevelopers.push(freedDeveloper);

            this.projectsInProgress.splice(this.projectsInProgress.indexOf(project), 1);
        });
    }

    // Присваиваем разработчику id текущего проекта, обнуляем его счетчик дней простоя
    // Удаляем разработчика из массива свободных и добавляем в массив занятых
    // Удаляем проект из массива очереди и добавляем в массив проектов в работе

    appointDeveloper () {
        const dev = this.freeDevelopers.shift();
        const project = this.projectsInQueue.shift();

        dev.daysIdled = 0;
        dev.currentProject = project.id;

        this.busyDevelopers.push(dev);
        this.projectsInProgress.push(project);
    }

    // Обрабатываем назначение свободных программистов на проекты

    appointmentDevelopers () {
        while (this.projectsInQueue.length && this.freeDevelopers.length) {
            this.appointDeveloper();
        }

        if (this.projectsInQueue.length) {
            this.developerToHire = this.projectsInQueue.length;
        }
        else {
            this.freeDevelopers.forEach(function (item) {
                item.daysIdled ++;
            });
        }
    }
}

class MobDepartment extends Department {

}

class QADepartment extends Department {
    addNewProjectsToQueue(projectsForTestingArray) {
        this.projectsInQueue.concat(this.projectsInQueue, projectsForTestingArray);
    }

    appointDeveloper () {
        const dev = this.freeDevelopers.shift();
        const project = this.projectsInQueue.shift();

        dev.daysIdled = 0;
        dev.currentProject = project.id;

        this.busyDevelopers.push(dev);
        this.projectsInProgress.push(project);
    }

    // Обрабатываем назначение свободных программистов на проекты

    appointmentDevelopers () {
        while (this.projectsInQueue.length && this.freeDevelopers.length) {
            this.appointDeveloper();
        }

        if (this.projectsInQueue.length) {
            this.developerToHire = this.projectsInQueue.length;
        }
        else {
            this.freeDevelopers.forEach(function (item) {
                item.daysIdled ++;
            });
        }
    }

    returnProjectsWithComplexityNull() {
        this.projectsInProgress.find(function (project) {
            return project.complexity === 0;
        });
    }

    justCompleteProjects() {
        let projectsWithComplexityNull = this.returnProjectsWithComplexityNull();

        projectsWithComplexityNull.forEach(function (project) {
            project.complexity --;

            let currentDeveloper = this.getDeveloperByProject(project.id);
            currentDeveloper.currentProject = "";

            let deleteDeveloper = this.busyDevelopers.splice(this.busyDevelopers.indexOf(currentDeveloper), 1);

            this.freeDevelopers.push(deleteDeveloper);
            currentDeveloper.numberDoneProjects ++;

            this.projectsInProgress.splice(this.projectsInProgress.indexOf(project), 1);
        });
    }
}

class Developer {
    constructor(id) {
        this.id = id;
        this.status = 1;
        this.currentProject = "";
        this.numberDoneProjects = 0;
        this.daysIdled = 0;
    }

    changeStatus() {
        this.status = 0;
    }
}

class WebDeveloper extends Developer {

}

class MobDeveloper extends Developer {

}

class QASpecialist extends Developer {

}

module.exports = {
    Company,
    Director,
    Department,
    WebDepartment,
    MobDepartment,
    QADepartment,
    Project,
    WebProject,
    MobProject,
    Developer,
    WebDeveloper,
    MobDeveloper,
    QASpecialist
};