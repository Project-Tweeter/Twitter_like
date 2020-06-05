let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.database
});

connection.connect()

module.exports = connection