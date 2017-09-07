var model = require('./models/content');

var content = new model();
content.setid(10);
content.delete(function (err, value) {
  if (err) {
    console.log(err);
  }else {
    console.log(value);
  }
});
