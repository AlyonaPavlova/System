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

        // Генерация проектов на каждый день. Заполнение массивов в объектах отделов

        myCompany.director.getProjects(myCompany.departments["WebDept"].projectsInQueue, myCompany.departments["MobDept"].projectsInQueue);

        // Передаем проекты с нулевой сложностью из веб-отдела в отдел тестирования

        myCompany.departments["QADept"].addNewProjectsToQueue(myCompany.departments["WebDept"].getProjectsWithComplexityNull());

        // Передаем проекты с нулевой сложностью из моб-отдела в отдел тестирования

        myCompany.departments["QADept"].addNewProjectsToQueue(myCompany.departments["MobDept"].getProjectsWithComplexityNull());

        // Обрабатываем назначение свободных программистов на проекты в веб-отделе

        myCompany.departments["WebDept"].appointmentDevelopers();

        // Обрабатываем назначение свободных программистов на проекты в моб-отделе

        myCompany.departments["MobDept"].appointmentMobDevelopers();

        // Обрабатываем назначение свободных программистов на проекты в отделе тестирования

        myCompany.departments["QADept"].appointmentDevelopers();

        //  Уменьшаем сложность у проектов в прогрессе

        myCompany.departments.forEach(function (department) {
            department.reduceComplexityProjects();
        });

        // Проходимся по веб-проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["WebDept"].getProjectsWithComplexityNull().length) {
            myCompany.departments["WebDept"].cleanClosedProjects();
            myCompany.departments["WebDept"].moveWebAndMobDevelopers();
        }

        else {
            console.log("Array with web-projects is empty");
        }

        // Проходимся по  моб-проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["MobDept"].getProjectsWithComplexityNull().length) {
            myCompany.departments["MobDept"].cleanClosedProjects();
            myCompany.departments["MobDept"].moveWebAndMobDevelopers();
        }

        else {
            console.log("Array with mob-projects is empty");
        }

        // Проходимся по проектам (QA) с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["QADept"].getProjectsWithComplexityNull().length) {
            myCompany.departments["QADept"].cleanClosedProjects();
            myCompany.departments["QADept"].moveDevelopers();
        }

        else {
            console.log("Array with QA is empty");
        }

        // Обрабатываем назначение свободных программистов на проекты в веб-отделе

        myCompany.departments["WebDept"].appointmentDevelopers();

        // Обрабатываем назначение свободных программистов на проекты в моб-отделе

        myCompany.departments["MobDept"].appointmentMobDevelopers();

        // Обрабатываем назначение свободных программистов на проекты в отделе тестирования

        myCompany.departments["WebDept"].appointmentDevelopers();

        // Удаляем разработчика, у которого дни простоя = 3 (самого неопытного)

        myCompany.departments.forEach(function (department) {
            department.delDeveloper();
        });

        // Нанимаем разработчиков

        myCompany.departments.forEach(function (department) {
            department.addDeveloper();
        });



        n --;
        console.log("***end Day ***");
    }
}
main(3);