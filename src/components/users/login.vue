<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <div class="text">
        <router-link to="/register">用户注册</router-link>
    </div>
  </div>
</template>

<script>
import { Form, Field,Button } from "vant";
import { userLogin } from "@/api/index.js";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onSubmit(data) {
        // loading提示
        this.$toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration: 0, // 持续展示 toast
        })
        var {status,message,userInfo,token} = await userLogin(data);
        this.$toast.clear();
        this.$toast(message)
        if(status == 0){
            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            localStorage.setItem('token',token);
            this.$router.push('/home')
        }
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
.login-container {
    padding-top: 20px;

    .text {
        text-align: center;

        a {
            color: rgb(185, 181, 181);
        }


    }
}
</style>
