
import Vue from "vue";

// 全局过滤器
import moment from 'moment';
Vue.filter('dateFormat',function(date,format='YYYY-MM-DD'){
    return moment(date).format(format);
})
