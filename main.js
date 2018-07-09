"use strict";

const { Company } = require("./classes");
const { Director } = require("./classes");
const { Department } = require("./classes");
const { WebDepartment } = require("./classes");
const { MobDepartment } = require("./classes");
const { QADepartment } = require("./classes");
const { Project } = require("./classes");
const { WebProject } = require("./classes");
const { MobProject } = require("./classes");
const { Developer } = require("./classes");
const { WebDeveloper } = require("./classes");
const { MobDeveloper } = require("./classes");
const { QASpecialist } = require("./classes");


function main(n) {

    let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());

    while (n) {

        console.log("***start Day ***");
        myCompany.director.getProjects(myCompany.departments["WebDept"].projectsInQueue, myCompany.departments["MobDept"].projectsInQueue);

        myCompany.departments["QADept"].addNewProjectsToQueue(myCompany.departments["WebDept"].returnProjectsWithComplexityNull());

        n --;
        console.log("***end Day ***");

    }
}
main(3);