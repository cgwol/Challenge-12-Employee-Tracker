
INSERT INTO department_table (department_name) VALUES
    ('HR'),
    ('Engineering'),
    ('Marketing');

INSERT INTO role_table (title, salary, department_id) VALUES
    ('HR Manager', 80000, 1),
    ('Software Engineer', 100000, 2),
    ('Marketing Specialist', 60000, 3),
    ('Senior Software Engineer', 120000, 2),
    ('Junior Software Engineer', 90000, 2),
    ('Product Manager', 110000, 2),
    ('Sales Associate', 50000, 3),
    ('Recruiter', 55000, 1),
    ('Software Engineer Project Lead', 2)

INSERT INTO employee_table (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 6, NULL),
    ('Michael', 'Johnson', 9, NULL),
    ('Emily', 'Williams', 8, 1),
    ('Alex', 'Brown', 4, 3),
    ('Jessica', 'Miller', 2, 2),
    ('Daniel', 'Davis', 7, 2),
    ('Sarah', 'Anderson', 5, 2),
    ('Faith', 'Sanders', 7, 2);
