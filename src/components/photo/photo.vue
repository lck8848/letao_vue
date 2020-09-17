<template>
  <div class="photo-container">
    <van-tree-select
      @click-nav="navHandle"
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
    >
    <!--activeIndex当前分组的下标  -->
    <template #content>

        <!-- <div v-if="isShowNews">
            <div> index: {{ activeIndex  }} </div>
            <div> length: {{ items[activeIndex].children.length  }} </div>
        </div> -->

        <!-- 子组件 -->
        <news v-if="isShowNews" @img-click="thumb" :photochildren="items[activeIndex].children"></news>



    </template>
    </van-tree-select>
  </div>
</template>

<script>
import { TreeSelect,ImagePreview } from "vant";
import { getPhotoCateData, getPhotoCateListData,getPhotoThumbData  } from "@/api/index.js";
import news from "@/components/common/news.vue"
import { log } from 'util';
export default {
  data() {
    return {
      items: [
        //   {text:'分组1',children:[{text:11},{text:111},{text:111}]},
        //   {text:'分组2',children:[{text:2},{text:22},{text:333}]},
        //   {text:'分组3',children:[{text:3},{text:33},{text:333}]},
        //   {text:'分组4',children:[{text:4},{text:44},{text:444}]}
      ],
      activeId: 1,
      activeIndex: 0,
      isShowNews: false
    };
  },
  methods: {
    // 获取图片的分类（分组）
    async getPhotoCate() {
      var { message } = await getPhotoCateData();
      // 先判断，防止没有数据报错
      if(!message.length){  return; }
      var first_id = message[0].id;
      // 同时最开始还需要获取第一个分组中的数据
      var first_children = await this.getPhotoCateList(first_id);
      message[0].children = first_children;
      message.map(v => {
        // 因为组件内部需要text属性，所有我们需要构造出这样的属性
        v.text = v.title;
        delete v.title;
      });
      this.items = message;

      // 等待上面的数据加载完毕之后，才去渲染子组件内容
      this.isShowNews = true;

    },
    // 获取分组下面的列表数据children
    async getPhotoCateList(id) {
      var {message} = await getPhotoCateListData(id);
      // 循环数组，添加一个text属性，显示分组内容
      message.map( v=>{
          v.text = v.title;
      } )
      return message;
    },
    async navHandle(index){
        // 判断当前分组的children是否有数据，有则使用之前的，不发请求重复获取,可以提高用户体验
        if(this.items[index].children){
            return;
        }
        this.isShowNews = false;
        // 获取图片分组的id
        var id = this.items[index].id;
        // 进而获取指定分组下面的图片列表数据
        var children = await this.getPhotoCateList(id);
        // console.log(children)
        // 需要把获取的数据赋值给对应的分组的children
        this.items[index].children = children;

        this.isShowNews = true;

    },
    async thumb(id){
        var {message} = await getPhotoThumbData(id);
        // 判断，防止没有缩略图
        if(!message.length){
            this.$toast('亲，图片你自己上传咯');
            return;
        }
        var thumbArr = [];
        message.map( v =>thumbArr.push(v.src) )

        ImagePreview(thumbArr);
    }
  },
  created() {
    this.$parent.showNavBar({ title: "美图欣赏" });
    this.getPhotoCate();
  },
  components: {
    "van-tree-select": TreeSelect,
    news
  }
};
</script>

<style lang="scss" scoped>
    .photo-container {

        .van-tree-select {
            height: 100vh !important;
        }
    }
</style>
