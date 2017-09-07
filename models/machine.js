var mysql = require('../config/mysql');
function machine(ip, place) {
  this.ip = ip;
  this.place = place;
}

machine.prototype.insert = function (cb) {
  var data = {
    mc_ip:this.ip,
    mc_pl_id:this.place
  };
  mysql.query('insert into machine set ?',data,cb);
};

module.exports = machine;
