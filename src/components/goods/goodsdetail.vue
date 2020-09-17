<template>
  <div class="goodsdetail-container">
    <div v-if="false">
      <h3>vuex演示</h3>
      <div>
        name: {{ this.$store.state.name }}
        <br />
        age: {{ this.$store.state.age }}
        <br />
        姓名和年龄： {{ this.$store.getters.getNameAge }}
        <br />
        <br />
        <!-- 我的爱好： {{this.$store.state.hobby.join('-')}} <br /><br /> -->
        我的爱好： {{this.$store.getters.joinHobby}}
        <br />
        <br />
        modulec-state： {{this.$store.state.modulec}}
        <br />
        <br />
        全局的 {{ this.$store.getters.gt1}}
        <br />
        私有的 {{ this.$store.getters['modulec/gt1'] }}
        <br />

        <hr />
        <button @click="changeName">syncchangeName</button>
        <br />
        <button @click="changeHobby">asyncChageHobby</button>
        <button @click="mcmu1">mcmu1</button>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="card">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ccc">
        <van-swipe-item v-for="item in lunboData" :key="item.src">
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 商品名称和价格 -->
    <div class="card">
      <div class="goodsName overflow_ellipsis">{{ goodsInfo.title }}</div>
      <van-divider :hairline="false" />
      <div>
        <span class="marketPrice">市场价：&yen;{{ goodsInfo.market_price }}</span>
        <span class="sellPrice">
          本店价：
          <span class="price">&yen;{{ goodsInfo.sell_price }}</span>
        </span>
      </div>
      <div class="goodsNumber">
        <span>购买数量：</span>
        <van-stepper v-model="value" />
      </div>
    </div>

    <!-- 商品的其他信息 -->
    <div class="card">
      <van-divider :hairline="false">其他信息</van-divider>
      <div class="info">
        <span>商品货号：{{ goodsInfo.goods_no }}</span>
        <span>库存情况：{{ goodsInfo.stock_quantity }}件</span>
        <span>上架时间：{{ goodsInfo.add_time | dateFormat }}</span>
      </div>
    </div>

    <!-- 商品的介绍 -->
    <div class="card">
      <van-divider :hairline="false">介绍</van-divider>
      <div class="content" v-html="goodsInfo.content"></div>
    </div>

    <!-- 商品购买 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" :badge="$store.getters.carTotal" @click="cart" text="购物车" />
      <van-goods-action-button type="warning" @click="addGoodsToCar" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Divider,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
} from "vant";

import { getPhotoThumbData, getGoodsInfoData } from "@/api/index.js";

export default {
  props: ["id"],
  data() {
    return {
      value: 1,
      lunboData: [],
      goodsInfo: {},
    };
  },
  methods: {
    async getGoodsThumb() {
      var { message } = await getPhotoThumbData(this.id);
      this.lunboData = message;
    },
    async getGoodsInfo() {
      var { message } = await getGoodsInfoData(this.id);
      this.goodsInfo = message;
    },
    cart(){
        this.$router.push('/cart')
    },
    // 加入商品{id,number,price,select:true}购物车
    addGoodsToCar() {
      var goods = {
        id: this.goodsInfo.id,
        number: this.value,
        price: this.goodsInfo.sell_price,
        selected: true,
      };
      this.$store.commit("addCar", goods);
    },
  },
  created() {
    this.$parent.showNavBar({ title: "商品详情" });
    this.$parent.hideTabbar();
    this.getGoodsThumb();
    this.getGoodsInfo();
  },
  mounted() {
    // window.οnbefοreunlοad = function () {
    //   console.log("123");
    //   return "123";
    // };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-divider": Divider,
    "van-stepper": Stepper,
    "van-goods-action": GoodsAction,
    "van-goods-action-icon": GoodsActionIcon,
    "van-goods-action-button": GoodsActionButton,
  },
};
</script>

<style lang="scss" scoped>
.goodsdetail-container {
  background-color: #eee9e9;
  
.van-goods-action{
  width: 100vw;
}
  .card {
    padding: 8px;
    border-radius: 6px;
    background: #ffffff;
    margin: 8px;
    .van-swipe {
      height: 240px;
      background-color: #fff;

      .van-swipe-item {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 245px;
          height: 100%;
        }
      }
    }
    .goodsName {
      color: #333;
    }

    .marketPrice {
      margin-right: 20px;
      text-decoration: line-through;
    }

    .sellPrice {
      .price {
        color: red;
      }
    }

    .goodsNumber {
      display: flex;
      margin: 10px 0px;

      .van-stepper {
        margin-left: 20px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      margin: 10px 0px;
    }

    .content {
      /deep/ img {
        width: 100vw;
        // height: 200px;
        font-size: #ccc;
      }
    }
  }
}
</style>
