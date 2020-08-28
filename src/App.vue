<template>
  <div id="app">
    <header>
      <div class="nav">
        <img src="./assets/images/logo.png" />
        <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />
      </div>
    </header>

    <router-view></router-view>

    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" badge="5">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem } from "vant";
export default {
  data() {
    return {
      active: 0,
      value: "",
    };
  },
  components: {
    "van-search": Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
  },
};
</script>

<style lang="scss" scoped>
#app {
  min-width: 320px;
  max-width: 750px;
  margin: auto;
  padding-bottom: 50px;
  header {
    display: flex;
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