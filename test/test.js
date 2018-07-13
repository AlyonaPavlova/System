const { assert, should, expect } = require("chai");
const { Company, Director, WebDepartment, MobDepartment, QADepartment, Project, WebProject, MobProject, Developer} = require("../classes");

let myCompany;
let webDeptProjectsInQueue;
let mobDeptProjectsInQueue;
let callCreateNewProject;

describe("Director", function () {
    // createNewProject function

    it("should return object", function () {
        myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        webDeptProjectsInQueue = myCompany.departments["WebDept"].projectsInQueue;
        mobDeptProjectsInQueue = myCompany.departments["MobDept"].projectsInQueue;

        myCompany.director.getProjects(webDeptProjectsInQueue, mobDeptProjectsInQueue);
        callCreateNewProject = myCompany.director.createNewProject();

        expect(callCreateNewProject).to.be.an("object").to.have.all.keys("id", "complexity");
    });

    // getProjects function

    it("should return array", function () {
        myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        webDeptProjectsInQueue = myCompany.departments["WebDept"].projectsInQueue;
        mobDeptProjectsInQueue = myCompany.departments["MobDept"].projectsInQueue;

        myCompany.director.getProjects(webDeptProjectsInQueue, mobDeptProjectsInQueue);

        expect(webDeptProjectsInQueue).to.be.an("array");
    });

    it("should return array with projects", function () {
        myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

        webDeptProjectsInQueue = myCompany.departments["WebDept"].projectsInQueue;
        mobDeptProjectsInQueue = myCompany.departments["MobDept"].projectsInQueue;

        myCompany.director.getProjects(webDeptProjectsInQueue, mobDeptProjectsInQueue);

        if (webDeptProjectsInQueue.length) {
            webDeptProjectsInQueue.forEach(function (project) {
                expect(project).to.have.all.keys("id", "complexity");
            });
        }
    });
});