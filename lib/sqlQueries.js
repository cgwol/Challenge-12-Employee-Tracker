const mysql = require('mysql2');
const Table = require('table');
require('dotenv').config();

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
    db.query(`SELECT 
                e.id AS employee_id,
                e.first_name,
                e.last_name,
                r.title AS role,
                d.department_name AS department,
                CONCAT(m.first_name, ' ', m.last_name) AS manager,
                r.salary
            FROM employee_table AS e
            JOIN role_table AS r ON e.role_id = r.id
            JOIN department_table AS d ON r.department_id = d.id
            LEFT JOIN employee_table AS m ON e.manager_id = m.id;`,
        function (err, results) {
            if (err) {
                console.error('Error executing query: ', err)
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
                console.log('\n'+formattedTable+'\n');
            }
        }
    );
}


module.exports = { db, viewAllEmployees };
