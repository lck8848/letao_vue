<template>
  <div id="app_content">
    <van-nav-bar v-show="isShowNavBar" :title="title" left-arrow @click-left="$router.go(-1)" />

    <header v-show="isShowHeader">
      <div class="nav">
        <img src="@/assets/images/logo.png" />
        <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />
      </div>
    </header>

    <keep-alive include="home-component,newslist-component">
      <router-view></router-view>
    </keep-alive>

    <van-tabbar v-if="isShowTabBar" v-model="active" :route="true">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" :badge="$store.getters.carTotal">购物车</van-tabbar-item>
      <van-tabbar-item to="/user/120" icon="user-o">我的乐淘</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem, NavBar } from "vant";
import "@/assets/scss/common.scss";
import { mapState } from "vuex";
var _this;
export default {
  data() {
    return {
      active: 0,
      value: "",
      isShowNavBar: false,
      title: "",
      isShowHeader: true,
      isShowTabBar: true,
    };
  },
  computed: {
    ...mapState(["isPending"]),
  },
  components: {
    "van-search": Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-nav-bar": NavBar,
  },
  created() {
    _this = this;
  },
  methods: {
    // 控制navbar显示
    showNavBar(options) {
      this.title = options.title;
      this.isShowNavBar = true;
      this.isShowHeader = false;
    },
    showHeader() {
      this.isShowHeader = true;
      this.isShowNavBar = false;
    },
    showTabbar() {
      this.isShowTabBar = true;
    },
    hideTabbar() {
      this.isShowTabBar = false;
    },
  },
  watch: {
    $route(to, from) {
      scrollTo(0, 0);
      _this.showTabbar();
      // if (from.path.startsWith("/goodsdetail/")) {
      //   _this.showTabbar();
      // }
    },
    isPending: function (isPending) {
      // console.log("watch", isPending);
      //判断true还是false,给loading和关闭loading即可
      isPending
        ? this.$toast.loading({
            message: "loading...",
            forbidClick: true,
            duration: 0, // 持续展示 toast
          })
        : this.$toast.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  #app_content {
    min-width: 320px;
    max-width: 750px;
    margin: auto;
    padding-top: 46px;
    padding-bottom: 50px;
    height: 100vh;
    background-color: #e9e9e9;
    header {
      .nav {
        display: flex;
        position: fixed;
        background-color: #fff;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        z-index: 1;
        padding: 2px;
        top: 0px;
        max-width: 750px;
        min-width: 320px;
        img {
          height: 44px;
          margin-left: 6px;
        }
        .van-search {
          flex: 1;
        }
      }
    }
    .van-nav-bar {
      position: fixed;
      top: 0px;
      width: 100vw;
    }
  }
}
</style>