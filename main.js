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

        // Генерация проектов на каждый день

        myCompany.director.getProjects(myCompany.departments["WebDept"].projectsInQueue, myCompany.departments["MobDept"].projectsInQueue);

        // Проверяем, сколько разработчиков нам надо нанять со вчерашнего дня

        myCompany.departments["WebDept"].addDeveloper();
        myCompany.departments["MobDept"].addDeveloper();
        myCompany.departments["QADept"].addDeveloper();

        // Проходимся по веб-проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["WebDept"].getProjectsWithComplexityNull() === []) {
            myCompany.departments["WebDept"].justCompleteProjects();
        }

        else {
            console.log("Array with web-projects is empty");
        }

        // Проходимся по  моб-проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["MobDept"].getProjectsWithComplexityNull() === []) {
            myCompany.departments["MobDept"].justCompleteProjects();
        }

        else {
            console.log("Array with mob-projects is empty");
        }

        // Передаем проекты с нулевой сложностью из веб-отдела в отдел тестирования

        myCompany.departments["QADept"].addNewProjectsToQueue(myCompany.departments["WebDept"].getProjectsWithComplexityNull());

        // Передаем проекты с нулевой сложностью из моб-отдела в отдел тестирования

        myCompany.departments["QADept"].addNewProjectsToQueue(myCompany.departments["MobDept"].getProjectsWithComplexityNull());

        // Обрабатываем назначение свободных программистов на проекты в веб-отделе

        myCompany.departments["WebDept"].appointmentDevelopers();

        // Обрабатываем назначение свободных программистов на проекты в моб-отделе

        myCompany.departments["MobDept"].appointmentMobDevelopers();

        // Проходимся по проектам (QA) с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["QADept"].getProjectsWithComplexityNull() === []) {
            myCompany.departments["QADept"].justCompleteProjects();
        }

        else {
            console.log("Array with QA is empty");
        }

        // Удаляем разработчика, у которого дни простоя = 3 (самого неопытного)

        myCompany.departments["WebDept"].delDeveloper();
        myCompany.departments["MobDept"].delDeveloper();
        myCompany.departments["QADept"].delDeveloper();




        n --;
        console.log("***end Day ***");
    }
}
main(3);