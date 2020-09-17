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

var _newsdetail = _interopRequireDefault(require("@/components/news/newsdetail.vue"));

var _goodslist = _interopRequireDefault(require("@/components/goods/goodslist.vue"));

var _goodsdetail = _interopRequireDefault(require("@/components/goods/goodsdetail.vue"));

var _photo = _interopRequireDefault(require("@/components/photo/photo.vue"));

var _login = _interopRequireDefault(require("@/components/users/login.vue"));

var _addressmanage = _interopRequireDefault(require("@/components/address/addressmanage.vue"));

var _addressadd = _interopRequireDefault(require("@/components/address/addressadd.vue"));

var _addressedit = _interopRequireDefault(require("@/components/address/addressedit.vue"));

var _order = _interopRequireDefault(require("@/components/order/order.vue"));

var _register = _interopRequireDefault(require("@/components/users/register.vue"));

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
  path: '/user/:user_id',
  component: _user["default"],
  props: true
}, {
  path: "/newslist",
  name: 'newslist',
  component: _newslist["default"]
}, {
  path: "/newsdetail/:id",
  name: 'newsdetail',
  component: _newsdetail["default"],
  props: true
}, {
  path: "/goodslist",
  name: 'goodslist',
  component: _goodslist["default"]
}, {
  path: "/goodsdetail/:id",
  component: _goodsdetail["default"],
  props: true
}, {
  path: "/photo",
  name: 'photo',
  component: _photo["default"]
}, {
  path: '/login',
  component: _login["default"]
}, {
  path: '/register',
  component: _register["default"]
}, {
  path: '/addressmanage',
  component: _addressmanage["default"]
}, {
  path: '/addressadd',
  component: _addressadd["default"]
}, {
  path: '/addressedit/:addressInfo',
  component: _addressedit["default"]
}, {
  path: '/order',
  component: _order["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;