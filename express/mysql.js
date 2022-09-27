const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : '6PadccZj0V',
  port: 3306,
  password : 'Ll7lT7JkyV',
  database: '6PadccZj0V',
  
});

module.exports = connection;