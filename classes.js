function Company(departments, director) {
    this.departments = departments;
    this.director = director;
}

Company.prototype.hiringDevelopers = function(company) {
    for (var department in company) {
        company[department].addDeveloper();
    }
};

Company.prototype.dismissingDevelopers = function(company) {
    for (var department in company) {
        company[department].delDeveloper();
    }
};

Company.prototype.decreaseProjComplexity = function() {
    for (var dept in this.departments) {
        this.departments[dept].reduceComplexityProjects();
    }
};

Company.prototype.working = function(dir, depts, web, mob, QA) {
    // Генерация проектов на каждый день. Заполнение массивов в объектах отделов

    dir.getProjects(web.projectsInQueue, mob.projectsInQueue);

    // Обрабатываем назначение свободных программистов на проекты в отделах

    dir.setDevelopers(depts);

    //  Уменьшаем сложность у проектов в прогрессе

    this.decreaseProjComplexity();

    // Проходимся по проектам с нулевой сложностью, сплайсим и пушим проекты и разработчиков

    web.projectsProcessing(QA);
    mob.projectsProcessing(QA);
    QA.projectsProcessing();

    // Удаляем разработчика, у которого дни простоя = 3 (самого неопытного)

    this.dismissingDevelopers(depts);

    // Нанимаем разработчиков

    this.hiringDevelopers(depts);
};

var maxNumberProjectsPerDay = 4;

function Director() {
    this.projectsCounter = 0;
}

Director.prototype.createNewProject = function() {
    this.projectsCounter++;

    return Math.random() > 0.5 ? new WebProject(this.projectsCounter): new MobProject(this.projectsCounter);
};

Director.prototype.getProjects = function(webDeptQueue, mobDeptQueue) {
    var projectsCount = Math.floor(Math.random() * maxNumberProjectsPerDay);

    while (projectsCount) {
        var project = this.createNewProject();

        if (project instanceof WebProject) {
            webDeptQueue.push(project);
        }
        else {
            mobDeptQueue.push(project);
        }

        projectsCount--;
    }
};

Director.prototype.setDevelopers = function(depts) {
    for (var department in depts) {
        depts[department].appointmentDevelopers();
    }
};

function Project(id) {
    this.id = id;
    this.complexity = this.getRandComplexity();
}

Project.prototype.getRandComplexity = function() {
    return Math.floor(Math.random() * 3) + 1;
};

function WebProject () {
    Project.apply(this, arguments);
}

WebProject.prototype = Object.create(Project.prototype);
WebProject.prototype.constructor = WebProject;

function MobProject () {
    Project.apply(this, arguments);
}

MobProject.prototype = Object.create(Project.prototype);
MobProject.prototype.constructor = MobProject;

function Department() {
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

Department.prototype.addDeveloper = function() {
    while (this.developerToHire) {
        this.developersCounter++;

        this.freeDevelopers.push(new Developer(this.developersCounter));

        this.developerToHire--;
        this.hiredDevelopers++;
    }
};

Department.prototype.compareNumberDoneProjects = function(a, b) {
    return a.numberDoneProjects - b.numberDoneProjects;
};

// Удаляем разработчиков, у которых дни простоя = 3

Department.prototype.delDeveloper = function() {
    var developersForDismissArr = this.freeDevelopers.filter(function (developer) {
        return developer.daysIdled === 3;
    });

    if (developersForDismissArr.length) {
        var sortDevelopers = developersForDismissArr.sort(this.compareNumberDoneProjects);

        this.freeDevelopers.splice(this.freeDevelopers.indexOf(this.getDeveloperById(sortDevelopers[0].id)), 1);

        this.dismissedDevelopers++;
    }
};

// Возвращаем разработчика, у которого указан передаваемый id проекта

Department.prototype.getDeveloperByProject = function(projectId) {
    return this.busyDevelopers.find(function (developer) {
        return developer.currentProject === projectId;
    });
};

// Возвращаем разработчика, у которого указан передаваемый id разработчика

Department.prototype.getDeveloperById = function(developerId) {
    return this.freeDevelopers.find(function (developer) {
        return developer.id === developerId;
    });
};

// Возвращаем проекты, у которых сложность = 0

Department.prototype.getWebAndMobClosedProjects = function() {
    return this.projectsInProgress.filter(function (project) {
        return project.complexity === 0;
    });
};

Department.prototype.appointDeveloper = function() {
    // Удаляем разработчика из массива свободных

    var dev = this.freeDevelopers.shift();

    // Удаляем проект из массива очереди

    var project = this.projectsInQueue.shift();

    // Обнуляем у разработчика счетчик дней простоя

    dev.daysIdled = 0;

    // Присваиваем разработчику id текущего проекта

    dev.currentProject = project.id;

    // Добавляем разработчика в массив занятых

    this.busyDevelopers.push(dev);

    // Добавляем проект в массив проектов в работе

    this.projectsInProgress.push(project);
};

// Обрабатываем назначение свободных программистов на проекты

Department.prototype.appointmentDevelopers = function() {
    while (this.projectsInQueue.length && this.freeDevelopers.length) {
        this.appointDeveloper();
    }

    if (this.projectsInQueue.length) {
        this.developerToHire = this.projectsInQueue.length;
    }
    else {
        this.freeDevelopers.forEach(function (item) {
            item.daysIdled++;
        });
    }
};

// Уменьшаем сложность проектов

Department.prototype.reduceComplexityProjects = function() {
    this.projectsInProgress.forEach(function (project) {
        project.complexity--;
    });
};

// Проходим по массиву с нулевыми проектами, обнуляем текущие проекты у разработчиков и добавляем их в freeDevelopers

Department.prototype.moveDevsToFree = function() {
    var nullComplexityProjectsArr = this.getWebAndMobClosedProjects();

    nullComplexityProjectsArr.forEach((project) => {
        var currentDeveloper = this.getDeveloperByProject(project.id);
        currentDeveloper.currentProject = 0;
        this.freeDevelopers.push(currentDeveloper);
    });
};

// Удаляем проекты с нулевой сложностью

Department.prototype.cleanClosedProjects = function() {
    for (var index = 0; index < this.projectsInProgress.length; index++) {
        if (this.projectsInProgress[index].complexity === 0) {
            this.projectsInProgress.splice(index, 1);
            index--;
        }
    }
};

// Удаляем освободившихся разработчиков из массива занятых

Department.prototype.cleanFreeDevelopers = function() {
    for (var i = 0; i < this.busyDevelopers.length; i++) {
        if (this.busyDevelopers[i].currentProject === 0) {
            this.busyDevelopers[i].numberDoneProjects++;
            this.busyDevelopers.splice(i,1);
            i--;
        }
    }
};

Department.prototype.projectsProcessing = function(QADept) {
    if (this.getWebAndMobClosedProjects().length) {
        this.moveDevsToFree();
        QADept.receivingWebAndMobProjects(this.getWebAndMobClosedProjects());
        this.cleanClosedProjects();
        this.cleanFreeDevelopers();
    }
};

module.exports = {Company, Director, Department};