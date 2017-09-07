var mysql = require('../config/mysql');
function content(time, location, id) {
    this.time = time;
    this.location = location;
    this.id = id;
}

content.prototype.getcontent = function (cb) {
  mysql.query('select a.con_id_sev,a.con_name,a.con_description,a.con_part, a.con_ty_id from server_content as a inner join place_content as b on a.con_id_sev = b.pl_con_id where a.con_time >= "'+this.time+'" and b.pl_pla_id = '+this.location+' and b.pl_con_id > '+this.id+'',cb)
};
content.prototype.getmachine = function (cb) {
  mysql.query('select a.mc_ip,a.mc_time, mc_pl_id,b.pla_name from machine as a inner join place as b on a.mc_pl_id = b.pla_code',cb);
};
content.prototype.getvideo = function (cb) {
  mysql.query('select a.con_part from server_content as a inner join place_content as b on a.con_id_sev = b.pl_con_id where a.con_time >= '+this.time+' and b.pl_pla_id = '+this.location+' and b.pl_con_id > '+this.id+'',cb)
};
content.prototype.getall = function (cb) {
  mysql.query('select * from server_content',cb);
};
content.prototype.getbycontent = function (id,cb) {
  console.log(id);
if (id == null) {
    mysql.query('select a.con_id_sev,a.con_name,a.con_description,a.con_part, a.con_ty_id from server_content as a inner join place_content as b on a.con_id_sev = b.pl_con_id where a.con_time >= "'+this.time+'" and b.pl_pla_id = '+this.location+'',cb)
}else {
  mysql.query('select a.con_id_sev,a.con_name,a.con_description,a.con_part, a.con_ty_id from server_content as a inner join place_content as b on a.con_id_sev = b.pl_con_id where a.con_time >= "'+this.time+'" and b.pl_pla_id = '+this.location+' and a.con_id_sev > '+id+'',cb)
}

};
content.prototype.getcontentbyid = function (cb) {
  mysql.query('select con_part from server_content where con_id_sev = '+this.id, cb);
};
content.prototype.setid = function (id) {
  this.id = id;
};
content.prototype.delete = function (cb) {
  this.delecontent(cb);
  this.deleteplace(cb);
};
content.prototype.delecontent = function (cb) {
  mysql.query('delete from server_content where con_id_sev = '+this.id,cb);
};
content.prototype.deleteplace = function (cb) {
  mysql.query('delete from server_content where con_id_sev = '+this.id,cb);
};
module.exports = content;
