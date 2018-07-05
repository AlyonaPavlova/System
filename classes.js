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
        this.projectsInDay = this.projectsInDay();
    }

    static projectsInDay() {
        return Math.floor(Math.random() * 4);
    }

    static typeProject() {
        let typesProjects = ["WebProject", "MobProject"];
        let getProjects = [];
        let projectsInDay = this.projectsInDay();

        while(getProjects.length < projectsInDay) {
            getProjects.push(typesProjects[Math.floor(Math.random() * typesProjects.length)]);
        }
        return getProjects;
    }

    static countWebProject() {

        let typeProject = this.typeProject();
        let webProjectsArray = typeProject.filter(function (item) {
            return item === "WebProject";
        });

        return webProjectsArray.length;

    }

    static countMobProject() {

        let typeProject = this.typeProject();
        let mobProjectsArray = typeProject.filter(function (item) {
            return item === "MobProject";
        });

        return mobProjectsArray.length;
    }

    getProjects() {
        return this.typeProject(this.projectsInDay());
    }

    addDeveloper() {

    }

    static dismissDeveloper() {

        if (Developer.efficiency() === 0) {
            Developer.changeStatus();
        }
    }

}

class Department {

    constructor(name) {
        this.name = name;
    }

}

class WebDepartment extends Department {

    constructor(name) {
        super(name);
        this.projectsInDay = Project.countWebProject();
    }

}

class MobDepartment extends Department {

    constructor(name) {
        super(name);
        this.projectsInDay = Project.countMobProject();
    }

}

class QADepartment extends Department {

    constructor(name) {
        super(name);
        this.projectsInDay = Project.countMobProject();
    }

    projectsInDay() {

    }

}

class Project {

    constructor(name) {
        this.name = name;
        this.state = 1;
        this.complexity = this.complexity();
    }

    openState() {
        this.stateStatus = 1;
    }

    closeState() {
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

    complexity() {
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

}

class WebProject extends Project {


}

class MobProject extends Project {


}

class Developer {

    constructor(name) {
        this.name = name;
        this.status = 1;
    }

    static efficiency() {
        return Math.floor(Math.random() * 3); // Эффективность разработчика за три дня (где 0 - не работал ни дня)
    }

    static changeStatus() {
        this.status = 0;
    }

}

class WebDeveloper extends Developer {


}

class MobDeveloper extends Developer {


}

class QASpecialist extends Developer {


}

class Command {

    constructor(project, persons) {
        this.project = project;
        this.persons = persons;
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
    QASpecialist,
    Command
};