const inq = require('inquirer');
const figlet = require('figlet');
const clear = require('clear');
const {
    db, viewAllEmployeesQuery, viewAllDepartmentsQuery, viewAllRolesQuery,
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
    figlet('Employee Manager', (err, output) => {
        console.log(output + '\n');
        inq.prompt(inputChoice).then(response => {
            clear();
            choiceSwitch(response.choice);
        });
    });

}

function init() {
    clear();
    getChoice();
}

function choiceSwitch(choice) {
    switch (choice) {
        case 'View All Employees':
            clear();
            figlet('Viewing Employees', (err, output) => {
                console.log(output + '\n');
                viewAllEmployees();
            });
            break;
        case 'Add Employee':
            clear();
            console.log('Adding Employee');
            // Add employee method
            break;
        case 'Update Employee Role':
            clear();
            console.log('Updating Employee Role');
            // Add update employee role method
            break;
        case 'View All Roles':
            clear();
            figlet('Viewing Roles', (err, output) => {
                console.log(output + '\n');
                viewAllRoles();
            });
            break;
        case 'Add Role':
            clear();
            figlet('Adding Role', (err, output) => {
                console.log(output + '\n');
                addRole();
            });
            break;
        case 'View All Departments':
            clear();
            figlet('Viewing Departments', (err, output) => {
                console.log(output + '\n');
                viewAllDepartments();
            });
            break;
        case 'Add Department':
            clear();
            figlet('Adding Departent', (err, output) => {
                console.log(output + '\n');
                addDepartment();
            })
            break;
        case 'Quit':
            clear();
            figlet('Quit Employee Tracker', (err, output) => {
                console.log(output);
                process.exit()
            });
        default:
            console.log("ERROR: Not a Choice");
    }

}

function backToMenu() {
    inq.prompt([
        {
            type: 'input',
            name: 'back',
            message: 'Press \'Enter\' to go back to the menu',
        }
    ]).then(answer => {
        clear();
        getChoice();
    });
}

function viewAllEmployees() {
    viewAllEmployeesQuery();
    backToMenu();
}

function viewAllDepartments() {
    viewAllDepartmentsQuery();
    backToMenu();
}

function viewAllRoles() {
    viewAllRolesQuery();
    backToMenu();
}

function addDepartment() {
    inq.prompt(departmentInq).then(response => {
        addDepartmentQuery(response.department);
        clear();
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
            clear();
            getChoice();
        });

    }
    catch (err) {
        console.error('Error adding role: ', err);
        process.exit();
    }



}

module.exports = { init, backToMenu };