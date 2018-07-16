class Department {
    projectsInQueue: any[];
    projectsInProgress: any[];
    freeDevelopers: Developer[];
    busyDevelopers: Developer[];
    developerToHire: number;
    developersCounter: number;
    dismissedDevelopers: number;
    hiredDevelopers: number;
    completedProjects: number;

    constructor() {
        this.projectsInQueue = [];
        this.projectsInProgress = [];
        this.freeDevelopers = [];
        this.busyDevelopers = [];
        this.developerToHire = 0;
        this.developersCounter = 0;
        this.dismissedDevelopers = 0;
        this.hiredDevelopers = 0;
        this.completedProjects = 0;
    }

    //  Добавляем разработчиков

    addDeveloper(): void {
        while (this.developerToHire) {
            this.developersCounter++;

            this.freeDevelopers.push(new Developer(this.developersCounter));

            this.developerToHire--;
            this.hiredDevelopers++;
        }
    }

    compareNumberDoneProjects(a: Developer, b: Developer): number {
        return a.numberDoneProjects - b.numberDoneProjects;
    }

    // Удаляем разработчиков, у которых дни простоя = 3

    delDeveloper(): void {
        let developersForDismissArr = this.freeDevelopers.filter(function (developer: Developer) {
            return developer.daysIdled === 3;
        });

        if (developersForDismissArr.length) {
            let sortDevelopers = developersForDismissArr.sort(this.compareNumberDoneProjects);

            this.freeDevelopers.splice(this.freeDevelopers.indexOf(this.getDeveloperById(sortDevelopers[0].id)), 1);

            this.dismissedDevelopers++;
        }
    }

    // Возвращаем разработчика, у которого указан передаваемый id проекта

    getDeveloperByProject (projectId): Developer {
        return this.busyDevelopers.find(function (developer: Developer) {
            return developer.currentProject === projectId;
        });
    }

    // Возвращаем разработчика, у которого указан передаваемый id разработчика

    getDeveloperById (developerId): Developer {
        return this.freeDevelopers.find(function (developer: Developer) {
            return developer.id === developerId;
        });
    }

    // Возвращаем проекты, у которых сложность = 0

    getWebAndMobClosedProjects (): any[] {
        return this.projectsInProgress.filter(function (project: any) {
            return project.complexity === 0;
        });
    }

    appointDeveloper (): void {
        const dev = this.freeDevelopers.shift();
        const project = this.projectsInQueue.shift();

        dev.daysIdled = 0;
        dev.currentProject = project.id;

        this.busyDevelopers.push(dev);
        this.projectsInProgress.push(project);
    }

    // Обрабатываем назначение свободных программистов на проекты

    appointmentDevelopers (): void {
        while (this.projectsInQueue.length && this.freeDevelopers.length) {
            this.appointDeveloper();
        }

        if (this.projectsInQueue.length) {
            this.developerToHire = this.projectsInQueue.length;
        }
        else {
            this.freeDevelopers.forEach(function (item: Developer) {
                item.daysIdled++;
            });
        }
    }

    // Уменьшаем сложность проектов

    reduceComplexityProjects(): void {
        this.projectsInProgress.forEach(function (project: any) {
            project.complexity--;
        });
    }

    // Проходим по массиву с нулевыми проектами, обнуляем текущие проекты у разработчиков и добавляем их в freeDevelopers

    moveDevsToFree(): void {
        let nullComplexityProjectsArr = this.getWebAndMobClosedProjects();

        nullComplexityProjectsArr.forEach((project: any) => {
            let currentDeveloper = this.getDeveloperByProject(project.id);
            currentDeveloper.currentProject = 0;
            this.freeDevelopers.push(currentDeveloper);
        });
    }

    // Удаляем проекты с нулевой сложностью

    cleanClosedProjects(): void {
        for (let index = 0; index < this.projectsInProgress.length; index++) {
            if (this.projectsInProgress[index].complexity === 0) {
                this.projectsInProgress.splice(index, 1);
                index--;
            }
        }
    }

    // Удаляем освободившихся разработчиков из массива занятых

    cleanFreeDevelopers(): void {
        for (let i = 0; i < this.busyDevelopers.length; i++) {
            if (this.busyDevelopers[i].currentProject === 0) {
                this.busyDevelopers[i].numberDoneProjects++;
                this.busyDevelopers.splice(i,1);
                i--;
            }
        }
    }

    projectsProcessing(QADept: QADepartment): void {
        if (this.getWebAndMobClosedProjects().length) {
            this.moveDevsToFree();
            QADept.receivingWebAndMobProjects(this.getWebAndMobClosedProjects());
            this.cleanClosedProjects();
            this.cleanFreeDevelopers();
        }
    }
}

