<template>
  <div id="app_content">
    <van-nav-bar
      v-show="isShowNavBar"
      :title="title"
      left-arrow
      @click-left="$router.go(-1)"
    />

  <header v-show="isShowHeader">
        <div class="nav">
          <img src="@/assets/images/logo.png" />
          <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />
        </div>
  </header>

    <router-view></router-view>

    <van-tabbar v-model="active" :route="true">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" badge="5">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem,NavBar } from "vant";
export default {
  data() {
    return {
      active: 0,
      value: "",
      isShowNavBar: false,
      title: '',
      isShowHeader: true
    };
  },
  components: {
    "van-search": Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-nav-bar": NavBar
  },
  methods:{
    // 控制navbar显示
    showNavBar(options){
        this.title = options.title
        this.isShowNavBar = true;
        this.isShowHeader = false;
    },
    showHeader(){
        this.isShowHeader = true;
        this.isShowNavBar = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#app_content {
  min-width: 320px;
  max-width: 750px;
  margin: auto;
  padding-bottom: 50px;
   header {
    height: 54px;
    .nav {
      display: flex;
      position: fixed;
      background-color: #fff;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      z-index: 1;
      padding: 2px;
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
}
</style>