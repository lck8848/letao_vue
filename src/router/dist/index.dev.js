"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _home = _interopRequireDefault(require("@/components/tabbar/home.vue"));

var _cart = _interopRequireDefault(require("@/components/tabbar/cart.vue"));

var _user = _interopRequireDefault(require("@/components/tabbar/user.vue"));

var _newslist = _interopRequireDefault(require("@/components/news/newslist.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  redirect: {
    name: 'home'
  }
}, {
  path: '/home',
  name: 'home',
  component: _home["default"]
}, {
  path: '/cart',
  name: 'cart',
  component: _cart["default"]
}, {
  path: '/user',
  name: 'user',
  component: _user["default"]
}, {
  path: "/newslist",
  component: _newslist["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;