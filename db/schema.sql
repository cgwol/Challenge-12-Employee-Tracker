DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department_table (
    id INT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role_table (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department_table(id)
);

CREATE TABLE employee_table (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL ,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role_table(id),
    FOREIGN KEY (manager_id) REFERENCES employee_table(id) ON DELETE SET NULL
);