var mysql = require('../config/mysql');

function from(){

};

from.prototype.getPlace = function(cb) {
  mysql.query('select pla_code, pla_name from place where pla_code <100', function (err, value) {
    console.log(err);
    cb(err,value);
  });
};

from.prototype.getType = function(cb) {
  mysql.query('select ty_con_id,ty_con_name from type_content',function (err, value) {
    console.log(err);
    cb(err,value);
  })
};
from.prototype.getdis = function (id,cb) {
  mysql.query("select pla_code, pla_name from nat_place where pla_code like '"+id+"%' and length(pla_code) = 4;",function (err, value) {
    console.log(err);
    cb(err,value);
  })
};

module.exports = from;
