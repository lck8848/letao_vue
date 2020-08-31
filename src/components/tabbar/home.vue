<template>
  <div id="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunboData" :key="item.img">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
    <van-grid square :border="false">
      <van-grid-item to="/goodslist">
        <img src="@/assets/images/menu10.png" />
        <div>数码电器</div>
      </van-grid-item>
      <van-grid-item to="/newslist">
        <img src="@/assets/images/menu19.png" />
        <div>乐淘头条</div>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu18.png" />
        <div>美图欣赏</div>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu13.png" />
        <div>乐淘超市</div>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu12.png" />
        <div>9.9元拼单</div>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu15.png" />
        <div>乐淘服饰</div>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu16.png" />
        <div>物流查询</div>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu17.png" />
        <div>全部</div>
      </van-grid-item>
    </van-grid>
    <div id="goodlist">
      <van-divider :style="{ color: '#333', borderColor: '#545e6c',fontSize:'16px'}">为你推荐</van-divider>
      <div class="goods">
        <div class="item" v-for="item in recommend" :key="item.id">
          <img v-lazy="item.img_url" alt />
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="footer">
              <span class="price">&yen;&nbsp;{{ item.sell_price }}</span>
              <span class="buy">{{ item.buy }}人已购买</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Divider,Search } from "vant";
import { getLunBoData, getRecommend } from "@/api/index.js";
export default {
  data() {
    return {
      value:"",
      lunboData: [],
      recommend: [],
    };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-grid": Grid,
    "van-grid-item": GridItem,
    "van-divider": Divider,
    "van-search":Search
  },
  methods: {
    async getLunbo() {
      var res = await getLunBoData();
      this.lunboData = res.message;
    },
    async getRec() {
      var res = await getRecommend(12);
      this.recommend = res.message;
    },
  },
  created() {
    this.$parent.showHeader();
    this.getLunbo();
    this.getRec();
  },
};
</script>

<style lang="scss" scoped>
#home {
  .my-swipe {
    height: 200px;
    .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .van-grid {
    .van-grid-item {
      padding: 8px 2px;

      img {
        width: 50%;
      }

      .text {
        color: #524949;
      }
    }
  }
  #goodlist {
    background-color: #eeeeee;
    .van-divider {
      margin: 0;
      padding: 16px 0;
    }
    .goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 2px;
      padding-top: 0;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 46%;
        margin: 4px;
        margin-top: 0;
        border-radius: 6px;
        background: #fff;
        overflow: hidden;
        img {
          width: 100%;
        }

        .text {
          padding: 2px;
          display: flex;
          flex-direction: column;

          .title {
            color: #333;
            font-size: 12px;
          }

          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px;

            .price {
              font-size: 14px;
              color: #f50;
              padding: 10px 0;
            }

            .buy {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>