<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="onChangeArea"
      @change-default="onChangeDefault"
    />
  </div>
</template>

<script>
import { AddressEdit } from "vant";
import areaList from "@/util/area.js";
import { deleteUserAddressData, updateUserAddressData } from "@/api/index.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      areaCode: "",
      addressInfo: JSON.parse(this.$route.params.addressInfo),
    };
  },
  methods: {
    async onSave(addressInfo) {
      addressInfo.areaCode = this.areaCode;
      addressInfo.isDefault = this.isDefault;
      addressInfo.province = this.proCityCountry[0];
      addressInfo.city = this.proCityCountry[1];
      addressInfo.country = this.proCityCountry[2];
      // console.log('入库',addressInfo)
      var { status, message } = await updateUserAddressData(
        addressInfo.id,
        addressInfo
      );
      this.$toast(message);

      if (status == 0) {
        this.$router.push("/addressmanage");
      }
    },
    async onDelete(addressInfo) {
      var address_id = addressInfo.id;
      // ajax
      var { status, message } = await deleteUserAddressData(address_id);
      this.$toast(message);
      if (status == 0) {
        this.$router.push("/addressmanage");
      }
    },
    onChangeArea(values) {
      // 用户点击省市区确认按钮会触发
        var _this = this;
        var areaArr = []
        var place = [];
        _this.proCityCountry = [];
        values.map(v=>{
            areaArr.push(v.code);
            _this.proCityCountry.push(v.name)
        })
       this.areaCode = areaArr.join('-'); //11000- 111100 111112

    },
    onChangeDefault(value){
        this.isDefault = value ? '1' : '0';
    }
  },
  created() {
    // 要回显地址的省市区，需要给对象{}加一个areaCode属性，值为区县的areaCode即可
    // areaCode: "130000-130200-130204"
    // 需要这样的数据 areaCode: "130204"
    var fullAreaCode = this.addressInfo.areaCode;
    this.addressInfo.areaCode = this.addressInfo.areaCode.split("-")[2]; // 回显

    this.areaCode = fullAreaCode; // 记录原来的地址编号
    var { province, city, country } = this.addressInfo;
    this.proCityCountry = [province, city, country];

    this.isDefault = this.addressInfo === true ? "1" : 0;
    this.$parent.showNavBar({ title: "编辑地址" });
    this.$parent.showTabbar();
  },
  components: {
    "van-address-edit": AddressEdit,
  },
};
</script>

<style lang="scss" scoped>
</style>
