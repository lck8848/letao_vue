"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _vant = require("vant");

var _index = _interopRequireDefault(require("@/router/index.js"));

var _carStore = _interopRequireDefault(require("@/store/carStore.js"));

var _coreJs = require("core-js");

var _tool = require("@/util/tool.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 这里我们封装封装一个axios的实例
// console.log(process.env.VUE_APP_TITLE);
// 通过process.env.NODE_ENV
// let apiUrl = process.env.NODE_ENV == 'development' ? "http://127.0.0.1:3000/api" : 'http://47.106.36.197:3000/api';
var instance = _axios["default"].create({
  // baseURL: 'http://api.w0824.com/api',
  baseURL: "http://47.106.36.197:3000/api" // baseURL: process.env.VUE_APP_apiurl,

}); // 添加请求拦截器


instance.interceptors.request.use(function _callee(config) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log('interceptors.request', store.state.isPending); // false
          // 在发送请求之前做些什么
          //   console.log(config);
          // 设置自定义请求头(authorized-要求是https)携带token到后台，方便后台进行验证
          token = localStorage.getItem('token') || '';
          token && (config.headers.token = token); // If-Modified-Since 是标准的HTTP请求头标签，在发送HTTP请求时，
          // 把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较

          config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据
          // 设置对应的loading

          !_carStore["default"].state.isPending && _carStore["default"].commit('changeIsPending', true); // 延时5秒

          _context.next = 6;
          return regeneratorRuntime.awrap((0, _tool.sleep)(800));

        case 6:
          return _context.abrupt("return", config);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}, function (error) {
  // 对请求错误做些什么
  (0, _vant.Toast)('超时，请稍后再试');
  return Promise.reject(error);
}); // 添加响应拦截器

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 关闭loading
  _carStore["default"].commit('changeIsPending', false); // console.log('response.request', store.state.isPending); // false


  return response.data;
}, function (error) {
  _carStore["default"].commit('changeIsPending', false); //   console.log(error.response.data)
  //   console.log(error.response.status)
  //   console.log(error.message)
  // 对响应错误做点什么


  var status = error.response.status;
  var message = error.response.data.message; //   console.log(message)

  switch (status) {
    case 401:
      (0, _vant.Toast)('用户信息过期，请重新登录');

      _index["default"].push('/login');

      break;

    default:
      this.$toast('网络错误，请稍后再试');
  }

  return Promise.reject(error.response);
});
var _default = instance;
exports["default"] = _default;