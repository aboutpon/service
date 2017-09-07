var model = require('../models/newdata.json');
var data  = {};

data.read = function(req, res){
  //console.log(req.params.location);
  //console.log(req.params.date);

  var last = req.params.date;
  console.log(last);
  var currentime = new Date();
  var lasttime = new Date(last);



  if (currentime >= lasttime) {
        res.status(200).json(model);
  }else {
    res.status(400).json({mas:'Data Emtry'});
  }

}
module.exports = data;
