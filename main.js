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

        // console.log(myCompany.departments["WebDept"].projectsInQueue);
        // console.log(myCompany.departments["MobDept"].projectsInQueue);

        if (webProjectsInDay !== 0) {

            if (WebDepartment.freeDevelopers !== 0) {

                freeDevelopers.forEach(function (item) {
                    freeDevelopers[item].currentProject.push(newProjects[item].id);
                })
                // freeDevelopers[0].currentProject.push(projectsInDay[0].id);

            }
        }

        n --;
        console.log("***end Day ***");

    }
}
main(3);