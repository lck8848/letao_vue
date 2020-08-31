<template>
  <div></div>
</template>

<script>
import { NavBar, Toast } from "vant";
export default {
  data() {
    return {
      title: "个人中心",
    };
  },
  components: {
    "van-nav-bar": NavBar,
  },
  created() {
    this.$parent.showNavBar({ title: "个人中心" });
  },
};
</script>

<style lang="scss" scoped>
</style>