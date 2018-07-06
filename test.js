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

let webproj1 = new WebProject(1, "name1");
let webproj2 = new WebProject(2, "name2");
let webproj3 = new WebProject(3, "name3");

let webdev1 = new WebDeveloper(1, "name1");
let webdev2 = new WebDeveloper(2, "name2");
let webdev3 = new WebDeveloper(3, "name3");


let webprojs = [webproj1,webproj2,webproj3];

let webdevs = [webdev1,webdev2,webdev3];



let mobproj1 = new WebProject(1, "name1");
let mobproj2 = new WebProject(2, "name2");
let mobproj3 = new WebProject(3, "name3");

let mobdev1 = new WebDeveloper(1, "name1");
let mobdev2 = new WebDeveloper(2, "name2");
let mobdev3 = new WebDeveloper(3, "name3");


let mobprojs = [mobproj1,mobproj2,mobproj3];

let mobdevs = [mobdev1,mobdev2,mobdev3];



let qabdev1 = new QASpecialist(1, "name1");
let qabdev2 = new QASpecialist(2, "name2");
let qabdev3 = new QASpecialist(3, "name3");


let qadevs = [qabdev1,qabdev2,qabdev3];



let web = new Department("WebDepartment", webprojs, webdevs);
let mob = new Department("MobDepartment", mobprojs, mobdevs);
let qa = new Department("QADepartment", qadevs);


let arrayDepartments = [web, mob, qa];

let dir = new Director("name");


let lodoss = new Company("Lodoss", arrayDepartments, dir);
console.log(lodoss);