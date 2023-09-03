/* 
    Read README in order to setup SQL database, application will not work without mySQL isntalled
*/

const { init } = require('./lib/inq.js');
const { db } = require('./config/connection.js');

init();