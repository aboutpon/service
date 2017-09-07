var model = require('../models/content');
var mymachine = require('../models/machine');
var fs = require('fs');
exports.getdata = function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    var time  = req.params.date;
    var id = req.params.id;
    var location = req.params.location;
    var content = new model(time, location, id);

    var address = ip.substr(ip.indexOf('.')-3, ip.length);
    var machine  = new mymachine(address,location);
    machine.insert(function (err, value) {
      if (err) {
          console.log(err);
      }else {
        console.log(value);
      }
    });

    content.getcontent(function (err, value) {
      if (err) {
          res.status(404).json({status:404,data:'data error'});
      }
      else if (value.length == 0) {
          res.status(200).json({datas:'Emtry'})
      }else {
          var path = value.map((item) => {
            return item.con_part;
          });
          var sum = 0;
          for (var i = 0; i < path.length; i++) {
            sum = sum + getFilesizeInBytes('./public'+path[i]);
          }
          var size = sum / 1000000.0;
          var data = {
            size:size,
            datas:value
          }
          res.status(200).json(data);
      }


    });
};

exports.remove = function (req, res) {
  var id  = req.params.id;
  var content = new model();
  content.setid(id);
  var fs  = require('fs');
  content.getcontentbyid(function (err, value) {
    var file = value[0].con_part;
    var path = './public'+file;
      fs.unlink(path,function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('done');
        }
    });
  });
  try {
    content.deleteplace(function (err, value) {
      if (err) {
        res.json({status:false});
        throw err
      }else {

      }
    })
  } catch (err) {
    content.deleteplace(function (err, value) {
      if (err) {
        res.json({status:false});
        console.log(err);
      }else {

      }
    })
  } finally {
    content.delecontent(function (err, value) {
      if (err) {
        console.log(err);
        res.json({status:false});
      }else {
        res.json({status:true});
      }
    });
  }


};
exports.gettemp = function (id,time, location,cb) {


  var content = new model(time, location);
  content.getbycontent(id,function (err, value) {
    if (err) {
        cb(err,value);
    }
    else if (value.length == 0) {
      cb(err,value);
    }else {
        var path = value.map((item) => {
          return item.con_part;
        });
        var sum = 0;


        for (var i = 0; i < path.length; i++) {
          if (path[i] == null) {
            sum = 0;
          }else {
            sum = sum + getFilesizeInBytes('./public'+path[i]);
          }

        }
        var size = sum / 1000000.0;
        var data = {
          size:size,
          datas:value
        }
        cb(err,data);
    }


  });
};

exports.delete = function (req, res) {

};


function getFilesizeInBytes(filename) {
 var stats = fs.statSync(filename)
 var fileSizeInBytes = stats["size"]
 return fileSizeInBytes
}
