<template>
    <div class="newsdetail_container">
        <h3 class="title">{{news.title}}</h3>
        <div class="publish_date">
            <span>发布时间：{{news.add_time | dateFormat}}</span>
            <span>阅读 {{news.click}}次</span>
        </div>
        <van-divider :hairline="false" />
        <div class="content" v-html="news.content">
        </div>
        <van-field
            class="textarea"
            v-model="content"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请友善留言"
            show-word-limit
        />
        <!-- 评论按钮 -->
        <van-button type="info" class="ping" block @click="postComment">评论</van-button>

        <!-- 评论列表 -->
        <div class="commentlist">
            <div class="item" v-for="item in comments" :key="item.id">
                <div>{{item.user_name}}：{{item.content}}</div>
                <div>评论时间：{{ item.add_time | dateFormat }}</div>
            </div>

            <!-- 加载更多评论 -->
            <van-button type="danger" :loading="isLoading"  loading-text="加载中..." block :plain="true" @click="loadMore">查看更多</van-button>
        </div>
    </div>
</template>

<script>
    import { Field,Button,Divider  } from 'vant';
    import { getNewsDetailData,getNewsCommentData,postCommentData } from "@/api/index.js"
    export default {
        name:"newsdetail",
        props:['id'],
        data(){
            return {
                content: "",
                page: 1,
                news:{},
                comments:[],
                isLoading: false
            }
        },
        methods:{
            async getNews(){
                var { message } = await getNewsDetailData(this.id);
                this.news = message[0];
            },
            async getComment(){
                this.isLoading = true;
                var { message } = await getNewsCommentData(this.id,this.page);
                this.isLoading = false;
                this.comments = this.comments.concat(message);
            },
            loadMore(){
                // 加载更多
                this.page ++;
                this.getComment();
            },
            // 发布评论
            async postComment(){
                var content = this.content.trim();
                if(content == ''){
                    this.$toast('不能为空')
                    return;
                }
                var {status,message,insertId} = await postCommentData(this.id,content);
                if(status == 0){
                    this.$toast(message);
                    this.content = '';
                    var item = {
                        add_time: Date.now(),
                        content,
                        id:insertId,
                        user_name: '访客'
                    };
                    this.comments.unshift(item)
                }else{
                    this.$toast(message);
                }
            }


        },
        created(){
             this.$parent.showNavBar({ title: "新闻详情" });
             this.getNews()
             this.getComment()
        },
        components:{
            "van-field": Field,
            "van-button": Button,
            "van-divider": Divider
        }
    }
</script>

<style lang="scss" scoped>
    .newsdetail_container {
        // background: rgb(236, 233, 233);
        padding: 6px;
        .title {
            text-align: center;
            font-size: 16px;
            color:#404040;
            padding: 10px 0px;
        }

        .publish_date {
            display:flex;
            justify-content: space-between;
            font-size: 12px;
            color:#888;
            padding: 0px 10px;
        }

        .textarea {
            margin: 8px 0;
        }

        .ping {
            margin: 8px 0;
        }


        .commentlist {
            .item {
                background-color: #ccc;
                font-size: 12px;
                padding: 4px;
                margin-bottom: 10px;
            }
        }
    }
</style>
