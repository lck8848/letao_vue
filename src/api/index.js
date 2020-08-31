import instance from './config.js';

export async function getLunBoData() {
    return await instance.get('/getlunbo');
}

export async function getRecommend(limit = 6) {
    return await instance.get(`/recommend?limit=${limit}`);
}

export async function getNewsListData(page = 1, pagesize = 5) {
    return await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}

export async function getGoodsListData(pageindex = 1) {
    return await instance.get(`getgoods?pageindex=${pageindex}`);
}

export  async  function getNewsDetailData(id){
    return  await instance.get(`/getnew/${id}`);
}

export  async  function getNewsCommentData(id,page){
    return  await instance.get(`/getcomments/${id}?pageindex=${page}`);
}

export  async  function postCommentData(id,content){
    return  await instance.post(`/postcomment/${id}`,{content});
}