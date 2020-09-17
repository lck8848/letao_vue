<template>
  <div class="user-container">
    <van-cell-group>
      <img src="../../assets/images/logo.png" alt>
      <div>用户名： {{ username }}</div>
    </van-cell-group>
    <van-cell title="修改密码" is-link/>
    <van-cell title="我的订单" to="/order" is-link/>
    <van-cell title="地址管理" to="/addressmanage" is-link/>

    <van-cell class="feedback" title="提交反馈" is-link/>
    <van-cell title="关于乐淘" value="v1.0.0"/>

    <!-- 退出按钮 -->
    <van-button block class="logout">退出登录</van-button>
  </div>
</template>

<script>
import { isLogin } from "@/api/index";
import { Cell, CellGroup, Button } from "vant";
export default {
  data() {
    return {
      username: "test"
    };
  },
  props: ["user_id"],
  created() {
    isLogin();
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.username = userInfo.username;
    this.$parent.showNavBar({ title: "个人中心" });
    this.$parent.hideTabbar();
  },
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  .van-cell-group {
    display: flex;
    align-items: center;
    padding: 10px;

    img {
      width: 20%;
      margin-right: 100px;
    }
  }

  .feedback {
    margin-top: 20px;
  }

  .logout {
    position: fixed;
    bottom: 0px;
    left: 0px;
  }
}
</style>