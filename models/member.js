var mysql = require('../config/mysql');
function member(username, password) {
  this.username = username;
  this.password = password;
}
member.prototype.getlogin = function (cb) {
  mysql.query("select * from member where mem_username = '"+this.username+"' and mem_password = '"+this.password+"'",cb);
};

module.exports = member;
