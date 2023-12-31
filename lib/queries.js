const mysql = require('mysql2');
const Table = require('table');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { db } = require('./../config/connection.js');
const {
    viewAllEmployeesSchema, viewAllDepartmentsSchema, viewAllRolesSchema,
    addDepartmentSchema, getDepartmentSchema, addRoleSchema, getRoleSchema,
    getEmployeeSchema, addEmployeeSchema, addEmployeeSchemaNull, 
    getEmployeeNameandIDSchema, deleteEmployeeSchema, updateEmployeeSchema,
    updateEmployeeNullSchema
} = require('./schemas.js');

function viewAllEmployeesQuery() {
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
        }
    }
    );
}

function viewAllDepartmentsQuery() {
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
        }
    });
}

function viewAllRolesQuery() {
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
            console.error('ERROR executing query: ', err);
        }
    });
}

function getRolesQuery(){
    return new Promise((resolve, reject) => {
        db.query(getRoleSchema, (err, results) => {
            if (err) {
                console.error('Error fetching departments: ', err);
                reject(err);
            } else {
                resolve(results);
            }
        })
    });
}

function getEmployeeQuery() {
    return new Promise((resolve, reject) => {
        db.query(getEmployeeSchema, (err, results) => {
            if (err) {
                console.error('Error fetching employees: ', err);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

function getEmployeeNameandIDQuery(){
    return new Promise((resolve, reject) => {
        db.query(getEmployeeNameandIDSchema, (err, results) => {
            if (err) {
                console.error('Error fetching employees: ', err);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

function addEmployeeQuery(firstName, lastName, title, manager){

    if(manager === 'None'){
        db.query(addEmployeeSchemaNull, [firstName, lastName, title] , (err, results) => {
            if(err){
                console.error('ERROR executing query', err);
                process.exit();
            }
        });
    }
    else{
        db.query(addEmployeeSchema, [firstName, lastName, title, manager] , (err, results) => {
            if(err){
                console.error('ERROR executing query: ', err);
                process.exit();
            }
        });
    }
}

function deleteEmployeeQuery(employee_id){
    db.query(deleteEmployeeSchema, [employee_id], (err, results) => {
        if(err){
            console.error('ERROR executing query: ', err);
            process.exit();
        }
    })
}

function updateEmployeeQuery(employee_id, title, manager){

    if(manager === 'None'){
        db.query(updateEmployeeNullSchema, [title, employee_id], (err, results) => {
            if(err){
                console.error('ERROR executing query: ', err);
                process.exit();
            }
        })
    }
    else{
        db.query(updateEmployeeSchema, [title, manager, employee_id], (err, results) => {
            if(err){
                console.error('ERROR executing query: ', err);
                process.exit();
            }
        })
    }
}


module.exports = {
    viewAllEmployeesQuery, viewAllDepartmentsQuery, viewAllRolesQuery,
    addDepartmentQuery, getDepartmentQuery, addRoleQuery, getRolesQuery,
    getEmployeeQuery, addEmployeeQuery, getEmployeeNameandIDQuery, 
    deleteEmployeeQuery, updateEmployeeQuery
};
