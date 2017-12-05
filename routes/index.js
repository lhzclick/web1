var express = require('express');
let  rd = require('rd');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
//同步遍历目录下的所有文件
rd.eachSync('views', function (f, s) {     //f文件名
  if(f!=`f:\\web1\\views`){
    let rF = f.split(`f:\\web1\\views\\`)[1];
    let rF2 =   rF.split('.')[0];
    router.get('/'+rF, function(req, res) {
      res.render(rF, { title: rF });
    });
    router.get('/'+rF2, function(req, res) {
      res.render(rF, { title: rF });
    });
  }
});
module.exports = router;
