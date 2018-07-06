"use strict";

class Company {

    constructor(name, departments, director) {
        this.name = name;
        this.departments = departments;
        this.director = director;
    }

    static working() {


        let projectsInDay = Director.getProjects();

        let webProjectsInDay = projectsInDay.filter(function (item) {return item.name === "WebProject";}).length;

        let mobProjectsInDay = projectsInDay.filter(function (item) {return item.name === "MobProject";}).length;

        if (webProjectsInDay !== 0) {

            if (WebDepartment.freeWebDevelopers !== 0) {

                //  Присваиваем конкретному разработчику конкретный проект (по  id)
                //  Или разработчикам проекты (каждому по 1 проекту)

            }

        }

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

        WebProject.count = 0;
        MobProject.count = 0;

        let typesProjects = [new WebProject(WebProject.count, "WebProject"), new MobProject(MobProject.count, "MobProject")];
        let getProjects = [];

        while(getProjects.length < n) {
            getProjects.push(typesProjects[Math.floor(Math.random() * typesProjects.length)]);
        }
        return getProjects;
    }

    static getProjects() {
        return this.typeProject(this.projectsInDay());
    }

}

class Project {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.state = 1;
        this.complexity = this.complexity();

        Project.count ++;
    }

    static openState() {
        this.stateStatus = 1;
    }

    static closeState() {
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

    constructor(name, projects, developers) {
        this.name = name;
        this.projects = projects;
        this.developers = developers;
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

    constructor(name, projects, developers) {
        super(name, projects, developers);
        // this.freeWebDevelopers = freeWebDevelopers;
        // this.workingMobDevelopers = workingWebDevelopers;
        // this.projectsInDay = Project.countWebProject();
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
        // this.mobDevelopers = mobDevelopers;
        // this.freeMobDevelopers = freeMobDevelopers;
        // this.workingMobDevelopers = workingMobDevelopers;
        // this.projectsInDay = Project.countMobProject();
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
        // this.projectsInDay = Project.countWebProject() + Project.countMobProject();  Нужно избежать повторного вызова функций Web и Mob
    }

}

class Developer {

    constructor(id) {
        this.id = id;
        this.status = 1;
        this.numberProjects = this.numberProjects();

        Developer.count ++;
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
    WebProject,
    MobProject,
    Developer,
    WebDeveloper,
    MobDeveloper,
    QASpecialist
};