<template>
  <div class="address-container">
    <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" />
  </div>
</template>

<script>
import { AddressList } from "vant";
import { userAddressData } from "@/api/index.js";
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        // {
        //   id: "1",
        //   name: "张三",
        //   tel: "13000000000",
        //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
        //   isDefault: true
        // },
        // {
        //   id: "2",
        //   name: "李四",
        //   tel: "1310000000",
        //   address: "浙江省杭州市拱墅区莫干山路 50 号",
        // }
      ],
    };
  },
  methods: {
    async loadAddress() {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var userAddress = await userAddressData(userInfo.id);
      var _this = this;

      userAddress.map((v) => {
        v.address = v.addressDetail;
        if (v.isDefault == 1) {
          v.isDefault = true;
          _this.chosenAddressId = v.id;
        } else {
          delete v.isDefault;
        }

        // v.isDefault == 1 &&  (v.isDefault = true);
      });
      this.list = userAddress;
    },
    onAdd() {
      this.$router.push("/addressadd");
    },
    onEdit(item, index) {
      this.$toast("编辑地址:" + index);
      var addressstr = JSON.stringify(item);
      // 跳转到编辑页面
      this.$router.push(`/addressedit/${addressstr}`);
    },
  },
  created() {
    this.$parent.showNavBar({ title: "地址管理" });
    this.$parent.hideTabbar();
    this.loadAddress();
  },
  components: {
    "van-address-list": AddressList,
  },
};
</script>

<style lang="scss" scoped>
</style>
