
// 专门存储用户的数据，和修改用户数据的方法

import axios from "axios";

export default {

    // 命令空间,为了区别modules下面其他模块可能存在相同的数据或者方法
    namespaced: "user",

    // 初始化数据
    state: {
         // 用户名
        username: localStorage.getItem("username") || "",
        // 身份信息
        identity: localStorage.getItem("identity") || "",
    },

    // 异步修改数据
    actions: {

        // login是命令，对应的函数就是操作函数
        // {commit, state} = 第一个对象参数解构出来的属性
        login(obj, data){

            const {commit, state} = obj;

            // 创建一个Promise对象
            // resolve和reject是两个函数
            // resolve是promise对象.then方法中的函数
            return new Promise((resolve, reject) => {

                axios({
                    url: "/admin/account/login",
                    method: "POST",
                    data,
                    // 处理跨域
                    withCredentials: true,
                }).then(res => {
                    const {status, message} = res.data;
        
                    // 如果登录错误
                    if(status == 1){
                        this.$message.error(message);
                    }else{

                        // 把接口返回的值更新store下的数据
                        state.username = message.uname;
                        state.identity = message.realname;

                        // 把用户信息保存到本地存储
                        localStorage.setItem("username",  message.uname);
                        localStorage.setItem("identity",  message.realname);

                        resolve();
                        // window.history.back();
                    }
                })
            })
        },

        logout({state}, fn){
            // 调用退出的接口
            axios({
                url: "/admin/account/logout",
                withCredentials: true,
            }).then(res => {
                const {status, message} = res.data;
                if(status == 0){
                    // 把接口返回的值更新store下的数据
                    state.username = "";
                    state.identity = "";

                    // 把用户信息保存到本地存储
                    localStorage.removeItem("username");
                    localStorage.removeItem("identity");

                    fn();
                }
            })
        }
    }
}