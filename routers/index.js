var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');
var member = require('../controllers/member');
var index = require('../controllers/index');
var space = require('../controllers/space');
var data = require('../controllers/data.js');
var content = require('../controllers/content');
var from = require('../controllers/from');
var model = require('../models/content');

router.get('/',function( req, res) {
  if (req.session.member  == undefined) {
    res.redirect('/login');
  }else{
  var content = new model(null, null);
  content.getall(function (err, value) {
    if (err) {
      res.send('error mysql ')
      console.log(err);
    }else {
      content.getmachine(function (err, docs) {
        if (err) {
          res.send('error mysql table machine');
        }else {
            res.render('index',{data:value, machine:docs });
        }
      })
    }
  });
}
});
router.get('/logout', function (req, res) {
  req.session.member = undefined;
  res.redirect('/login');
});
router.get('/login',member.index);
router.post('/login',member.login);
router.get('/from',from.index);
router.get('/content/delete/:id',content.remove);
router.post('/from/save',from.save);
router.get('/place',from.getplae);
router.get('/type',from.getType);
router.get('/data/:location/:date/:id', content.getdata);
router.get('/space',space.index);


module.exports = router;
