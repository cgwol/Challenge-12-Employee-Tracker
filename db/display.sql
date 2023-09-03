USE employee_db;

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
LEFT JOIN employee_table AS m ON e.manager_id = m.id;

SELECT * from department_table;

SELECT 
    r.id AS role_id,
    r.title as role,
    r.salary,
    d.department_name AS department
FROM role_table AS r 
JOIN department_table AS d ON r.department_id = d.id