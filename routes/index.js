var express = require('express');
let  rd = require('rd');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
//同步遍历目录下的所有文件    配置view文件下所有路由
rd.eachSync('views', function (f, s) {     //f文件名
  if(f.indexOf('.ejs')!=-1){
    let rF = f.split(`f:\\web1\\views\\`)[1].replace(/\\/g, "/");      //反斜杠转正斜杠
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
