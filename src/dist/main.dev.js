"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _index = _interopRequireDefault(require("./router/index.js"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vant.Lazyload, {
  lazyComponent: true
});

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _index["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');