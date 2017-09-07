var mysql = require('mysql');
var config = {
  host:'localhost',
  user:'root',
  password:'PINA#3996',
  database:'service'
};
var conn = mysql.createConnection(config);

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }else {

  }
});
module.exports = conn;
