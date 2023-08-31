
INSERT INTO department_table (id, department_name) VALUES
    (1, 'HR'),
    (2, 'Engineering'),
    (3, 'Marketing');

INSERT INTO role_table (id, title, salary, department_id) VALUES
    (1, 'HR Manager', 80000, 1),
    (2, 'Software Engineer', 100000, 2),
    (3, 'Marketing Specialist', 60000, 3),
    (4, 'Senior Software Engineer', 120000, 2),
    (5, 'Product Manager', 110000, 2),
    (6, 'Sales Associate', 50000, 3),
    (7, 'Recriuter', 55000, 1);

INSERT INTO employee_table (id, first_name, last_name, role_id, manager_id) VALUES
    (1, 'John', 'Doe', 1, NULL),
    (2, 'Jane', 'Smith', 2, 1),
    (3, 'Michael', 'Johnson', 2, 1),
    (4, 'Emily', 'Williams', 3, NULL),
    (5, 'Alex', 'Brown', 4, 2),
    (6, 'Jessica', 'Miller', 4, 2),
    (7, 'Daniel', 'Davis', 5, 1),
    (8, 'Sarah', 'Anderson', 6, 4),
    (9, 'Faith', 'Sanders', 7, 1);
