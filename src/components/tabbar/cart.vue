<template>
  <div class="cart-container">
    <!-- 收货地址 -->
    <div v-if="hasGoods">
      <van-divider>收货地址</van-divider>
      <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认"/>

      <!-- 购买的商品 -->
      <van-divider>购买的商品</van-divider>
      <!-- <van-divider>购买的商品 {{ $store.getters.getGoodsNumber }}</van-divider>
      <van-divider>购买的商品 {{ $store.getters.getGoodsSelected }}</van-divider>
      <van-divider>购买的商品 {{ $store.getters.getGoodsSelectedPrice }}</van-divider> -->

      <div class="car">
        <div class="item" v-for="(item,index) in carData" :key="item.id">
          <div>
            <van-switch
              @change="switchChange(item.id,$store.getters.getGoodsSelected[item.id])"
              v-model="$store.getters.getGoodsSelected[item.id]"
            />
          </div>

          <div class="thumbImage">
            <img :src="item.thumb_path">
          </div>

          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="footer">
              <div class="price">&yen;{{ item.sell_price }}</div>
              <van-stepper
                class="number"
                @change="changeNumber(item.id,$store.getters.getGoodsNumber[item.id])"
                v-model="$store.getters.getGoodsNumber[item.id]"
              />
              <van-button type="danger" @click="del(item.id,index)">删除</van-button>
            </div>
          </div>
        </div>

        <van-cell icon="cash-back-record" title="微信支付"/>
      </div>

      <!-- 提交订单操作 -->
      <van-submit-bar
        :price="$store.getters.getGoodsSelectedPrice"
        button-text="订单支付"
        @submit="onSubmit"
      >
        <template #default>共 {{$store.getters.getGoodsSelectedNumber}} 件商品</template>
        <template #tip>默认只支持微信支付</template>
      </van-submit-bar>
    </div>

    <div class="empty" v-else>
        <h3>亲，您的购物车暂无商品哦，去<router-link to="/home">首页</router-link>逛逛吧！</h3>
        <van-divider />
        <div class="img-car">
            <img src="../../assets/images/car.png" alt="">
        </div>
        <div>
            <router-link to="/login">登录</router-link>后可以同步电脑与手机购物车中的商品
        </div>
    </div>
  </div>
</template>

<script>
import {
  Divider,
  AddressList,
  Switch,
  Stepper,
  Button,
  Cell,
  SubmitBar,
  Dialog
} from "vant";
import { getCarData,isLogin,commitOrder } from '@/api/index.js';
import { userInfo,genOrderId } from '@/util/tool.js';
export default {
  data() {
    return {
      chosenAddressId: "1",
      //   checked: true,
      carData: [],
      //   number: 10,
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true
        }
      ]
    };
  },
  computed: {
    hasGoods: function() {
      return this.carData.length > 0;
    },
    number: function(){
        return this.$store.getters.getGoodsSelectedNumber
    },
    total_price: function(){
        return this.$store.getters.getGoodsSelectedPrice
    },
    goods_ids: function(){
        return this.$store.getters.getSelectedGoodsIds
    }
  },
  methods: {
    onSubmit() {
      this.$toast("生产订单支付中....");
    },
    async onSubmit () {
        var user = userInfo();
        if(user === false){
            this.$router.push('/login')
        }
        var order_id = genOrderId(); // 用户生产订单号
        //1.准备订单数据，并校验数据合法
        var orderData = {
            user_id: user.id,
            order_id: order_id,
            address_id: this.list[0].id,
            total_price: this.total_price,
            number: this.number,
            goods_ids: this.goods_ids
        };
        // console.log('orderData',orderData)
        //2.调用后台接口,后台存储订单，获取支付的url，用于浏览器中唤醒微信支付
        // loading提示
        var _this  = this;
        this.$toast.loading({
             message: '支付中...',
             forbidClick: true,
             duration: 3000,
             onClose(){
                // 询问用户是否支付完成
                Dialog.alert({
                    message: '支付是否完成',
                    }).then(() => {
                        _this.$router.push('/order')
                    });
             }
        })

        var res = await commitOrder(orderData);
        var weixinpayurl = res.data;
        // console.log(res)
        location.href = weixinpayurl; //会主动唤起微信支付
        //3. 成功清空购物车
        localStorage.removeItem('carData');

    },
    async getCarGoods() {
      var ids = this.$store.getters.getGoodsIds; // '88,91'
      if(!ids){ return; }
      var { message } = await getCarData(ids);
      this.carData = message;
    },
    // 删除购物车商品
    del(goods_id, index) {
      // 调用vuex中mutations中的方法来删除
      this.$store.commit("delCarGoods", goods_id);
      // 同时也要在当前的私有数据this.carData也要删除
      this.carData.splice(index, 1);
    },
    // 修改商品的选中状态
    switchChange(goods_id, selected) {
      // 调用vuex中的方法修改数据
      this.$store.commit("changeGoodsSelected", { goods_id, selected });
    },
    // 修改商品的购买数量
    changeNumber(goods_id, number) {
      // 调用vuex中的方法修改数据
      // console.log(goods_id,number)
      this.$store.commit("changeGoodsNumber", { goods_id, number });
    }
  },
  created() {
    this.$parent.showNavBar({ title: "我的购物车" });
    this.$parent.showTabbar();
    this.getCarGoods();
  },
  components: {
    "van-divider": Divider,
    "van-address-list": AddressList,
    "van-stepper": Stepper,
    "van-button": Button,
    "van-switch": Switch,
    "van-cell": Cell,
    "van-submit-bar": SubmitBar
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  background-color: #e9e9e9;

  .van-divider {
    text-align: center;
    color: #6f7370;
    font-size: 16px;
    border-color: #545e6c;
    margin: 2px;
  }

  .van-address-list {
    padding-bottom: 10px;
  }
  .van-address-list__bottom {
    visibility: hidden;
  }

  .car {
    margin: 10px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      margin: 10px 0px;
      border-radius: 8px;

      padding: 10px;
    }
    .thumbImage {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin: 0 4px;
      img {
        width: 100%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          color: #ff0000;
        }

      }
    }
    .van-cell {
      border-radius: 8px;
    }
  }

  .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
}
</style>
