"use strict";

const { Company, Director, WebDepartment, MobDepartment, QADepartment } = require("./classes");

function main(n) {
    let myCompany = new Company({"WebDept": new WebDepartment(), "MobDept": new MobDepartment(), "QADept": new QADepartment()}, new Director());
    let dayCounter = 0;

    while (n) {
        dayCounter++;

        console.log("***start Day " + dayCounter + " ***");
        console.log("\n");

        // Генерация проектов на каждый день. Заполнение массивов в объектах отделов

        myCompany.director.getProjects(myCompany.departments["WebDept"].projectsInQueue, myCompany.departments["MobDept"].projectsInQueue);

        // Обрабатываем назначение свободных программистов на проекты в веб-отделе

        myCompany.departments["WebDept"].appointmentDevelopers();

        // Обрабатываем назначение свободных программистов на проекты в моб-отделе

        myCompany.departments["MobDept"].appointmentMobDevelopers();

        // Обрабатываем назначение свободных программистов на проекты в отделе тестирования

        myCompany.departments["QADept"].appointmentDevelopers();

        //  Уменьшаем сложность у проектов в прогрессе

        for (let department in myCompany.departments) {
            myCompany.departments[department].reduceComplexityProjects();
        }

        // Проходимся по веб-проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["WebDept"].getWebAndMobClosedProjects().length) {
            myCompany.departments["WebDept"].moveWebAndMobDevelopers();
            myCompany.departments["QADept"].receivingWebAndMobProjects(myCompany.departments["WebDept"].getWebAndMobClosedProjects());
            myCompany.departments["WebDept"].cleanClosedProjects();
            myCompany.departments["WebDept"].cleanFreeDevelopers();
        }

        // Проходимся по моб-проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["MobDept"].getWebAndMobClosedProjects().length) {
            myCompany.departments["MobDept"].moveWebAndMobDevelopers();
            myCompany.departments["QADept"].receivingWebAndMobProjects(myCompany.departments["MobDept"].getWebAndMobClosedProjects());
            myCompany.departments["MobDept"].cleanClosedProjects();
            myCompany.departments["MobDept"].cleanFreeDevelopers();
        }

        // Проходимся по проектам (QA) с нулевой сложностью, сплайсим и пушим проекты и разработчиков

        if (myCompany.departments["QADept"].getQAClosedProjects().length) {
            myCompany.departments["QADept"].moveQADevelopers();
            myCompany.departments["QADept"].cleanClosedQAProjects();
            myCompany.departments["WebDept"].cleanFreeDevelopers();
        }

        // Удаляем разработчика, у которого дни простоя = 3 (самого неопытного)

        for (let department in myCompany.departments) {
            myCompany.departments[department].delDeveloper();
        }

        // Нанимаем разработчиков

        for (let department in myCompany.departments) {
            myCompany.departments[department].addDeveloper();
        }

        n --;
        console.log("***end Day ***");
        console.log("\n ||\n ||\n");
    }

    let hiredDevelopers = myCompany.departments["WebDept"].hiredDevelopers + myCompany.departments["MobDept"].hiredDevelopers + myCompany.departments["QADept"].hiredDevelopers;
    let dismissedDevelopers = myCompany.departments["WebDept"].dismissedDevelopers + myCompany.departments["MobDept"].dismissedDevelopers + myCompany.departments["QADept"].dismissedDevelopers;

    console.log("Number of completed projects: " + myCompany.departments["QADept"].completedProjects);
    console.log("Number of hired developers: " + hiredDevelopers);
    console.log("Number of dismissed developers: " + dismissedDevelopers);
}
main(10);
