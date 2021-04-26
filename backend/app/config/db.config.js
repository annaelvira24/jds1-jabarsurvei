'use strict';
const mysql = require('mysql');

//local mysql db connection
let dbConn = undefined;
if(process.env.NODE_ENV !== 'test'){
  dbConn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'crowdsource'
  });
}

else{
  dbConn = mysql.createConnection({
    host     : 'ppl-jds-crowdsource.mysql.database.azure.com',
    user     : 'crowdsourceadmin@ppl-jds-crowdsource',
    password : 'ppl-kelompok-8',
    database : 'crowdsourcetest',
    port     : 3306,
    ssl      : true
  });
}

dbConn.connect(function(err) {
    if (err) throw err;  
    console.log("Database Connected!");
  });
  
module.exports = dbConn;