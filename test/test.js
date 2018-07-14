const { assert, should, expect } = require("chai");
const {Company, Director, WebDepartment, MobDepartment, QADepartment} = require("../classes");

describe("Director", function () {
    // createNewProject function

    it("Method createNewProject.Should return object", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        let callCreateNewProject = myCompany.director.createNewProject();

        expect(callCreateNewProject).to.be.an("object").to.have.all.keys("id", "complexity");
    });

    // getProjects function

    it("Method getProjects.Should return array with projects", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        let webDeptProjectsInQueue = myCompany.departments["WebDept"].projectsInQueue;
        let mobDeptProjectsInQueue = myCompany.departments["MobDept"].projectsInQueue;

        myCompany.director.getProjects(webDeptProjectsInQueue, mobDeptProjectsInQueue);

        if (webDeptProjectsInQueue.length) {
            webDeptProjectsInQueue.forEach(function (project) {
                expect(project).to.have.all.keys("id", "complexity");
            });
        }
    });
});

describe("Department", function () {
    // addDeveloper function

    it("Method addDeveloper.Should return length of 5", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        let webDeptFreeDev = myCompany.departments["WebDept"].freeDevelopers;

        myCompany.departments["WebDept"].developerToHire = 5;
        myCompany.departments["WebDept"].addDeveloper();

        expect(webDeptFreeDev).to.have.lengthOf(5);
    });

    it("Method addDeveloper.Should return object with properties", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        let webDeptFreeDev = myCompany.departments["WebDept"].freeDevelopers;

        myCompany.departments["WebDept"].developerToHire = 5;
        myCompany.departments["WebDept"].addDeveloper();

        webDeptFreeDev.forEach(function (developer) {
            expect(developer).to.be.an("object").to.have.all.keys("id", "currentProject", "numberDoneProjects", "daysIdled");
        });
    });

    // delDeveloper function

    it("Method delDeveloper.Should return id equal 3", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 3}];
        myCompany.departments["WebDept"].delDeveloper();

        let freeDevelopers = myCompany.departments["WebDept"].freeDevelopers;

        expect(freeDevelopers).to.have.lengthOf(2);
    });

    // cleanClosedProjects function

    it("Method cleanClosedProjects.Should return array with one element", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:1}, {id:3, complexity:0}];
        myCompany.departments["WebDept"].cleanClosedProjects();

        let webDeptProjectsInProgressClean = myCompany.departments["WebDept"].projectsInProgress;

        expect(webDeptProjectsInProgressClean).to.have.lengthOf(1);
    });

    // appointmentDevelopers function

    it("Method appointmentDevelopers.Should return array with three elements", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].projectsInProgress = [];
        myCompany.departments["WebDept"].projectsInQueue = [{id:1, complexity:3}, {id:2, complexity:2}, {id:3, complexity:1}];
        myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 3}];
        myCompany.departments["WebDept"].appointmentDevelopers();

        let webDeptBusyDevelopers = myCompany.departments["WebDept"].busyDevelopers;

        expect(webDeptBusyDevelopers).to.have.lengthOf(3);
    });

    it("Method appointmentDevelopers.Should return equality of two variables", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].projectsInQueue = [{id:1, complexity:3}, {id:2, complexity:2}, {id:3, complexity:1}];
        myCompany.departments["WebDept"].freeDevelopers = [];
        myCompany.departments["WebDept"].appointmentDevelopers();

        let webDeptDeveloperToHire = myCompany.departments["WebDept"].developerToHire;
        let webDeptProjectsInQueueLength = myCompany.departments["WebDept"].projectsInQueue.length;

        expect(webDeptDeveloperToHire).to.equal(webDeptProjectsInQueueLength);
    });

    it("Method appointmentDevelopers.Should return property daysIdled equality 3", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].projectsInQueue = [];
        myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 2}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}];
        myCompany.departments["WebDept"].appointmentDevelopers();

        let webDeptFreeDevelopersDaysIdled = myCompany.departments["WebDept"].freeDevelopers;

        webDeptFreeDevelopersDaysIdled.forEach(function (developer) {
            expect(developer.daysIdled).to.equal(3);
        });
    });

    // getDeveloperByProject function

    it("Method getDeveloperByProject.Should return object with property currentProject equal 1", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].busyDevelopers = [{id:5, currentProject: 1, numberDoneProjects: 2, daysIdled: 2}, {id:6, currentProject: 2, numberDoneProjects: 2, daysIdled: 2}];

        let callGetDeveloperByProject = myCompany.departments["WebDept"].getDeveloperByProject(1);

        expect(callGetDeveloperByProject).to.be.an("object").to.have.property("currentProject", 1);
    });

    // getWebAndMobClosedProjects function

    it("Method getWebAndMobClosedProjects.Should return object with property currentProject equal 1", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:0}, {id:3, complexity:1}];

        let callGetProjectsWithComplexityNull = myCompany.departments["WebDept"].getWebAndMobClosedProjects();

        expect(callGetProjectsWithComplexityNull).to.be.an("array").to.have.lengthOf(2);
    });

    // moveWebAndMobDevelopers function

    it("Method moveWebAndMobDevelopers.Should return length of 2", function () {
        let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        myCompany.departments["WebDept"].freeDevelopers = [];
        myCompany.departments["WebDept"].projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:0}, {id:3, complexity:1}];
        myCompany.departments["WebDept"].busyDevelopers = [{id:1, currentProject: 1, numberDoneProjects: 2, daysIdled: 2}, {id:2, currentProject: 2, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 3, numberDoneProjects: 1, daysIdled: 2}];
        myCompany.departments["WebDept"].moveWebAndMobDevelopers();

        let webDeptFreeDevelopers = myCompany.departments["WebDept"].freeDevelopers;

        expect(webDeptFreeDevelopers).to.have.lengthOf(2);
    });
});