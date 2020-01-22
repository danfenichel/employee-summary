const inquirer = require("inquirer");
const fs = require("fs");

// const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const team = [];

function managerInfo() {
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

function employeeInfo() {
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
        if (eAnswers.employeeType === "Intern") {
            const intern = new Intern(eAnswers.employeeName, eAnswers.employeeID, eAnswers.employeeEmail, eAnswers.internSchool);
            team.push(intern);
        } else {
            const engineer = new Engineer(eAnswers.employeeName, eAnswers.employeeID, eAnswers.employeeEmail, eAnswers.engineerGit);
            team.push(engineer);
        }
        // If user wants to create new employee, loop through questions again
        if (eAnswers.employeeNew === "Yes") {
            employeeInfo();
        } else {
            createStart();
        }
    });
}

function createStart() {
    // Function to render starting HTML with manager info
    const startHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
    <title>Team Profile</title>
    <style>
        body {
            font-family: Verdana;
        }

        .heading {
            margin: 0 auto;
            background-color: gray;
            color: white;
            padding: 20px;
            width: auto;
            display: flex;
            justify-content: center;
            box-shadow: 3px 7px 18px #888888;
            font-weight: bold;
        }

        .container {
            display: flex;
            justify-content: center;
        }

        .card {
            margin: 10px;
        }
    </style>
</head>

<body>
    <h1 class="heading">Welcome to your Team Profile</h1>
    <br>
    <div class="container">
        <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
            <div class="card-header">Manager</div>
            <div class="card-body">
                <h5 class="card-title">Manager Name: ${team[0].name}</h5>
                <p class="card-text">Manager ID: ${team[0].id}</p>
                <p class="card-text">Manager Email: ${team[0].email}</p>
                <p class="card-text">Office Number: ${team[0].officeNumber}</p>
            </div>
        </div>
    </div>
</body>

</html>`;

    fs.writeFile('output/team.html', startHTML, (error) => {
        if (error) {
            console.log(error)
        }
    });
}

function createBody() {
    // Function to render HTML body cards for every new employee
}

function createEnd() {
    // Function to render closing HTML tags
}

managerInfo();