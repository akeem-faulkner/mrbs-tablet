var mysql = require('mysql');
var nodeSql = require('nodesql');
var connection = mysql.createConnection({
    host: process.env.DB_HOST || 'mrbsdesktop_db_1',
    user:  process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_DB || 'mrbs',
    //only set the multipleStatements setting if you plan on using the transaction
    //method (and be careful) as it potentially exposes you to sql injection.
    multipleStatements: false
});


module.exports = nodeSql.createMySqlStrategy(connection);