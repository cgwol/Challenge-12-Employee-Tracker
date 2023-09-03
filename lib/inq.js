const inq = require('inquirer');
const figlet = require('figlet');
const clear = require('clear');

const {
    viewAllEmployeesQuery, viewAllDepartmentsQuery, viewAllRolesQuery,
    addDepartmentQuery, getDepartmentQuery, addRoleQuery, getRolesQuery,
    getEmployeeQuery, addEmployeeQuery, getEmployeeNameandIDQuery,
    deleteEmployeeQuery, updateEmployeeQuery, createDatabaseQuery
} = require('./queries.js');

const {
    inputChoice, departmentInq, roleInq, employeeInq, updateInq,
    confirmDelete, updateRoleInq, createDatabaseInq
} = require('./inqPrompts.js');

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
            figlet('Adding Employee', (err, output) => {
                console.log(output + '\n');
                addEmployee();
            });
            break;
        case 'Update Employee':
            clear();
            // console.log('Updating Employee Role');
            updateEmployee();
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
            figlet('Quit Employee Manager', (err, output) => {
                console.log(output + '\n');
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

async function addEmployee() {
    try {
        const roles = await getRolesQuery();
        const rolesChoices = roles.map(roles => roles.title)
        const employees = await getEmployeeQuery();
        const employeesChoices = employees.map(employee => employee.full_name);

        employeesChoices.unshift('None');

        employeeInq[2].choices = rolesChoices;
        employeeInq[3].choices = employeesChoices;

        inq.prompt(employeeInq).then(response => {

            addEmployeeQuery(response.first_name, response.last_name, response.title, response.manager)

            clear();
            getChoice();
        })
    }
    catch (error) {
        console.error('Error adding employee: ', err);
        process.exit();
    }
}

async function updateEmployee() {

    try {
        const employees = await getEmployeeNameandIDQuery();
        const employeesChoices = employees.map(employee => `ID #: ${employee.id}\n  Name: ${employee.full_name}`);

        const roles = await getRolesQuery();
        const rolesChoices = roles.map(roles => roles.title)

        const managers = await getEmployeeQuery();
        const managerChoices = managers.map(manager => manager.full_name);
        managerChoices.unshift('None');

        updateInq[0].choices = employeesChoices;
        updateRoleInq[0].choices = rolesChoices;
        updateRoleInq[1].choices = managerChoices;

        inq.prompt(updateInq).then(response => {

            // Using a Regular Expression to get employee ID #
            var employee_idRL = response.employee.match(/ID #:\s+(\d+)/);
            var employee_id = employee_idRL[1];

            if (response.option == 'Delete Employee') {
                //Delete method
                inq.prompt(confirmDelete).then(confirmation => {
                    if (confirmation.delConfirm == 'Yes') {
                        deleteEmployeeQuery(employee_id);
                        clear();
                        getChoice();
                    } else {
                        clear();
                        getChoice();
                    }
                })
            } else if (response.option == 'Update Role') {
                // Update Method
                inq.prompt(updateRoleInq).then(updatedRole => {
                    console.log(updatedRole);
                    updateEmployeeQuery(employee_id, updatedRole.title, updatedRole.manager);
                    clear();
                    getChoice();
                })
            }
        })
    }
    catch (error) {
        console.error('Error adding employee: ', error);
        process.exit();
    }
}

function createDatabase() {
    inq.prompt(createDatabaseInq).then(response => {
        if (response.confirm == 'Confirm') {
            createDatabaseQuery();
        }
        else {
            clear();
            getChoice();
        }
    })
}

module.exports = { init };