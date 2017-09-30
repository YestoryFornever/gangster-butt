var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
  // res.render('index', { title: 'Express' }); /* express view */
  // res.redirect('./index.html'); /* 相对路径 */
  res.sendFile(path.resolve(__dirname,'../public/index.html')); /* 重定向文件 */
});

module.exports = router;
