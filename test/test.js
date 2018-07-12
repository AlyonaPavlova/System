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
let webDeptDismissedDevelopers;
let lastElement;
let webDeptProjectsInProgress;
let webDeptProjectsInProgress2;

beforeEach(function () {
    myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

    webDeptProjectsInQueue = myCompany.departments["WebDept"].projectsInQueue;
    mobDeptProjectsInQueue = myCompany.departments["MobDept"].projectsInQueue;

    myCompany.director.getProjects(webDeptProjectsInQueue, mobDeptProjectsInQueue);
    callCreateNewProject = myCompany.director.createNewProject();

    webDeptFreeDev = myCompany.departments["WebDept"].freeDevelopers;
    myCompany.departments["WebDept"].developerToHire = 5;
    myCompany.departments["WebDept"].addDeveloper();

    myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: "", numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: "", numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: "", numberDoneProjects: 1, daysIdled: 3}];
    myCompany.departments["WebDept"].delDeveloper();
    webDeptDismissedDevelopers = myCompany.departments["WebDept"].dismissedDevelopers;
    lastElement = webDeptDismissedDevelopers[webDeptDismissedDevelopers.length - 1];

    myCompany.departments["WebDept"].projectsInProgress = [{id:1, complexity:0}, {id:2, complexity:1}, {id:3, complexity:0}];
    myCompany.departments["WebDept"].cleanClosedProjects();
    webDeptProjectsInProgress = myCompany.departments["WebDept"].projectsInProgress;

    webDeptProjectsInProgress.length = 0;
    myCompany.departments["WebDept"].projectsInQueue = [{id:1, complexity:3}, {id:2, complexity:2}, {id:3, complexity:1}];
    myCompany.departments["WebDept"].freeDevelopers = [{id:1, currentProject: "", numberDoneProjects: 2, daysIdled: 3}, {id:2, currentProject: "", numberDoneProjects: 1, daysIdled: 2}, {id:3, currentProject: "", numberDoneProjects: 1, daysIdled: 3}];
    myCompany.departments["WebDept"].appointmentDevelopers();
    webDeptBusyDevelopers = myCompany.departments["WebDept"].busyDevelopers;
    webDeptProjectsInProgress2 = myCompany.departments["WebDept"].projectsInProgress;
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
    expect(webDeptProjectsInProgress).to.have.lengthOf(1);
});

// appointmentDevelopers function

it("should return array with three elements", function () {
    expect(webDeptBusyDevelopers).to.have.lengthOf(3);
});

it("should return array with three elements", function () {
    expect(webDeptProjectsInProgress2).to.have.lengthOf(3);
});