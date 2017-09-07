var from = require('../models/index');
var save =  require('../models/save');
var content = new save();
var use = new from();
var places;
var types;
exports.index = function (req, res) {
  if (req.session.member  == undefined) {
    res.redirect('/login');
  }else {
    use.getPlace(function (err, value) {
      if (err) {

        places = null;
      }
      else {
        places = value;
      }
      use.getType(function (err, value) {
        if (err) {
          types = null;
        }else {
          types = value;
        }
        res.render('from.html',{place:places, type:types});

      });
    });
  }

};
exports.save = function (req, res) {
  var data;
  var des = req.body.con_description;
  //console.log(des);
  try {
    data = {
      con_name: req.body.con_name,
      con_ty_id: req.body.con_ty_id,
      con_description: des
    };
  } catch (err) {
    console.log('error');
    console.log(err);

    data = {
      con_name: req.body.con_name,
      con_ty_id: req.body.con_ty_id,
      con_description: des
    };
  } finally {
    try {
      content.savecontent(data,function (err, value) {
        if (err) {
          console.log(err);
        }else {
          content.getIdLast(req.body.con_name,function (err, value) {
            if (err) {
              console.log();(err);
            }else {
              console.log('id server ');
              console.log(value);
              var id  = value[0].id;
              console.log(id);
              var place = req.body['con_video[]'];
              content.saveplace(id, place, function (err, value) {
                if (err) {
                  console.log(err);
                }else {
                  console.log(value);
                }
              })
            }
          });
        }
      });
    } catch (err) {
      console.log('error sql');
      console.log(err);
    }
  }



  console.log(req.body);
  res.json(req.body);
};
exports.getType = function (req, res) {
  use.getType(function (err, value) {
    res.json(value);
  })
};
exports.getplae = function (req, res) {
var fs = require('fs');
var str = fs.readFileSync('./temp.json','utf-8');
var obj = JSON.parse(str);
    res.json(obj);
};
exports.upload = function (req, res) {
  res.render('upload.html');
};

exports.saveFile = function (req, res, next) {

 try {
   var files = req.files.video.name;
   var name = req.body.username;
   var path = '/video/'+files;
    content.updateconten(name, path, function (err, value) {
      if (err) {
        console.log(err);
      }else {
        console.log(value);
      }
    });
  } catch (err) {
    res.status(500).send('Update file error');
  } finally {
    req.files.video.mv('./public/video/'+req.files.video.name, function (err, value) {
      if (err ) {
        console.log(err);
        res.status(500).send('Update file error');
      }else {
        res.status(200).redirect('/');
      }
    })
  }


};

function formatinsert(obj) {
  var data = {
    con_name: obj.con_name,
    con_ty_id: obj.con_ty_id,
    con_description:obj.con_description

  };
  return data;
}
