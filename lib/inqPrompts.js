const inputChoice = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee',
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
            else { return 'Role must have a Title'; }
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

const employeeInq = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee\'s first name: ',
        validate: first_name => {
            if (first_name){ return true }
            else { return 'First name can not be empty' }
        }
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee\'s last name: ',
        validate: last_name => {
            if (last_name){ return true }
            else { return 'Last name can not be empty' }
        }
    },
    {
        type: 'list',
        name: 'title',
        message: 'Enter the employee\'s role: ',
        choices: []
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Enter the the emlployee\'s manager: ',
        choices: ['None']
    }

];

const updateInq = [
    {
        type: 'list',
        name: 'employee',
        message: 'Choose an employee to update: ',
        choices: []
    },
    {
        type: 'list',
        name: 'option',
        message: 'Choose how to update employee: ',
        choices: ['New Role', 'Delete Employee']
    }
];

const confirmDelete = [
    {
        type: 'list',
        name: 'delConfirm',
        message: 'Are you sure you want to delete employee: ',
        choices: ['No','Yes']
    }
];

const updateRoleInq = [];

module.exports = { 
    inputChoice, departmentInq, roleInq, employeeInq, 
    updateInq, updateRoleInq, confirmDelete
};