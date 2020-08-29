<template>
  <div></div>
</template>

<script>
import { NavBar, Toast } from "vant";
export default {
  data() {
    return {
      title: "购物车",
    };
  },
  components: {
    "van-nav-bar": NavBar,
  },
  created() {
    this.$parent.showNavBar({ title: "我的购物车" });
  },
};
</script>

<style lang="scss" scoped>
</style>