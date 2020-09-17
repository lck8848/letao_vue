<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-area="onChangeArea"
    />
  </div>
</template>

<script>
import { AddressEdit } from "vant";
import areaList from '@/util/area.js';
import { addUserAddressData } from "@/api/index.js"
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      areaCode:''
    };
  },
  methods: {
    async onSave(addressInfo) {
        // addressInfo 收集到的用户的地址信息
        console.log(addressInfo)
        addressInfo.country = addressInfo.county;
        if(addressInfo.isDefault){
            addressInfo.isDefault = 1;
        }else{
            addressInfo.isDefault = 0;
        }
        addressInfo.areaCode = this.areaCode;
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        var user_id = userInfo.id;
        // 调用地址
        var { status,message } = await addUserAddressData(user_id,addressInfo);
         this.$toast(message)
        if(status == 0){
            this.$router.push('/addressmanage')
        }

    },
    onChangeArea(values){
        // 用户点击省市区确认按钮会触发
        console.log(values)
        var areaArr = []
        values.map(v=>{
            areaArr.push(v.code);
        })
        this.areaCode = areaArr.join('-');

    }
  },
  created() {
    this.$parent.showNavBar({ title: "添加地址" });
    this.$parent.showTabbar();
  },
  components: {
    "van-address-edit": AddressEdit
  }
};
</script>

<style lang="scss" scoped>
</style>
