"use strict";

class Company {

    constructor(departments, director) {
        this.departments = departments;
        this.director = director;
    }

}

class Director {

    constructor() {
        this.projectsCounter = 0;
    }

    getRandNumber() {
        return Math.floor(Math.random() * 4);
    }

    createNewProject() {

        this.projectsCounter ++;

        let projects = [new WebProject(this.projectsCounter, "WebProject"), new MobProject(this.projectsCounter, "MobProject")];

        return projects[Math.floor(Math.random() * projects.length)];

    }

    getProjects(webDeptQueue, mobDeptQueue) {

        let projectsCount = this.getRandNumber();

        while (projectsCount) {

            let project = this.createNewProject();

            if (project.name === "WebProject") {
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

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.state = 1;
        this.complexity = this.complexity()
    }

    openState() {
        this.stateStatus = 1;
    }

    closeState() {
        this.stateStatus = 0;
    }

    complexity() {
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

    // Присваиваем разработчику id текущего проекта, обнуляем его счетчик дней простоя
    // Удаляем разработчика из массива свободных и добавляем в массив занятых
    // Удаляем проект из массива очереди и добавляем в массив проектов в работе

    appointDeveloper() {

        this.freeDevelopers[0].daysIdled = 0;
        this.freeDevelopers[0].currentProject = this.projectsInQueue[0].id;
        this.busyDevelopers.push(this.freeDevelopers.shift());
        this.projectsInProgress.push(this.projectsInQueue.shift());
    }

    // Обрабатываем назначения свободных программистов на проекты

    checkDevelopers() {

        let queueProjectsLength = this.projectsInQueue.length;
        let freeDevelopersLength = this.freeDevelopers.length;

        let difference = Math.abs(queueProjectsLength - freeDevelopersLength);

        if (difference === 0) {

            while (this.projectsInQueue.length) {
                this.appointDeveloper();
            }
        }
        else {

            while (difference) {
                this.appointDeveloper();

                difference --;
            }

            if (this.projectsInQueue.length) {
                this.developerToHire = Math.abs(queueProjectsLength - freeDevelopersLength);
            }
            else {
                this.freeDevelopers.forEach(function (item) {

                    item.daysIdled ++;
                })
            }
        }
    }

}

class MobDepartment extends Department {

    workingMobDepartment() {

        if (Project.complexity() === 1) {

            this.freeMobDevelopers -= 1;
            this.workingMobDevelopers += 1;

            Project.closeState();
        }

        else if (Project.complexity() === 2) {

            this.freeMobDevelopers -= 2;
            this.workingMobDevelopers += 3;

            Project.closeState();
        }

        else if (Project.complexity() === 3) {

            this.freeMobDevelopers -= 3;
            this.workingMobDevelopers += 3;

            Project.closeState();
        }
    }

}

class QADepartment extends Department {

}

class Developer {

    constructor(id) {
        this.id = id;
        this.status = 1;
        this.currentProject = this.currentProject();
        this.numberDoneProjects = this.numberDoneProjects();
        this.daysIdled = 0;
    }

    changeStatus() {
        this.status = 0;
    }

    currentProject() {

    }

    numberDoneProjects() {
        
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