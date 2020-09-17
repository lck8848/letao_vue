<template>
  <div class="register-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repassword"
        type="password"
        name="密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">立即注册</van-button>
      </div>
    </van-form>

    <div class="text">
        <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
import { Form, Field,Button } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      repassword: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  },
  created() {
    this.$parent.showNavBar({ title: "登录" });
  },
  components:{
      "van-form": Form,
      "van-field": Field,
      "van-button": Button,
  }
};
</script>

<style lang="scss" scoped>
.register-container {
    padding-top: 20px;

    .text {
        text-align: center;

        a {
            color: rgb(185, 181, 181);
        }


    }
}
</style>
