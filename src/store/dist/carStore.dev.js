"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]); // 购物车商品对象 {id,number,price,selected:true}
// 本地存储中可能会购物车商品，我们要先全部取出来，放在全局共享state


var carData = JSON.parse(localStorage.getItem('carData') || '[]');
var Store = new _vuex["default"].Store({
  state: {
    carData: carData,
    isPending: false
  },
  mutations: {
    //修改isPending的状态
    changeIsPending: function changeIsPending(state, bool) {
      state.isPending = bool;
    },
    // 商品加入购物车
    addCar: function addCar(state, goods) {
      // 加入之前，要先判断是否有同名id的商品
      var index;
      var hasSomeGoods = state.carData.some(function (item, k) {
        index = k; // 记录当前同名商品的下标

        return item.id === goods.id;
      });

      if (hasSomeGoods) {
        // 有： 就累加数量即可
        state.carData[index].number += goods.number;
      } else {
        // 没有；构造一个购物车的商品对象
        state.carData.push(goods);
      } // 最后要把购物车对象在同步到本地存储


      localStorage.setItem('carData', JSON.stringify(state.carData));
    },
    // 删除购物车指定商品
    delCarGoods: function delCarGoods(state, goods_id) {
      var index;
      var isFind = state.carData.some(function (v, k) {
        if (v.id === goods_id) {
          index = k;
          return true;
        }
      }); // 通过下标index删除数组元素

      if (isFind) {
        state.carData.splice(index, 1);
      } // 同步到本地存储


      localStorage.setItem('carData', JSON.stringify(state.carData));
    },
    // 修改商品的选中状态
    changeGoodsSelected: function changeGoodsSelected(state, obj) {
      // 根据商品id找到其所在的下标
      var index = state.carData.findIndex(function (v) {
        return v.id == obj.goods_id;
      });
      state.carData[index].selected = obj.selected; // 同步到本地存储

      localStorage.setItem('carData', JSON.stringify(state.carData));
    },
    // 修改商品的数量
    changeGoodsNumber: function changeGoodsNumber(state, obj) {
      // 根据商品id找到其所在的下标
      var index = state.carData.findIndex(function (v) {
        return v.id == obj.goods_id;
      });
      state.carData[index].number = obj.number; // 同步到本地存储

      localStorage.setItem('carData', JSON.stringify(state.carData));
    }
  },
  getters: {
    // 获取购物车商品的总数量
    carTotal: function carTotal(state) {
      var total = 0;
      state.carData.map(function (v) {
        return total += parseInt(v.number);
      });
      return total;
    },
    // 获取购物车所有商品的id 得到 '88,91'
    getGoodsIds: function getGoodsIds(state) {
      var ids = [];
      state.carData.map(function (v) {
        return ids.push(v.id);
      });
      var idStr = ids.join(',');
      return idStr;
    },
    // 获取购物车商品的购买数量 构造数据如下
    // {商品id:商品number，商品id:商品number}
    getGoodsNumber: function getGoodsNumber(state) {
      var obj = {};
      state.carData.map(function (v) {
        obj[v.id] = v.number;
      });
      return obj;
    },
    // 获取购物车商品的选中状态 构造数据如下
    // {商品id:true，商品id:false}
    getGoodsSelected: function getGoodsSelected(state) {
      var obj = {};
      state.carData.map(function (v) {
        obj[v.id] = v.selected;
      });
      return obj;
    },
    // 获取购物车商品的选中的数量
    getGoodsSelectedNumber: function getGoodsSelectedNumber(state) {
      var total = 0;
      state.carData.map(function (v) {
        if (v.selected === true) {
          total += v.number;
        }
      });
      return total;
    },
    // 获取购物车商品的选中的总价格
    getGoodsSelectedPrice: function getGoodsSelectedPrice(state) {
      var totalPrice = 0;
      state.carData.map(function (v) {
        if (v.selected === true) {
          totalPrice += v.number * v.price;
        }
      });
      return totalPrice * 100;
    },
    // 获取选中商品的id => '3,4'
    getSelectedGoodsIds: function getSelectedGoodsIds(state) {
      var ids = [];
      state.carData.map(function (v) {
        return v.selected && ids.push(v.id);
      });
      var idStr = ids.join(',');
      return idStr;
    }
  }
});
var _default = Store;
exports["default"] = _default;