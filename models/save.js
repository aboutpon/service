var mysql  = require('../config/mysql');
function save() {

}
save.prototype.savecontent = function (data ,cb) {
  console.log(data.con_ty_id);
  mysql.query('insert into server_content set ?',data,cb);
};
save.prototype.getIdLast = function (name,cb) {
  mysql.query('select max(con_id_sev) as id from server_content where con_name = ?',name,cb);
};
save.prototype.saveplace = function (id,place,cb) {
  for (var i = 0; i < place.length; i++) {
    var item = place[i];
    var data = {
      pl_con_id: id,
      pl_pla_id: item
    }
    mysql.query('insert into place_content set ?', data,cb);
  }
};
save.prototype.updateconten = function (name,part,cb) {
 mysql.query('update server_content set con_part = ? where con_name = ?', [part, name], cb);
};

module.exports = save;
