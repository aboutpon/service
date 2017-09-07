var model = require('../models/member');

exports.index = function (req, res) {
  res.render('login',{check:false});
};
exports.login = function (req, res) {
  var member = new model(req.body.username, req.body.password);
  try {
    member.getlogin(function (err, value) {
      if (err) {
        console.log(err);
      }else {
        console.log(value.length);
        if (value.length < 1) {
          res.render('login',{check:true});
        }else {
          req.session.member = value;
          res.redirect('/');

        }
      }
    });
  } catch (err) {
    console.log(err);
    res.render('login',{check:true});
  }
};
