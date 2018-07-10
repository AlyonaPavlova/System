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

    moveProjectsToQA() {

    }
}

class Project {
    constructor(id) {
        this.id = id;
        this.complexity = this.getRandComplexity();
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
        this.dismissedDevelopers = [];
        this.developerToHire = 0;
        this.developersCounter = 0;
    }

    //  Проверяем, сколько разработчиков нужно нанять (хранится в свойстве this.developerToHire)

    addDeveloper() {
        this.developersCounter ++;

        while (this.developerToHire) {
            this.freeDevelopers.push(new Developer(this.developersCounter));

            this.developerToHire --;
        }
    }

    compareNumberDoneProjects(a, b) {
        return a.numberDoneProjects - b.numberDoneProjects;
    }

    // Удаляем разработчиков, у которых дни простоя = 3

    delDeveloper() {
        let developersForDismissArr = this.freeDevelopers.filter(function (developer) {
            return developer.daysIdled === 3;
        });

        console.log(developersForDismissArr);
        if (developersForDismissArr.length) {
            let sortDevelopers = developersForDismissArr.sort(this.compareNumberDoneProjects);

            let oneDismissedDeveloper = this.freeDevelopers.splice(this.freeDevelopers.indexOf(sortDevelopers[0]), 1);

            this.dismissedDevelopers.push(oneDismissedDeveloper);
        }
        else {
            console.log("Array with developers is empty");
        }
    }

    // Возвращаем разработчика, у которого указан передаваемый id проекта

    getDeveloperByProject (projectId) {
        return this.busyDevelopers.find(function (developer) {
            return developer.currentProject === projectId;
        });
    }

    // Возвращаем проекты, у которых сложность = 0

    // getProjectsWithComplexityNull () {
    //     return this.projectsInProgress.filter(function (project) {
    //         return project.complexity === 0;
    //     });
    // }

    cleanClosedProjects() {
        for (let index = 0; index < this.projectsInProgress.length; index++) {
            if (this.projectsInProgress[i].complexity === 0) {
                this.projectsInProgress.splice(i, 1);
                index--;
            }
        }
    }

    getProjectsWithComplexityNull () {
        return this.cleanClosedProjects();
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

class WebDepartment extends Department {
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
}

class MobDepartment extends Department {
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

    appointDeveloper () {
        const dev = this.freeDevelopers.shift();
        const project = this.projectsInQueue.shift();

        dev.daysIdled = 0;
        dev.currentProject = project.id;

        this.busyDevelopers.push(dev);
        this.projectsInProgress.push(project);
    }

    appointTwoDevelopers () {
        const dev1 = this.freeDevelopers.shift();
        const dev2 = this.freeDevelopers.shift();
        const project = this.projectsInQueue.shift();

        dev1.daysIdled = 0;
        dev2.daysIdled = 0;
        dev1.currentProject = project.id;
        dev2.currentProject = project.id;

        this.busyDevelopers.push(dev1);
        this.busyDevelopers.push(dev2);
        this.projectsInProgress.push(project);
    }

    appointThreeDevelopers () {
        const dev1 = this.freeDevelopers.shift();
        const dev2 = this.freeDevelopers.shift();
        const dev3 = this.freeDevelopers.shift();
        const project = this.projectsInQueue.shift();

        dev1.daysIdled = 0;
        dev2.daysIdled = 0;
        dev3.daysIdled = 0;
        dev1.currentProject = project.id;
        dev2.currentProject = project.id;
        dev3.currentProject = project.id;

        this.busyDevelopers.push(dev1);
        this.busyDevelopers.push(dev2);
        this.busyDevelopers.push(dev3);
        this.projectsInProgress.push(project);
    }


    // Обрабатываем назначение свободных программистов на проекты

    appointmentMobDevelopers () {
        let projectsOneComplexityArr = this.projectsInQueue.filter(function (project) {
            return project.complexity === 1;
        });
        let projectsTwoComplexityArr = this.projectsInQueue.filter(function (project) {
            return project.complexity === 2;
        });
        let projectsThreeComplexityArr = this.projectsInQueue.filter(function (project) {
            return project.complexity === 3;
        });

        while (projectsOneComplexityArr.length && this.freeDevelopers.length) {
            this.appointDeveloper();
        }

        while (projectsTwoComplexityArr.length && this.freeDevelopers.length) {
            this.appointTwoDevelopers();
        }

        while (projectsThreeComplexityArr.length && this.freeDevelopers.length) {
            this.appointThreeDevelopers();
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

class QADepartment extends Department {
    addNewProjectsToQueue(projectsForTestingArray) {
        this.projectsInQueue.concat(this.projectsInQueue, projectsForTestingArray);
    }

    justCompleteProjects() {
        let projectsWithComplexityNull = this.getProjectsWithComplexityNull();

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
        this.currentProject = "";
        this.numberDoneProjects = 0;
        this.daysIdled = 0;
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