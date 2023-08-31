const mysql = require('mysql2');
const Table = require('table');
require('dotenv').config();

const {
    viewAllEmployeesSchema, viewAllDepartmentsSchema, viewAllRolesSchema,
    addDepartmentSchema, getDepartmentSchema, addRoleSchema
} = require('./schemas.js');
const { exit } = require('process');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);


function viewAllEmployees() {
    clear();
    db.query(viewAllEmployeesSchema, function (err, results) {
        if (err) {
            console.error('ERROR executing query: ', err);
            process.exit();
        } else {
            const employeeTable = [
                ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager']
            ];

            results.forEach((employee) => {
                employeeTable.push([
                    employee.employee_id,
                    employee.first_name,
                    employee.last_name,
                    employee.role,
                    employee.department,
                    employee.salary,
                    employee.manager || 'N/A'
                ]);
            });

            const tableConfig = {
                columns: {
                    0: { alignment: 'left' },
                    1: { alignment: 'left' },
                    2: { alignment: 'left' },
                    3: { alignment: 'left' },
                    4: { alignment: 'left' },
                    5: { alignment: 'right' },
                    6: { alignment: 'left' }
                }
            };

            const formattedTable = Table.table(employeeTable, tableConfig);
            console.log('\n' + formattedTable);
            console.log('Use Arrow Keys to return to menu\n');
        }
    }
    );
}

function viewAllDepartments() {
    db.query(viewAllDepartmentsSchema, function (err, results) {
        if (err) {
            console.error('ERROR executing query: ', err);
            process.exit();
        }
        else {
            // console.table(results);
            const departmentTable = [
                ['ID', 'Department']
            ];

            results.forEach((department) => {
                departmentTable.push([
                    department.id,
                    department.department_name
                ]);
            });

            const tableConfig = {
                columns: {
                    0: { alignment: 'left' },
                    1: { alignment: 'left' }
                }
            };

            const formattedTable = Table.table(departmentTable, tableConfig);
            console.log('\n' + formattedTable);
            console.log('Use Arrow Keys to return to menu\n');
        }
    });
}

function viewAllRoles() {
    db.query(viewAllRolesSchema, function (err, results) {
        if (err) {
            console.error('ERROR executing query: ', err);
            process.exit();
        }
        else {
            // console.table(results);
            const roleTable = [
                ['ID', 'Title', 'Salary', 'Department']
            ];

            results.forEach((role => {
                roleTable.push([
                    role.role_id,
                    role.role,
                    role.salary,
                    role.department
                ]);
            }));

            const tableConfig = {
                columns: {
                    0: { alignment: 'left' },
                    1: { alignment: 'left' },
                    2: { alignment: 'right' },
                    3: { alignment: 'left' }
                }
            };

            const formattedTable = Table.table(roleTable, tableConfig);
            console.log('\n' + formattedTable);
            console.log('Use Arrow Keys to return to menu\n');
        }
    });
}

function addDepartmentQuery(department) {

    db.query(addDepartmentSchema, department, (err, result) => {
        if (err) {
            console.error('ERROR executing query: ', err)
            process.exit();
        }
    });
}

function getDepartmentQuery() {
    return new Promise((resolve, reject) => {
        db.query(getDepartmentSchema, (err, results) => {
            if (err) {
                console.error('Error fetching departments: ', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function addRoleQuery(title, salary, department){

    db.query(addRoleSchema, [title, salary, department], (err, result) => {
        if (err) {
            console.error('ERROR executing query', err);
        }
    });
}



module.exports = {
    db, viewAllEmployees, viewAllDepartments, viewAllRoles,
    addDepartmentQuery, getDepartmentQuery, addRoleQuery
};
