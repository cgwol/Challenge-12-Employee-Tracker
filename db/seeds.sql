
INSERT INTO department_table (department_name) VALUES
    ('HR'),
    ('Engineering'),
    ('Marketing');

INSERT INTO role_table (title, salary, department_id) VALUES
    ('HR Manager', 80000, 1),
    ('Software Engineer', 100000, 2),
    ('Marketing Specialist', 60000, 3),
    ('Senior Software Engineer', 120000, 2),
    ('Product Manager', 110000, 2),
    ('Sales Associate', 50000, 3),
    ('Recriuter', 55000, 1);

INSERT INTO employee_table (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 2, 1),
    ('Emily', 'Williams', 3, NULL),
    ('Alex', 'Brown', 4, 2),
    ('Jessica', 'Miller', 4, 2),
    ('Daniel', 'Davis', 5, 1),
    ('Sarah', 'Anderson', 6, 4),
    ('Faith', 'Sanders', 7, 1);
