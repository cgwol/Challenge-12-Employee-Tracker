const inq = require('inquirer');
const figlet = require('figlet');
const {
    db, viewAllEmployees, viewAllDepartments, viewAllRoles,
    addDepartmentQuery
} = require('./queries.js');

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
        message: 'Enter name of new Department: '
    }
];

const roleInq = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter job title for new Role: '
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter salary for new Role: '
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
            // Add adding role method
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

module.exports = { init };