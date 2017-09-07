var content = require('../models/content');
module.exports = function (req ,res) {
  content.getall(function (err, contents) {
    if (err) {
      console.log(err);
    }else {
        res.status(200).render('index.html');
    }

  })

};
