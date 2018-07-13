const { assert, should, expect } = require("chai");

const { Company } = require("../classes");
const { Director } = require("../classes");
const { Department } = require("../classes");
const { WebDepartment } = require("../classes");
const { MobDepartment } = require("../classes");
const { QADepartment } = require("../classes");
const { Project } = require("../classes");
const { WebProject } = require("../classes");
const { MobProject } = require("../classes");
const { Developer } = require("../classes");

let myCompany;
let webDeptProjectsInQueue;
let mobDeptProjectsInQueue;
let callCreateNewProject;
let webDeptFreeDev;
let webDeptProjectsInProgressClean;
let webDeptDismissedDevelopers;
let lastElement;
let webDeptProjectsInProgress;
let webDeptDeveloperToHire;
let webDeptBusyDevelopers;
let webDeptProjectsInQueueLength;
let webDeptFreeDevelopersDaysIdled;
let webDeptFreeDevelopers;
let callGetDeveloperByProject;
let callGetProjectsWithComplexityNull;

beforeEach(function () {
    myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

    webDeptProjectsInQueue = myCompany.departments["WebDept"].projectsInQueue;
    mobDeptProjectsInQueue = myCompany.departments["MobDept"].projectsInQueue;

    myCompany.director.getProjects(webDeptProjectsInQueue, mobDeptProjectsInQueue);
    callCreateNewProject = myCompany.director.createNewProject();

    webDeptFreeDev = myCompany.departments["WebDept"].freeDevelopers;
    myCompany.departments["WebDept"].developerToHire = 5;
    myCompany.departments["WebDept"].addDeveloper();

    myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 3}];
    myCompany.departments["WebDept"].delDeveloper();
    webDeptDismissedDevelopers = myCompany.departments["WebDept"].dismissedDevelopers;
    lastElement = webDeptDismissedDevelopers[webDeptDismissedDevelopers.length - 1];

    myCompany.departments["WebDept"].projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:1}, {id:3, complexity:0}];
    myCompany.departments["WebDept"].cleanClosedProjects();
    webDeptProjectsInProgressClean = myCompany.departments["WebDept"].projectsInProgress;

    myCompany.departments["WebDept"].projectsInProgress = [];
    myCompany.departments["WebDept"].projectsInQueue = [{id:1, complexity:3}, {id:2, complexity:2}, {id:3, complexity:1}];
    myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 3}];
    myCompany.departments["WebDept"].appointmentDevelopers();
    webDeptBusyDevelopers = myCompany.departments["WebDept"].busyDevelopers;
    webDeptProjectsInProgress = myCompany.departments["WebDept"].projectsInProgress;

    myCompany.departments["WebDept"].projectsInQueue = [{id:1, complexity:3}, {id:2, complexity:2}, {id:3, complexity:1}];
    myCompany.departments["WebDept"].freeDevelopers = [];
    myCompany.departments["WebDept"].appointmentDevelopers();
    webDeptDeveloperToHire = myCompany.departments["WebDept"].developerToHire;
    webDeptProjectsInQueueLength = myCompany.departments["WebDept"].projectsInQueue.length;

    myCompany.departments["WebDept"].projectsInQueue = [];
    myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: 0, numberDoneProjects: 2, daysIdled: 2}, {id:2, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 0, numberDoneProjects: 1, daysIdled: 2}];
    myCompany.departments["WebDept"].appointmentDevelopers();
    webDeptFreeDevelopersDaysIdled = myCompany.departments["WebDept"].freeDevelopers;

    myCompany.departments["WebDept"].busyDevelopers = [{id:5, currentProject: 1, numberDoneProjects: 2, daysIdled: 2}, {id:6, currentProject: 2, numberDoneProjects: 2, daysIdled: 2}];
    callGetDeveloperByProject = myCompany.departments["WebDept"].getDeveloperByProject(1);

    myCompany.departments["WebDept"].projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:0}, {id:3, complexity:1}];
    callGetProjectsWithComplexityNull = myCompany.departments["WebDept"].getProjectsWithComplexityNull();

    myCompany.departments["WebDept"].freeDevelopers = [];
    myCompany.departments["WebDept"].projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:0}, {id:3, complexity:1}];
    myCompany.departments["WebDept"].busyDevelopers = [{id:1, currentProject: 1, numberDoneProjects: 2, daysIdled: 2}, {id:2, currentProject: 2, numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: 3, numberDoneProjects: 1, daysIdled: 2}];
    myCompany.departments["WebDept"].moveWebAndMobDevelopers();
    webDeptFreeDevelopers = myCompany.departments["WebDept"].freeDevelopers;
});

// createNewProject function

it("should return object", function () {
    expect(callCreateNewProject).to.be.an("object").to.have.all.keys("id", "complexity");
});

// getProjects function

it("should return array", function () {
    expect(webDeptProjectsInQueue).to.be.an("array");
});

it("should return array with projects", function () {
    if (webDeptProjectsInQueue.length) {
        webDeptProjectsInQueue.forEach(function (project) {
            expect(project).to.have.all.keys("id", "complexity");
        });
    }
});

// addDeveloper function

it("should return length of 5", function () {
    expect(webDeptFreeDev).to.have.lengthOf(5);
});

it("should return object with properties", function () {
    webDeptFreeDev.forEach(function (developer) {
        expect(developer).to.be.an("object").to.have.all.keys("id", "currentProject", "numberDoneProjects", "daysIdled");
    });
});

// delDeveloper function

it("should return id equal 3", function () {
    expect(lastElement).to.have.property("id", 3);
});

// cleanClosedProjects function

it("should return array with one element", function () {
    expect(webDeptProjectsInProgressClean).to.have.lengthOf(1);
});

// appointmentDevelopers function

it("should return array with three elements", function () {
    expect(webDeptBusyDevelopers).to.have.lengthOf(3);
});

it("should return equality of two variables", function () {
    expect(webDeptDeveloperToHire).to.equal(webDeptProjectsInQueueLength);
});

it("should return property daysIdled equality 3", function () {
    webDeptFreeDevelopersDaysIdled.forEach(function (developer) {
        expect(developer.daysIdled).to.equal(3);
    });
});

// getDeveloperByProject function

it("should return object with property currentProject equal 1", function () {
    expect(callGetDeveloperByProject).to.be.an("object").to.have.property("currentProject", 1);
});

// getProjectsWithComplexityNull function

it("should return object with property currentProject equal 1", function () {
    expect(callGetProjectsWithComplexityNull).to.be.an("array").to.have.lengthOf(2);
});

// moveWebAndMobDevelopers function

it("should return length of 2", function () {
    expect(webDeptFreeDevelopers).to.have.lengthOf(2);
});

