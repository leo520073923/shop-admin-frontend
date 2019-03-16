import Vue from 'vue';
import Vuex from 'vuex';

//引入用户user.js的数据
import user from "./modules/user"

// 注册为组件
Vue.use(Vuex);

//创建一个仓库
export default new Vuex.Store({
    //挂载数据模块,导入模块到参考对象生成数据
    modules:{
        user
    }
})