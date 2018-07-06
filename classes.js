"use strict";

class Company {

    constructor(name, projects) {
        this.name = name;
        this.projects = projects;
    }

}

class Director {

    constructor(name) {
        this.name = name;
    }

    static projectsInDay() {
        return Math.floor(Math.random() * 4);
    }

    static typeProject(n) {
        let typesProjects = ["WebProject", "MobProject"];
        let getProjects = [];

        while(getProjects.length < n) {
            getProjects.push(typesProjects[Math.floor(Math.random() * typesProjects.length)]);
        }
        return getProjects;
    }

    static getProjects() {
        return this.typeProject(this.projectsInDay());
    }

    static countWebProject() {

        let webProjectsArray = this.getProjects().filter(function (item) {
            return item === "WebProject";
        });

        return webProjectsArray.length;

    }

    static countMobProject() {

        let mobProjectsArray = this.getProjects().filter(function (item) {
            return item === "MobProject";
        });

        return mobProjectsArray.length;
    }

}

class Project {

    constructor(name) {
        this.id = id; // Будет counter
        this.name = name;
        this.state = 1;
        this.complexity = this.complexity();
        this.projectsInDay = this.getProjects();
    }

    static openState() {
        this.stateStatus = 1;
    }

    static closeState() {
        this.stateStatus = 0;
    }

    stateString() {

        switch (this.state) {
            case this.state === 1:
                return "Subject is open";

            case this.state === 0:
                return "Subject is close";
        }
    }

    showState() {
        console.log(this.stateString());
    }

    static complexity() {
        return Math.floor(Math.random() * 2) + 1;
    }

    get complexityString() {

        if (this.complexity() === 1) {
            console.log("Complexity easy");
        }
        else if (this.complexity() === 2) {
            console.log("Complexity medium");
        }
        else {
            console.log("Complexity high");
        }
    }

    // static projectsInDay() {
    //     return Math.floor(Math.random() * 4);
    // }
    //
    // static typeProject(n) {
    //     let typesProjects = ["WebProject", "MobProject"];
    //     let getProjects = [];
    //
    //     while(getProjects.length < n) {
    //         getProjects.push(typesProjects[Math.floor(Math.random() * typesProjects.length)]);
    //     }
    //     return getProjects;
    // }
    //
    // static getProjects() {
    //     return this.typeProject(this.projectsInDay());
    // }

    // static countWebProject() {
    //
    //     let webProjectsArray = this.getProjects().filter(function (item) {
    //         return item === "WebProject";
    //     });
    //
    //     return webProjectsArray.length;
    //
    // }
    //
    // static countMobProject() {
    //
    //     let mobProjectsArray = this.getProjects().filter(function (item) {
    //         return item === "MobProject";
    //     });
    //
    //     return mobProjectsArray.length;
    // }

}

class Department {

    constructor(name) {
        this.name = name;
    }

    addDeveloper() {

    }

    static delDeveloper() {

        if (Developer.efficiency() === 0) {
            Developer.changeStatus();
        }
    }

}

class WebDepartment extends Department {

    constructor(name) {
        super(name);
        this.freeWebDevelopers = freeWebDevelopers;
        this.workingMobDevelopers = workingWebDevelopers;
        this.projectsInDay = Project.countWebProject();
    }

    static workingWebDepartment() {

        if (Project.complexity() === 1) {

            this.freeWebDevelopers -= 1;
            this.workingWebDevelopers += 1;

            Project.closeState(); // Нужно учесть время. Проект закрывается через 1 день
        }

    }

}

class MobDepartment extends Department {

    constructor(name) {
        super(name);
        this.mobDevelopers = mobDevelopers;
        this.freeMobDevelopers = freeMobDevelopers;
        this.workingMobDevelopers = workingMobDevelopers;
        this.projectsInDay = Project.countMobProject();
    }

    static workingMobDepartment() {

        if (Project.complexity() === 1) {

            this.freeMobDevelopers -= 1;
            this.workingMobDevelopers += 1;

            Project.closeState(); // Нужно учесть время. Проект закрывается через 1 день
        }

        else if (Project.complexity() === 2) {

            this.freeMobDevelopers -= 2;
            this.workingMobDevelopers += 3;

            Project.closeState(); // Нужно учесть время. Проект закрывается через 2 дня
        }

        else if (Project.complexity() === 3) {

            this.freeMobDevelopers -= 3;
            this.workingMobDevelopers += 3;

            Project.closeState(); // Нужно учесть время. Проект закрывается через 3 дня
        }

    }

}

class QADepartment extends Department {

    constructor(name) {
        super(name);
        this.projectsInDay = Project.countWebProject() + Project.countMobProject(); // Нужно избежать повторного вызова функций Web и Mob
    }

}

class Developer {

    constructor(name) {
        this.id = id; // Будет counter
        this.name = name;
        this.status = 1;
        this.numberProjects = this.numberProjects();
    }

    static efficiency() {
        return Math.floor(Math.random() * 3); // Эффективность разработчика за три дня (где 0 - не работал ни дня)
    }

    static changeStatus() {
        this.status = 0;
    }

    numberProjects() {
        
    }

}

class WebDeveloper extends Developer {

    static working() {

        if (Project.complexity() === 1) {
            Project.closeState(); // Нужно учесть время. Проект закрывается через 1 день
        }
        else if (Project.complexity() === 2) {
            Project.closeState(); // Нужно учесть время. Проект закрывается через 2 дня
        }
        else if (Project.complexity() === 3) {
            Project.closeState(); // Нужно учесть время. Проект закрывается через 3 дня
        }

    }

}

class MobDeveloper extends Developer {

    static working() {

        if (Project.complexity() === 1) {
            Project.closeState(); // Нужно учесть время. Проект закрывается через 1 день
        }

    }

}

class QASpecialist extends Developer {

    static working() {

        if (Project.complexity() === 1) {
            Project.closeState(); // Нужно учесть время. Проект закрывается тестировщиком всегда через 1 день
        }
        else if (Project.complexity() === 2) {
            Project.closeState(); // Нужно учесть время. Проект закрывается тестировщиком всегда через 1 день
        }
        else if (Project.complexity() === 3) {
            Project.closeState(); // Нужно учесть время. Проект закрывается тестировщиком всегда через 1 день
        }

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
    Developer,
    WebDeveloper,
    MobDeveloper,
    QASpecialist,
};