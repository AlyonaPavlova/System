"use strict";

class Company {
    constructor(departments, director) {
        this.departments = departments;
        this.director = director;
    }
}

let maxNumberProjectsPerDay = 4;

class Director {
    constructor() {
        this.projectsCounter = 0;
    }

    createNewProject() {
        this.projectsCounter++;

        return Math.random() > 0.5 ? new WebProject(this.projectsCounter): new MobProject(this.projectsCounter);
    }

    getProjects(webDeptQueue, mobDeptQueue) {
        let projectsCount = Math.floor(Math.random() * maxNumberProjectsPerDay);

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

    //  Добавляем разработчиков

    addDeveloper() {
        while (this.developerToHire) {
            this.developersCounter++;

            this.freeDevelopers.push(new Developer(this.developersCounter));

            this.developerToHire--;
        }
    }

    compareNumberDoneProjects(a, b) {
        return a.numberDoneProjects - b.numberDoneProjects;
    }

    getDeveloperById (developerId) {
        return this.freeDevelopers.find(function (developer) {
            return developer.id === developerId;
        });
    }

    // Удаляем разработчиков, у которых дни простоя = 3

    delDeveloper() {
        let developersForDismissArr = this.freeDevelopers.filter(function (developer) {
            return developer.daysIdled === 3;
        });

        if (developersForDismissArr.length) {
            let sortDevelopers = developersForDismissArr.sort(this.compareNumberDoneProjects);

            let oneDismissedDeveloper = this.freeDevelopers.splice(this.freeDevelopers.indexOf(this.getDeveloperById(sortDevelopers[0].id)), 1);

            oneDismissedDeveloper.forEach((developer) => {
                this.dismissedDevelopers.push(developer);
            });
        }
    }

    // Возвращаем разработчика, у которого указан передаваемый id проекта

    getDeveloperByProject (projectId) {
        return this.busyDevelopers.find(function (developer) {
            return developer.currentProject === projectId;
        });
    }

    // Удаляем проекты с нулевой сложностью

    cleanClosedProjects() {
        for (let index = 0; index < this.projectsInProgress.length; index++) {
            if (this.projectsInProgress[index].complexity === 0) {
                this.projectsInProgress.splice(index, 1);
                index--;
            }
        }
    }


    // Возвращаем проекты, у которых сложность = 0

    getProjectsWithComplexityNull () {
        return this.projectsInProgress.filter(function (project) {
            return project.complexity === 0;
        });
    }

    appointDeveloper () {
        // Удаляем разработчика из массива свободных

        const dev = this.freeDevelopers.shift();

        // Удаляем проект из массива очереди

        const project = this.projectsInQueue.shift();

        // Обнуляем у разработчика счетчик дней простоя

        dev.daysIdled = 0;

        // Присваиваем разработчику id текущего проекта

        dev.currentProject = project.id;

        // Добавляем разработчика в массив занятых

        this.busyDevelopers.push(dev);

        // Добавляем проект в массив проектов в работе

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
                item.daysIdled++;
            });
        }
    }

    // Уменьшаем сложность проектов

    reduceComplexityProjects() {
        this.projectsInProgress.forEach(function (project) {
            project.complexity--;
        });
    }

    // Удаляем освободившихся разработчиков из массива занятых

    cleanFreeDevelopers() {
        for (let i = 0; i < this.busyDevelopers.length; i++) {
            if (this.busyDevelopers[i].currentProject === "") {
                this.busyDevelopers[i].numberDoneProjects++;
                this.busyDevelopers.splice(i,1);
                i--;
            }
        }
    }

    // Проходим по массиву с нулевыми проектами, обнуляем текущие проекты у разработчиков и добавляем их в freeDevelopers

    moveWebAndMobDevelopers () {
        let nullComplexityProjectsArr = this.getProjectsWithComplexityNull();

        nullComplexityProjectsArr.forEach((project) => {
            let currentDeveloper = this.getDeveloperByProject(project.id);
            console.log(currentDeveloper);
            currentDeveloper.currentProject = "";
            this.freeDevelopers.push(currentDeveloper);
        });
    }
}

class WebDepartment extends Department {

}

class MobDepartment extends Department {
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
    // Проходим по массиву с нулевыми проектами, обнуляем текущие проекты у разработчиков и добавляем их в freeDevelopers

    moveQADevelopers () {
        let projectsWithComplexityNull = this.getQAProjectsWithComplexityNull();

        projectsWithComplexityNull.forEach((project) => {
            let currentDeveloper = this.getDeveloperByProject(project.id);

            currentDeveloper.currentProject = "";
            this.freeDevelopers.push(currentDeveloper);
        });
    }

    // Добавление нулевых проектов из веб и моб отделов в отдел тестирования

    receivingWebAndMobProjects(projectsNullComplexity) {
        // projectsNullComplexity.forEach((project) => {
        //     project.complexity++;
        //     this.projectsInQueue.push(project);
        // });

        this.projectsInQueue = this.projectsInQueue.concat(projectsNullComplexity);

        // this.projectsInQueue.forEach(function (project) {
        //     project.complexity++;
        // });
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
    Developer
};