<template>
  <div class="order-container">
    <!-- <div>{{ msg }}</div>
      <div>{{ statusText(1) }}</div>
    <div>{{ statusText(2) }}</div>-->

    <!-- <div>{{ foo('all') }}</div> -->
    <!-- <div>{{ getOrderGoods('2') }}</div> -->
    <van-tabs v-model="active">

      <van-tab v-for="order in tabsList" :key="order.status" :title="order.title">
        <van-card
          v-for="item in getOrderGoods(order.status)"
          :key="item.id"
          :price="point(item.total_price)"
          :title="item.goods[0].title"
          :thumb="item.goods[0].thumb_path"
        >
          <template #tags>
            <div>共 {{item.number}} 件商品 -- - {{item.status}}</div>
            <van-tag plain type="danger">付款方式：{{item.pay_way}}</van-tag>
          </template>
          <template #footer>
            <van-button size='mini' :type="statusBtnStyle(item.status)">{{ statusText(item.status) }}</van-button>
            <van-button size='mini' type="danger">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>


    </van-tabs>

  </div>
</template>

<script>
import { Tab, Tabs, Card, Button, Tag } from "vant";
import { isLogin, userOrder, getCarData } from "@/api/index.js";
import { userInfo } from "@/util/tool.js";
import { Promise } from "q";
export default {
  data() {
    return {
      active: 0,
      allOrder: [],
      msg: "hello",
      tabsList: [
          {"title": "全部",'status': "all"},
          {"title": "未付款",'status': "0"},
          {"title": "已付款",'status': "1"},
          {"title": "完成",'status': "2"}
      ]
    };
  },
  filters:{
  },
  methods: {
    point(price){
      return price.toString().split(".")[1] ? price : price + '.00';
    },
    // 获取当前登录用户的订单
    async getOrder() {
      var { id } = userInfo();
      //orderData 返回的两种格式 {} 错误，   [] 成功
      var orderData = await userOrder(id);

      if (Array.isArray(orderData)) {
        // 还要获取订单中的商品
        var pros = []; // 存储所有的promise
        orderData.map(item => {
          pros.push(getCarData(item.goods_ids));
        });
        // 获取到了所有的订单商品
        var orderGoods = await Promise.all(pros);

        // 关联订单和订单商品
        // 在当前订单中额外添加一个属性如goods,记录当前订单的商品
        orderData.map((item, index) => {
          item.goods = orderGoods[index].message;
        });

        this.allOrder = orderData;
      } else {
        this.$toast(orderData.message);
      }
    },
    foo(status) {
      //   return 'status -' + status;
      //   return this.allOrder;
    },
    // 定义一个根据订单状态status获取不同的订单数据
    getOrderGoods(status) {
      // 'all' '0' '1' '2'
      if (status == "all") {
        // 全部
        return this.allOrder;
      }
      var goods = [];
      // 筛选出指定状态的订单
      this.allOrder.map(item => {
        item.status == status && goods.push(item);
      });

      return goods;
    },
    // 返回订单状态对应的文本
    statusText(status) {
      var statusTextMap = new Map();
      //   var arr = [['0',"未付款"],...];
      statusTextMap.set("0", "未付款");
      statusTextMap.set("1", "已付款");
      statusTextMap.set("2", "已完成");
      return statusTextMap.get(status.toString());
    },
    // 返回订单状态对应的按钮样式
    statusBtnStyle(status) {
      var statusTextMap = new Map();
      //   var arr = [['0',"未付款"],...];
      statusTextMap.set("0", "danger");
      statusTextMap.set("1", "primary");
      statusTextMap.set("2", "default");
      return statusTextMap.get(status.toString());
    }
  },
  async created() {
    await isLogin();
    this.$parent.showNavBar({ title: "我的订单" });
    this.$parent.hideTabbar();
    this.getOrder();
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-card": Card,
    "van-button": Button,
    "van-tag": Tag
  }
};
</script>

<style lang="scss" scoped>
.van-tabs__content {
  margin-bottom: 10px;
}
</style>
