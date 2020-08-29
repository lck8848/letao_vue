<template>
  <div class="newslist_container">
    <van-loading v-if="isShow" :vertical="true" type="spinner" color="#ccc" size="30px">加载中...</van-loading>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="newslist">
        <div class="item" v-for="item in newslist" :key="item.id">
          <div class="img_container">
            <img v-lazy="item.img_url" alt />
          </div>
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span>发布时间：{{ item.add_time | dateFormat('YYYY-MM-DD') }}</span>
              <span>点击次数：{{ item.click }}</span>
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
      type="info"
      @click="loadMore"
      block
      loading-text="loading"
    >加载更多</van-button>
  </div>
</template>

<script>
import { getNewsListData } from "@/api/index.js";
import { NavBar,PullRefresh, Toast, Button, Loading } from "vant";
// import moment from 'moment';
export default {
  name: "newslist-component",
  data() {
    return {
      title: "新闻列表",
      newslist: [],
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
    async getNewsList() {
      this.hasButton = true; // 显示下面的加载更多按钮
      if (this.hasData == false) {
        Toast("已经到底了");
        this.isMore = false;
        return;
      }

      var { message } = await getNewsListData(this.page, this.pagesize);
      this.isMore = false;
      this.isShow = false;
      // 判断数据是否加载完毕
      if (message.length == 0) {
        Toast("到底了");
        this.hasData = false; // 说明没有数据
        return;
      }
      // 新数据需要拼接旧数据
      this.newslist = this.newslist.concat(message);
    },
    onRefresh() {
      //console.log( this.isLoading ) //下拉刷新组件默认会 设置为true
      //页面重置为1，
      this.page = 1;
      this.newslist = [];
      this.hasData = true;
      this.isShow = true;
      this.hasButton = false;
      setTimeout(() => {
        this.isLoading = false;
        //下拉刷新即重新加载当前页面中的数据即可
        this.getNewsList();
        Toast("加载成功");
      }, 500);
    },
    loadMore() {
      // 加载更多
      // 核心：把当前页码++操作
      this.page++;
      this.isMore = true;
      this.getNewsList();
    },
  },
  created() {
    this.$parent.showNavBar({ title: "新闻列表" });
    this.getNewsList();
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
.newslist_container {
  .newslist {
    padding: 4px;
    background-color: rgb(241, 235, 235);
    .item {
      display: flex;
      border-bottom: 1px solid #ccc;
      margin-top: 8px;

      .img_container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
        width: 100px;
        height: 100px;

        img {
          width: 100px;
          height: 100%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2px;

        .title {
          color: #000;
          font-size: 14px;
          margin-top: 10px;
          font-weight: 700;

          // 限制两行文本，超出显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .info {
          display: flex;
          justify-content: space-between;
          color: #888;
          font-size: 12px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
