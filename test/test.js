const { assert } = require("chai");
const { should } = require("chai");
const { expect } = require("chai");

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


let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

let webDept = myCompany.departments["WebDept"].projectsInQueue;
let mobDept = myCompany.departments["MobDept"].projectsInQueue;

myCompany.director.getProjects(webDept, mobDept);

describe("Class Director", function() {
    it("should return object", function () {
        expect(myCompany.director.createNewProject()).to.be.an("object").to.have.all.keys("id", "complexity");
    });

    it("should return array", function () {
        expect(webDept).to.be.an("array");
    });

    it("should return array with projects", function () {
        if (webDept.length) {
            webDept.forEach(function (project) {
                expect(project).to.have.all.keys("id", "complexity");
            });
        }
    });
});
