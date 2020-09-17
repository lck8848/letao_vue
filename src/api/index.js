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

export  async  function getPhotoCateData(){
    return  await instance.get(`/getcategory`);
}

export  async  function getPhotoCateListData(id){
    return  await instance.get(`/getcatelist/${id}`);
}

export  async  function getPhotoThumbData(id){
    return  await instance.get(`/getthumbimages/${id}`);
}

export  async  function getGoodsInfoData(id){
    return  await instance.get(`/getgoodsinfo/${id}`);
}

export  async  function getCarData(ids){
    return  await instance.get(`/getshopcarlist/${ids}`);
}

export async function  userLogin (data) {
    return await instance.post(`/login`,data)
}

export async function  isLogin () {
    var token = localStorage.getItem('token')
    try{
        await instance.post(`/checktoken?token=${token}`)
    }catch(e){

    }
}

export async function  userAddressData (userid) {
    return await instance.get(`/getaddress/${userid}?v=${Math.random()}`)
}

export async function  addUserAddressData (userid,addressInfo) {
    return await instance.post(`/addaddress/${userid}`,addressInfo)
}

export async function  deleteUserAddressData (addessid) {
    return await instance.post(`/deladdress/${addessid}`)
}

export async function  updateUserAddressData (addressid,addressInfo) {
    return await instance.post(`/updateaddress/${addressid}`,addressInfo)
}

// 提交订单接口
export async function  commitOrder (orderData) {
    return await instance.post(`/commitorder`,orderData)
}


// 获取用户的订单数据
export async function  userOrder (user_id) {
    return await instance.post(`/userorder/${user_id}`)
}