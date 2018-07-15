"use strict";

const { Company, Director, WebDepartment, MobDepartment, QADepartment } = require("./classes");

function main(n) {
    let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
    let director = myCompany.director;
    let departments = myCompany.departments;
    let webDept = departments["WebDept"];
    let mobDept = departments["MobDept"];
    let QADept = departments["QADept"];

    while (n) {
        myCompany.working(director, departments, webDept, mobDept, QADept);
        n --;
    }

    let hiredDevelopers = webDept.hiredDevelopers + mobDept.hiredDevelopers + QADept.hiredDevelopers;
    let dismissedDevelopers = webDept.dismissedDevelopers + mobDept.dismissedDevelopers + QADept.dismissedDevelopers;

    console.log("Number of completed projects: " + QADept.completedProjects);
    console.log("Number of hired developers: " + hiredDevelopers);
    console.log("Number of dismissed developers: " + dismissedDevelopers);
}
main(10);
