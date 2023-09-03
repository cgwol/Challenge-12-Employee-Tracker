const viewAllEmployeesSchema = `
SELECT 
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
LEFT JOIN employee_table AS m ON e.manager_id = m.id
ORDER BY employee_id ASC;
`;

const viewAllDepartmentsSchema = `
SELECT * FROM department_table
ORDER BY id ASC
`;

const viewAllRolesSchema = `
SELECT 
    r.id AS role_id,
    r.title as role,
    r.salary,
    d.department_name AS department
FROM role_table AS r 
JOIN department_table AS d ON r.department_id = d.id
ORDER BY role_id ASC;
`;

const addDepartmentSchema = `
INSERT INTO department_table (department_name)
VALUES
    (?);
`;

const getDepartmentSchema = `
SELECT department_name FROM department_table
`;

const addRoleSchema = `
INSERT INTO role_table (title, salary, department_id)
VALUES
    (?, ?, (SELECT id FROM department_table WHERE department_name = ?))
`;

const getRoleSchema = `
SELECT title FROM role_table
`;

const getEmployeeSchema = `
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employee_table
`;

const addEmployeeSchema = `
INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
SELECT 
    ?, ?, 
    (SELECT id FROM role_table WHERE title = ?), 
    (SELECT id FROM employee_table WHERE CONCAT(first_name, ' ', last_name) = ?);
`;

const addEmployeeSchemaNull = `
INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
SELECT ?, ?, (SELECT id FROM role_table WHERE title = ?), NULL;
`;

const getEmployeeNameandIDSchema = `
SELECT id, CONCAT(first_name, ' ', last_name) AS full_name
FROM employee_table;
`;

const deleteEmployeeSchema = `
DELETE FROM employee_table
WHERE id = ?
`;

const updateEmployeeSchema = `
UPDATE employee_table AS e
SET role_id = 
            (SELECT id 
                FROM role_table 
                WHERE title = ?),
    manager_id = 
            (SELECT id
                FROM (SELECT CONCAT(first_name, ' ', last_name) AS full_name, id
                FROM employee_table) AS subquery
                WHERE full_name = ?)
WHERE id = ?
`;

const updateEmployeeNullSchema = `
UPDATE employee_table AS e
SET role_id = 
            (SELECT id 
                FROM role_table 
                WHERE title = ?)
WHERE id = ?
`;

module.exports = {
    viewAllEmployeesSchema, viewAllDepartmentsSchema, viewAllRolesSchema,
    addDepartmentSchema, getDepartmentSchema, addRoleSchema, addEmployeeSchema,
    getRoleSchema, getEmployeeSchema, addEmployeeSchemaNull, getEmployeeNameandIDSchema,
    deleteEmployeeSchema, updateEmployeeSchema, updateEmployeeNullSchema
};