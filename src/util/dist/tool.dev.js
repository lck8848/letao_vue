"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;
exports.userInfo = userInfo;
exports.genOrderId = genOrderId;

// 延时函数sleep
function sleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

function userInfo() {
  var user;

  try {
    user = JSON.parse(localStorage.getItem('userInfo'));
  } catch (err) {
    return false;
  }

  var token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  return user;
}

function genOrderId() {
  var randomNumber = ""; //订单号

  for (var i = 0; i < 6; i++) {
    //6位随机数，用以加在时间戳后面。
    randomNumber += Math.floor(Math.random() * 10);
  }

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds(); // 补0操作    2021813

  var formatNumber = function formatNumber(n) {
    n = n.toString(); // '8' => '08'

    return n[1] ? n : '0' + n;
  };

  return [year, month, day, hour, minute, second].map(formatNumber).join('') + randomNumber;
}