
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var html = require('html');
var multer = require('multer');
var path = require('path');
var upload = require('jquery-file-upload-middleware');
var index = require('../routers/index');
var from = require('../controllers/from');
var fileUpload = require('express-fileupload');
//var upload = require('jquery-file-upload-middleware');

module.exports = function (app, io, express) {

  app.set('views', './views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');


  app.use(morgan('dev'));
  app.use(session({secret: 'u23j#d!0w]s'}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('./public'));

  app.use('/',index);
  app.use(fileUpload());

  app.post('/upload',from.saveFile);
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({status:404, message:'error not part get data'});
  });
  var mysql = require('../models/content');
  var content = require('../controllers/content');
  io.on('connection',function(socket) {
    socket.on('get',function (value) {
      console.log(value);


      content.gettemp(value.id,value.date, value.location, function (err, result) {
        if (err) {
          console.log(err);
        }else {
          console.log(result);
            socket.emit('from',result);
        }

      });

    });
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};
