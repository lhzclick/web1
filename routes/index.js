var express = require('express');
let  rd = require('rd');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
//同步遍历文件
rd.eachSync('./views', function (f, s) {
  if(f.indexOf('.ejs')!=-1){
    let rF = f.split(`f:\\web1\\views\\`)[1].replace(/\\/g, "/");      //正反斜杠转换s
    let rF2 =   rF.split('.')[0];
    router.get('/'+rF, function(req, res) {
      res.render(rF, { title: rF });s
    });
    router.get('/'+rF2, function(req, res) {
      res.render(rF, { title: rF });
    });
  }
});
module.exports = router;
