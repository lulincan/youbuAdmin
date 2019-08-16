
var express = require('express');
var jsonReturn = require('../config/jsonReturn');
var db = require('../db');
var router = express.Router();

//进入login页面
router.get('/', function (req, res, next) {
  res.render('login');
});

//获取验证码
router.get('/getCode', function (req, res, next) {
  var params = req.body
  var length = params.length ? params.length : 5;

  var codeLength = parseInt(length); //验证码的长度
  //所有候选组成验证码的字符，当然也可以用中文的
  var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
  //循环组成验证码的字符串
  var code = '';
  for (var i = 0; i < codeLength; i++) {
    //获取随机验证码下标
    var charNum = Math.floor(Math.random() * 62);
    //组合成指定字符验证码
    code += codeChars[charNum];
  }

  jsonReturn.setJson(res, '200', { code: code })
});

//登录
router.post('/login', function (req, res, next) {
  var params = req.body;
  var account = params.account;
  var password = params.password;
  db.connect("select * from adminUser where account = ?", account, (result) => {
    if (!result) {
      jsonReturn.setJson(res, '500', { msg: '没有此管理员' })
    }

    if (result[0].account == account && result[0].password == password) {
      jsonReturn.setJson(res, '200', { msg: '登录成功' })
    }
  });
})

module.exports = router;
