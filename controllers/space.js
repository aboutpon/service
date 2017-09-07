var space = {};

var model = require('../models/space.json');
space.index = function(req, res){
  res.json(model);
}

module.exports = space;
