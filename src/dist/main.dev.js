"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _App = _interopRequireDefault(require("./App.vue"));

var _index = _interopRequireDefault(require("./router/index.js"));

require("@/util/filter.js");

var _vant = require("vant");

var _carStore = _interopRequireDefault(require("@/store/carStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]); // 安装后，在其他组件可以通过 this.$store.***来调用其身上相关的属性


_vue["default"].use(_vuex["default"]);

_vue["default"].use(_vant.Lazyload, {
  lazyComponent: true
});

_vue["default"].prototype.$toast = _vant.Toast;
_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _index["default"],
  store: _carStore["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');