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

// Создаем петлю while, в которой каждая итерация равна 1 дню
// Параметр  n равен кол-ву дней (входные данные)

while (n) {

    Director.getProjects(); //В начале каждого дня мы получаем проекты

    //  Проверяем, есть ли среди полученных проектов веб-проекты?
    //  Если есть, то проверяем, есть ли в веб-отделе свободные разработчики?

    if (Director.countWebProject() !== 0) {

        if (WebDepartment.freeWebDevelopers !== 0) {

            //  Присваиваем конкретному разработчику конкретный проект (по  id)
            //  Или разработчикам проекты (каждому по 1 проекту)

        }

        // Если кол-во разработчиков меньше кол-ва полученных проектов

        else if (WebDepartment.freeWebDevelopers < Director.countWebProject()) {

            let  difference = Director.countWebProject() - WebDepartment.freeWebDevelopers;

            // Нанимаем кол-во разработчиков равное числу в переменной difference
        }

        // Если же свободных разработчиков нет, то проверяем кол-во полученных проектов, и в зависимости от этого нанимаем разработчиков

        else {

            if (Director.countWebProject() === 1) {

                // Нанимаем 1 веб-разработчика

            }
            else if (Director.countWebProject() === 2) {

                // Нанимаем 2 веб-разработчиков

            }
            else if (Director.countWebProject() === 3) {

                // Нанимаем 3 веб-разработчиков

            }
            else if (Director.countWebProject() === 4) {

                // Нанимаем 4 веб-разработчиков

            }
        }

    }

    //  Проверяем, есть ли среди полученных проектов моб-проекты?
    //  Если есть, то проверяем, есть ли в моб-отделе свободные разработчики?
    //  Если свободные разработчики есть, проверяем какова сложность проекта

    if (Director.countMobProject() !== 0) {

        if (MobDepartment.freeMobDevelopers !== 0) {

            if (Project.complexity() === 1) {

                if (MobDepartment.freeMobDevelopers === 1) {

                    //  Присваиваем конкретному разработчику этот конкретный проект (по  id)

                }
                else if (MobDepartment.freeMobDevelopers > Project.complexity()) {

                    // Рандомно выбираем разработчика и присваиваем ему этот конкретный проект (по  id)

                }

            }
            else if (Project.complexity() === 2) {

                if (MobDepartment.freeMobDevelopers === 2) {

                    //  Присваиваем 2 разработчикам этот конкретный проект (по  id)

                }
                else if (MobDepartment.freeMobDevelopers > Project.complexity()) {

                    // Рандомно выбираем 2 разработчиков и присваиваем им этот конкретный проект (по  id)

                }
                else if (MobDepartment.freeMobDevelopers < Project.complexity()) {

                    // Нанимаем 1 нового разработчика и ставим его и еще того, кто уже есть на этот проект

                }
            }

            else if (Project.complexity() === 3) {

                if (MobDepartment.freeMobDevelopers === 3) {

                    //  Присваиваем 3 разработчикам этот конкретный проект (по  id)

                }
                else if (MobDepartment.freeMobDevelopers > Project.complexity()) {

                    // Рандомно выбираем 3 разработчиков и присваиваем им этот конкретный проект (по  id)

                }
                else if (MobDepartment.freeMobDevelopers < Project.complexity()) {

                    let  difference = Project.complexity() - MobDepartment.freeMobDevelopers;

                    // Нанимаем difference разработчиков и ставим их и еще того или тех, кто уже есть на этот проект

                }
            }
        }


        // Если кол-во разработчиков меньше кол-ва полученных проектов

        else if (MobDepartment.freeMobDevelopers < Director.countMobProject()) {

            // Проверяем, равняется ли кол-во свободных разработчиков сложности КОНКРЕТНОГО проекта

            if (MobDepartment.freeMobDevelopers === Project.complexity()) {

                // Присваиваем этому разработчику или разработчикам этот конкретный проект
                // Вычитаем из WebDepartment.freeMobDevelopers это кол-во разработчиков

            }
            else if (MobDepartment.freeMobDevelopers < Project.complexity()) {

                let  difference = Project.complexity() - MobDepartment.freeMobDevelopers;

                // Нанимаем difference кол-во разработчиков

            }

            else if (MobDepartment.freeMobDevelopers > Project.complexity()) {

                let  difference = MobDepartment.freeMobDevelopers - Project.complexity();

                // Присваиваем difference кол-ву разработчиков этот проект
                // Вычитаем из WebDepartment.freeMobDevelopers это кол-во разработчиков

            }

            // После чего проделываем тоже самое со следующим проектом
            // (Надо будет для этого помещать полученные моб-проекты в массив и пройтись по нему forEach)

        }

        // Если же свободных разработчиков нет, то проверяем кол-во полученных проектов, и в зависимости от этого нанимаем разработчиков


    }

}