class WebDepartment extends Department {}

class MobDepartment extends Department {
    appointMobDeveloper (parameters: { n: number, projectId: number }): void {
        let {n, projectId} = parameters;
        while(n) {
            const dev = this.freeDevelopers.shift();

            dev.daysIdled = 0;
            dev.currentProject = projectId;

            this.busyDevelopers.push(dev);
            n--;
        }
        const project = this.projectsInQueue.shift();

        this.projectsInProgress.push(project);
    }

    // Обрабатываем назначение свободных моб-программистов на проекты

    appointmentDevelopers(): void {
        for (let i = 0; i < this.projectsInQueue.length; i++) {
            if (this.projectsInQueue[i].complexity === 1 && this.freeDevelopers.length) {
                this.appointMobDeveloper({n: 1, projectId: this.projectsInQueue[i].id});
                i--;
            }
            else if (this.projectsInQueue[i] === 2 && this.freeDevelopers.length >= 2) {
                this.appointMobDeveloper({n: 2, projectId: this.projectsInQueue[i].id});
                i--;
            }
            else if (this.projectsInQueue[i] === 3 && this.freeDevelopers.length >= 3) {
                this.appointMobDeveloper({n: 3, projectId: this.projectsInQueue[i].id});
                i--;
            }
            else if (this.freeDevelopers.length && this.projectsInQueue.length) {
                while(this.freeDevelopers.length) {
                    const dev = this.freeDevelopers.shift();

                    dev.daysIdled = 0;
                    dev.currentProject = this.projectsInQueue[i].id;

                    this.busyDevelopers.push(dev);
                }
                const project = this.projectsInQueue.shift();

                this.projectsInProgress.push(project);
                i--;
            }
            else if (this.projectsInQueue.length) {
                this.developerToHire = this.projectsInQueue.length;
            }
            else {
                this.freeDevelopers.forEach(function (developer: Developer) {
                    developer.daysIdled ++;}
                );
            }
        }
    }
}

class QADepartment extends Department {
    // Добавление нулевых проектов из веб и моб отделов в отдел тестирования

    receivingWebAndMobProjects(projectsNullComplexity): void {
        this.projectsInQueue = this.projectsInQueue.concat(projectsNullComplexity);
        this.developerToHire = this.projectsInQueue.length;
    }

    getClosedProjects(): any[] {
        return this.projectsInProgress.filter(function (project: any) {
            return project.complexity === -1;
        });
    }

    // Проходим по массиву с проектами со сложностью -1, обнуляем текущие проекты у разработчиков и добавляем их в freeDevelopers

    moveDevsToFree(): void {
        let projectsWithComplexityNull = this.getClosedProjects();

        projectsWithComplexityNull.forEach((project: any) => {
            let currentDeveloper = this.getDeveloperByProject(project.id);

            currentDeveloper.currentProject = 0;
            this.freeDevelopers.push(currentDeveloper);
        });
    }

    cleanClosedQAProjects(): void {
        for (let index = 0; index < this.projectsInProgress.length; index++) {
            if (this.projectsInProgress[index].complexity === -1) {
                this.projectsInProgress.splice(index, 1);
                this.completedProjects++;
                index--;
            }
        }
    }

    projectsProcessing(): void {
        if (this.getClosedProjects().length) {
            this.moveDevsToFree();
            this.cleanClosedQAProjects();
            this.cleanFreeDevelopers();
        }
    }
}

class Developer {
    id: number;
    currentProject: number;
    numberDoneProjects: number;
    daysIdled: number;
    constructor(id) {
        this.id = id;
        this.currentProject = 0;
        this.numberDoneProjects = 0;
        this.daysIdled = 0;
    }
}

export {Department, WebDepartment, MobDepartment, QADepartment};