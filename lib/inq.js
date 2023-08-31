const inq = require('inquirer');
const figlet = require('figlet');
const {
    db, viewAllEmployees, viewAllDepartments, viewAllRoles,
    addDepartmentQuery, getDepartmentQuery, addRoleQuery
} = require('./queries.js');
const { title } = require('process');
const { async } = require('rxjs');

const inputChoice = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
            'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
];

const departmentInq = [
    {
        type: 'input',
        name: 'department',
        message: 'Enter name of new Department: ',
        validate: department => {
            if (department) { return true; }
            else { return 'Department must have a name' }
        }
    }
];

const roleInq = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter job title for new Role: ',
        validate: title => {
            if (title) { return true; }
            else { return 'Role must have a Title' }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter salary for new Role: ',
        validate: salary => {
            if (!isNaN(parseFloat(salary)) && isFinite(salary)) { return true; }
            else { return 'Salary must have a valid salary' }
        }
    },
    {
        type: 'list',
        name: 'department',
        message: 'Choose which department this role is for: ',
        choices: []
    }
];

function getChoice() {
    inq.prompt(inputChoice).then(response => {
        // console.log('User Choice: '+response.choice + '\n');
        choiceSwitch(response.choice);
    });
}

function init() {
    figlet('Employee Manager', (err, output) => {
        console.log(output);
        console.log();
        getChoice();
    })

}

function choiceSwitch(choice) {
    switch (choice) {
        case 'View All Employees':
            viewAllEmployees();
            getChoice();
            break;
        case 'Add Employee':
            console.log('Adding Employee');
            // Add employee method
            break;
        case 'Update Employee Role':
            console.log('Updating Employee Role');
            // Add update employee role method
            break;
        case 'View All Roles':
            viewAllRoles();
            getChoice();
            break;
        case 'Add Role':
            console.log('Adding Role');
            addRole();
            break;
        case 'View All Departments':
            viewAllDepartments();
            getChoice();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Quit':
            console.log('Quitting Application');
            process.exit();
        default:
            console.log("ERROR: Not a Choice");
    }

}

function addDepartment() {
    inq.prompt(departmentInq).then(response => {
        addDepartmentQuery(response.department);
        getChoice();
    });
}

async function addRole() {

    try {
        const departments = await getDepartmentQuery();
        const departmentChoices = departments.map(department => department.department_name);

        roleInq[2].choices = departmentChoices;

        // console.log(departmentChoices);
        inq.prompt(roleInq).then(response => {
            // console.log(response)
            addRoleQuery(response.title, response.salary, response.department);
            getChoice();
        });

    }
    catch (err) {
        console.error('Error adding role: ', err);
        process.exit();
    }



}

module.exports = { init };