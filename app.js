const inquirer = require("inquirer");
const fs = require("fs");

// const Employee = require("./lib/Employee");
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
    ]).then(mAnswers => {
        // Create new manager from class constructor and add to team array
        const manager = new Manager(mAnswers.managerName, mAnswers.managerID, mAnswers.managerEmail, mAnswers.managerOffice);
        team.push(manager);
        employeeInfo();
    });
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
        },
        // Last question will determine if questions loop back around again
        {
            type: "list",
            message: "Do you want to create a new Employee?",
            name: "employeeNew",
            choices: ["Yes", "No"]
        }
    ]).then(eAnswers => {
        // Create new engineer or intern from class constructor and add to team array
        if(employeeType === "Intern"){
            const intern = new Intern(eAnswers.employeeName, eAnswers.employeeID, eAnswers.employeeEmail, eAnswers.internSchool);
            team.push(intern);
        } else {
            const engineer = new Engineer(eAnswers.employeeName, eAnswers.employeeID, eAnswers.employeeEmail, eAnswers.engineerGit);
            team.push(engineer);
        }
        // If user wants to create new employee, loop through questions again
        if(employeeNew === "Yes"){
            employeeInfo();
        } else {
            createHTML();
        }
    });
}

function createHTML () {
    // Create function to render HTML from different templates
}