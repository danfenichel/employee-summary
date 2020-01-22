const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const team = [];

function managerInfo () {
    // Every team has one manager; gather manager info first from separate questions
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the Team Manager?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the Manager's employee ID?",
            name: "managerID"
        },
        {
            type: "input",
            message: "What is the Manager's email address?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is the Manager's office number?",
            name: "managerOffice"
        }
    ]);
}

function employeeInfo () {
    // Next gather employee information; will loop through as many times as user requests
    inquirer.prompt([
        {
            type: "list",
            message: "Is this employee an Intern or an Engineer?",
            name: "employeeType",
            choices: ["Intern", "Engineer"]
        },
        {
            type: "input",
            message: "What is the Employee's name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "What is the Employee's employee ID?",
            name: "employeeID"
        },
        {
            type: "input",
            message: "What is the Employee's email address?",
            name: "employeeEmail"
        },
        // Next questions will display one or the other depending if employee is intern or engineer
        {
            type: "input",
            message: "Where does the Intern attend school?",
            name: "internSchool",
            when: (response) => response.employeeType === "Intern"
        },
        {
            type: "input",
            message: "What is the Engineer's GitHub URL?",
            name: "engineerGit",
            when: (response) => response.employeeType === "Engineer"
        }
    ]);
}

managerInfo();
employeeInfo();