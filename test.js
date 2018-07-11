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
    let myCompany = new Company({"WebDept": new WebDepartment(), "QADept": new QADepartment()}, new Director());

    while (n) {
        console.log("***start Day ***");
        console.log("\n");

        // Генерация проектов на каждый день. Заполнение массивов в объектах отделов

        myCompany.director.getProjects(myCompany.departments["WebDept"].projectsInQueue);


        console.log("\n");
        console.log(" Получили новые проекты в начале дня");
        console.log(myCompany.departments["WebDept"].projectsInQueue);

        console.log("\n");
        console.log(" Проекты с нулевой сложностью в веб-отделе");
        console.log(myCompany.departments["WebDept"].getProjectsWithComplexityNull());

        // Передаем проекты с нулевой сложностью из веб-отдела в отдел тестирования

        myCompany.departments["QADept"].addNewProjectsToQueue(myCompany.departments["WebDept"].getProjectsWithComplexityNull());

        console.log("\n");
        console.log(" Проекты с нулевой сложностью в веб-отделе после передачи веб-поектов в отдел тестирования");
        console.log(myCompany.departments["WebDept"].getProjectsWithComplexityNull());

        // Обрабатываем назначение свободных программистов на проекты в веб-отделе

        myCompany.departments["WebDept"].appointmentDevelopers();

        console.log("\n");
        console.log(" Занятые программисты в веб-отделе после назначения свободных программистов на проекты");
        console.log(myCompany.departments["WebDept"].busyDevelopers);

        console.log("\n");
        console.log(" Свободные программисты в веб-отделе после назначения свободных программистов на проекты");
        console.log(myCompany.departments["WebDept"].freeDevelopers);

        // Обрабатываем назначение свободных программистов на проекты в отделе тестирования

        myCompany.departments["QADept"].appointmentDevelopers();

        console.log("\n");
        console.log(" Занятые программисты в отделе тестирования после назначения свободных программистов на проекты");
        console.log(myCompany.departments["QADept"].busyDevelopers);

        console.log("\n");
        console.log(" Свободные программисты в отделе тестирования после назначения свободных программистов на проекты");
        console.log(myCompany.departments["QADept"].freeDevelopers);

        console.log("\n");
        console.log(" Проекты в прогрессе в веб-отделе");
        console.log(myCompany.departments["WebDept"].projectsInProgress);
        console.log(" Проекты в прогрессе в отделе тестирования");
        console.log(myCompany.departments["QADept"].projectsInProgress);

        //  Уменьшаем сложность у проектов в прогрессе

        for (let department in myCompany.departments) {
            myCompany.departments[department].reduceComplexityProjects();
        }

        console.log("\n");
        console.log(" Проекты в прогрессе в веб-отделе после уменьшения сложности");
        console.log(myCompany.departments["WebDept"].projectsInProgress);
        console.log(" Проекты в прогрессе в отделе тестирования после уменьшения сложности");
        console.log(myCompany.departments["QADept"].projectsInProgress);

        // Проходимся по веб-проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["WebDept"].getProjectsWithComplexityNull().length) {
            myCompany.departments["WebDept"].cleanClosedProjects();
            myCompany.departments["WebDept"].moveWebAndMobDevelopers();
        }

        // Проходимся по проектам (QA) с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["QADept"].getProjectsWithComplexityNull().length) {
            myCompany.departments["QADept"].cleanClosedProjects();
            myCompany.departments["QADept"].moveDevelopers();
        }

        console.log("\n");
        console.log(" Занятые программисты в веб-отделе после прохода по нулевым");
        console.log(myCompany.departments["WebDept"].busyDevelopers);

        console.log("\n");
        console.log(" Свободные программисты в веб-отделе после прохода по нулевым");
        console.log(myCompany.departments["WebDept"].freeDevelopers);

        console.log("\n");
        console.log(" Занятые программисты в отделе тестирования после прохода по нулевым");
        console.log(myCompany.departments["QADept"].busyDevelopers);

        console.log("\n");
        console.log(" Свободные программисты в отделе тестирования после прохода по нулевым");
        console.log(myCompany.departments["QADept"].freeDevelopers);

        console.log("\n");
        console.log(" Проекты в прогрессе в веб-отделе после прохода по нулевым");
        console.log(myCompany.departments["WebDept"].projectsInProgress);
        console.log(" Проекты в прогрессе в отделе тестирования после прохода по нулевым");
        console.log(myCompany.departments["QADept"].projectsInProgress);

        // Удаляем разработчика, у которого дни простоя = 3 (самого неопытного)

        for (let department in myCompany.departments) {
            myCompany.departments[department].delDeveloper();
        }

        console.log("\n");
        console.log(" Свободные программисты в веб-отделе после удаления самого неопытного");
        console.log(myCompany.departments["WebDept"].freeDevelopers);
        console.log(" Свободные программисты в отделе тестирования после удаления самого неопытного");
        console.log(myCompany.departments["QADept"].freeDevelopers);

        // Нанимаем разработчиков

        for (let department in myCompany.departments) {
            myCompany.departments[department].addDeveloper();
        }

        console.log("\n");
        console.log(" Свободные программисты в веб-отделе после наема новых программистов");
        console.log(myCompany.departments["WebDept"].freeDevelopers);
        console.log(" Свободные программисты в отделе тестирования после наема новых программистов");
        console.log(myCompany.departments["QADept"].freeDevelopers);


        n --;
        console.log("***end Day ***");
        console.log("\n ||\n ||\n");
    }
}
main(5);