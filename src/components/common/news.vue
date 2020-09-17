<template>
  <div class="newslist_container">
    <!-- <div>{{ photochildren.length }}</div> -->
    <div class="newslist">
      <router-link
        :to="'/newsdetail/'+item.id"
        tag="div"
        class="item"
        v-for="item in photochildren"
        :key="item.id"
      >
        <div class="img_container">
          <img @click.stop="imgClick(item.id)" v-lazy="item.img_url" alt />
        </div>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="zhaiyao">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </div>
    <!-- news子组件 -->
  </div>
</template>

<script>
// import moment from 'moment';
export default {
  name: "common-news",
  props: ["photochildren"],
  methods: {
    imgClick(id) {
      //   this.$toast(id)
      // 把数据传递父组件
      this.$emit("img-click", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.newslist_container {
  .newslist {
    padding: 4px;
    background-color: rgb(241, 235, 235);
    .item {
      display: flex;
      border-bottom: 1px solid #ccc;
      margin-top: 8px;

      .img_container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
        width: 100px;
        height: 100px;

        img {
          width: 100px;
          height: 100%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2px;

        .title {
          font-size: 13px;
          color: #000;
          margin-top: 10px;
          font-weight: 700;

          // 限制两行文本，超出显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .zhaiyao {
          font-size: 12px;
          color: #888;
          // 限制两行文本，超出显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }

    .item:first-child {
      margin-top: 0px;
    }
  }
}
</style>



