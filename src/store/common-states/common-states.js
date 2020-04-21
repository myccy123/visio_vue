export default {
    defTab: 'first',//tab切换
    colOptions: [],//数据源字段
    loading: false,//保存中
    isSignin: sessionStorage.getItem('isSignin') || false,//是否登录
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},//用户信息
}