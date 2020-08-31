<template>
  <div class="goodslist_container">
    <van-loading v-if="isShow" :vertical="true" type="spinner" color="#ccc" size="30px">加载中...</van-loading>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="goods">
        <div class="item" v-for="item in goodslist" :key="item.id">
          <img v-lazy="item.img_url" alt />
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <div class="price_all">
                <span class="price">&yen;&nbsp;{{ item.sell_price }}</span>
                <del>&yen;&nbsp;{{ item.market_price }}</del>
              </div>
              <div class="footer">
                <span>热卖中</span>
                <span>剩 {{ item.stock_quantity }} 件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <!-- 加载更多 -->
    <!-- 只有loading才显示loading-text的内容 -->
    <van-button
      :loading="isMore"
      v-if="hasButton"
      type="danger"
      @click="loadMore"
      block
      loading-text="loading"
    >加载更多</van-button>
  </div>
</template>

<script>
import { getGoodsListData } from "@/api/index.js";
import { NavBar, PullRefresh, Toast, Button, Loading } from "vant";
// import moment from 'moment';
export default {
  name: "newslist-component",
  data() {
    return {
      title: "商品列表",
      goodslist: [],
      isLoading: false,
      isMore: false,
      page: 1,
      pagesize: 10,
      hasData: true,
      isShow: false,
      hasButton: true,
    };
  },
  methods: {
    async getGoodsList() {
      this.hasButton = true; // 显示下面的加载更多按钮
      if (this.hasData == false) {
        Toast("已获取所有商品");
        this.isMore = false;
        return;
      }

      var { message } = await getGoodsListData(this.page, this.pagesize);
      this.isMore = false;
      this.isShow = false;
      // 判断数据是否加载完毕
      if (message.length == 0) {
        Toast("加载完毕");
        this.hasData = false; // 说明没有数据
        return;
      }
      // 新数据需要拼接旧数据
      this.goodslist = this.goodslist.concat(message);
    },
    onRefresh() {
      //console.log( this.isLoading ) //下拉刷新组件默认会 设置为true
      //页面重置为1，
      this.page = 1;
      this.goodslist = [];
      this.hasData = true;
      this.isShow = true;
      this.hasButton = false;
      setTimeout(() => {
        this.isLoading = false;
        //下拉刷新即重新加载当前页面中的数据即可
        this.getGoodsList();
        Toast("加载成功");
      }, 500);
    },
    loadMore() {
      // 加载更多
      // 核心：把当前页码++操作
      this.page++;
      this.isMore = true;
      this.getGoodsList();
    },
  },
  created() {
    this.$parent.showNavBar({ title: "商品列表" });
    this.getGoodsList();
  },
  components: {
    "van-nav-bar": NavBar,
    "van-pull-refresh": PullRefresh,
    "van-button": Button,
    "van-loading": Loading,
  },
};
</script>

<style lang="scss" scoped>
.goodslist_container {
  padding-top: 5px;
  background-color: #f1f1f1;
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
      width: 47.8%;
      margin: 4px;
      margin-top: 0;
      border-radius: 6px;
      background: #fff;
      overflow: hidden;
      img {
        height: 160px;
      }

      .text {
        padding: 2px;
        display: flex;
        flex-direction: column;

        .title {
          color: #333;
          font-size: 12px;
        }

        .info {
          .price_all {
            display: flex;
            // justify-content: space-between;
            align-items: center;
            height: 28px;
            line-height: 28px;
            .price {
              font-size: 16px;
              color: red;
              font-weight: 700;
              padding: 10px 0;
              margin-right: 12px;
            }
            del {
              color: #565252;
              font-size: 12px;
            }
          }

          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #565252;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
