var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/a', function(req, res) {
  res.render('a', { title: 'a' });
});
module.exports = router;
