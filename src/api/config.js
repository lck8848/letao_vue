// 这里我们封装封装一个axios的实例
import axios from 'axios'

import {
    Toast
} from "vant";
import router from "@/router/index.js"

import store from "@/store/carStore.js";
import {
    setTimeout
} from 'core-js';

import {
    sleep
} from "@/util/tool.js";

// console.log(process.env.VUE_APP_TITLE);
// 通过process.env.NODE_ENV
// let apiUrl = process.env.NODE_ENV == 'development' ? "http://127.0.0.1:3000/api" : 'http://47.106.36.197:3000/api';
const instance = axios.create({
    // baseURL: 'http://api.w0824.com/api',
    baseURL: "http://47.106.36.197:3000/api",
    // baseURL: process.env.VUE_APP_apiurl,
})

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
        // console.log('interceptors.request', store.state.isPending); // false
        // 在发送请求之前做些什么
        //   console.log(config);
        // 设置自定义请求头(authorized-要求是https)携带token到后台，方便后台进行验证
        var token = localStorage.getItem('token') || '';
        token && (config.headers.token = token)
        // If-Modified-Since 是标准的HTTP请求头标签，在发送HTTP请求时，
        // 把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较
        config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据
        // 设置对应的loading
        !store.state.isPending && store.commit('changeIsPending', true)
        // 延时5秒
        await sleep(800)

        // console.log('interceptors.request', store.state.isPending); // true

        return config
    },
    function (error) {
        // 对请求错误做些什么
        Toast('超时，请稍后再试');
        return Promise.reject(error)
    })

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 关闭loading
    store.commit('changeIsPending', false)
    // console.log('response.request', store.state.isPending); // false
    return response.data
}, function (error) {
    store.commit('changeIsPending', false)
    //   console.log(error.response.data)
    //   console.log(error.response.status)
    //   console.log(error.message)
    // 对响应错误做点什么
    var status = error.response.status;
    var message = error.response.data.message;
    //   console.log(message)
    switch (status) {
        case 401:
            Toast('用户信息过期，请重新登录');
            router.push('/login');
            break;
        default:
            this.$toast('网络错误，请稍后再试');
    }

    return Promise.reject(error.response)
})

export default instance
