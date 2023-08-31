const inq = require('inquirer');
const { connectDB } = require('./sqlQueries.js');

const inputChoice = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
            'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
];

function getChoice(){
    inq.prompt(inputChoice).then(response => {
        console.log('User Choice: '+response.choice + '\n');
        choiceSwitch(response.choice);
    });
}

function init() {
    connectDB();
    getChoice();
}

function choiceSwitch(choice){
    switch (choice) {
        case 'View All Employees':
            console.log('Displaying All Employees');
            // Add display function 
            break;
        case 'Add Employee':
            console.log('Adding Employee');
            // Add employee method
            break;
        case 'Update Employee Role':
            console.log('Updating Employee Role');
            // Add update employee role method
            break;
        case 'View All Roles':
            console.log('Viewing All Roles');
            // Add View All Roles Method
            break;
        case 'Add Role': 
            console.log('Adding Role');
            // Add adding role method
            break;
        case 'View All Departments':
            console.log('Viewing all Departments');
            //add Method to view departments
            break;
        case 'Add Department':
            console.log('Adding Department');
            // add department method
            break;
        case 'Quit':
            console.log('Quitting Application');
            process.exit();
        default:
            console.log("ERROR: Not a Choice");
    }

    getChoice();
}

module.exports = { init };