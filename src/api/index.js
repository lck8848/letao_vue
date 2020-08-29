import instance from './config.js';

export async function getLunBoData(){
    return await instance.get('/getlunbo');
}

export async function getRecommend(limit = 6){
    return await instance.get(`/recommend?limit=${limit}`);
}

export  async  function getNewsListData(page=1,pagesize=5){
    return  await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}