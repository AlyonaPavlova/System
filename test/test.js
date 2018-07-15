const { expect } = require("chai");
const {Company, Director, WebDepartment, MobDepartment, QADepartment} = require("../classes");

describe("Director", function () {
    // createNewProject function

    it("Method createNewProject.Should return object", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        expect(myCompany.director.createNewProject()).to.be.an("object").to.have.all.keys("id", "complexity");
    });

    // getProjects function

    it("Method getProjects.Should return array with projects", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const webDept = myCompany.departments["WebDept"];
        const mobDept = myCompany.departments["MobDept"];

        myCompany.director.getProjects(webDept.projectsInQueue, mobDept.projectsInQueue);

        if (webDept.projectsInQueue.length) {
            webDept.projectsInQueue.forEach(function (project) {
                expect(project).to.have.all.keys("id", "complexity");
            });
        }
    });
});

describe("Department", function () {
    // addDeveloper function

    it("Method addDeveloper.Should return length of 5", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.developerToHire = 5;
        dept.addDeveloper();

        expect(dept.freeDevelopers).to.have.lengthOf(5);
    });

    it("Method addDeveloper.Should return object with properties", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.developerToHire = 5;
        dept.addDeveloper();

        dept.freeDevelopers.forEach(function (developer) {
            expect(developer).to.be.an("object").to.have.all.keys("id", "currentProject", "numberDoneProjects", "daysIdled");
        });
    });

    // delDeveloper function

    it("Method delDeveloper.Should return id equal 3", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 3}];
        dept.delDeveloper();

        expect(dept.freeDevelopers).to.have.lengthOf(2);
    });

    // cleanClosedProjects function

    it("Method cleanClosedProjects.Should return array with one element", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:1}, {id:3, complexity:0}];
        dept.cleanClosedProjects();

        expect(dept.projectsInProgress).to.have.lengthOf(1);
    });

    // appointmentDevelopers function

    it("Method appointmentDevelopers.Should return array with three elements", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.projectsInQueue = [{id:1, complexity:3}, {id:2, complexity:2}, {id:3, complexity:1}];
        dept.freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 3}];
        dept.appointmentDevelopers();

        expect(dept.busyDevelopers).to.have.lengthOf(3);
    });

    it("Method appointmentDevelopers.Should return equality of two variables", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.projectsInQueue = [{id:1, complexity:3}, {id:2, complexity:2}, {id:3, complexity:1}];
        dept.appointmentDevelopers();

        expect(dept.developerToHire).to.equal(dept.projectsInQueue.length);
    });

    it("Method appointmentDevelopers.Should return property daysIdled equality 3", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 2}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}];
        dept.appointmentDevelopers();

        dept.freeDevelopers.forEach(function (developer) {
            expect(developer.daysIdled).to.equal(3);
        });
    });

    // getDeveloperByProject function

    it("Method getDeveloperByProject.Should return object with property currentProject equal 1", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.busyDevelopers = [{id:5, currentProject: 1, numberDoneProjects: 2, daysIdled: 2}, {id:6, currentProject: 2, numberDoneProjects: 2, daysIdled: 2}];

        expect(dept.getDeveloperByProject(1)).to.be.an("object").to.have.property("currentProject", 1);
    });

    // getWebAndMobClosedProjects function

    it("Method getWebAndMobClosedProjects.Should return object with property currentProject equal 1", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:0}, {id:3, complexity:1}];

        expect(dept.getWebAndMobClosedProjects()).to.be.an("array").to.have.lengthOf(2);
    });

    // moveDevsToFree function

    it("Method moveDevsToFree.Should return length of 2", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
        const dept = myCompany.departments["WebDept"];

        dept.projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:0}, {id:3, complexity:1}];
        dept.busyDevelopers = [{id:1, currentProject: 1, numberDoneProjects: 2, daysIdled: 2}, {id:2, currentProject: 2, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 3, numberDoneProjects: 1, daysIdled: 2}];
        dept.moveDevsToFree();

        expect(dept.freeDevelopers).to.have.lengthOf(2);
    });
});