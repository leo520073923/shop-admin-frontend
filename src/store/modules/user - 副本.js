import axios from "axios";

export default {
    // 使用命名空间，因为一个应用可能存在多个数据模块，
    // 需要使用命令空间区别开来

    namespaced: "user",

    //初始数据
    state: {
        username: localStorage.getItem('username') || "",
        identity: localStorage.getItem('identity') || ''
    },

    mutations: {
        setLocalStorage(state, value) {
            state.username = value.uname
            state.indentity = value.realname
            localStorage.setItem("username", value.uname);
            localStorage.setItem("identity", value.realname);
        },
    },

    //命令和执行
    actions: {

        // login是命令，对应的函数就是操作函数
        // {commit, state} = 第一个对象参数解构出来的属性
        //登录
        login(obj, data) {

            const {commit,state} = obj;

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
                    const {
                        status,
                        message
                    } = res.data;

                    // 如果登录错误
                    if (status == 1) {
                        this.$message.error(message);
                    } else {

                        // 把接口返回的值更新store下的数据
                        state.username = message.uname;
                        state.identity = message.realname;

                        // 把用户信息保存到本地存储
                        localStorage.setItem("username", message.uname);
                        localStorage.setItem("identity", message.realname);

                        resolve();
                        // window.history.back();
                    }
                })
            })
        },

        //退出
        logout({
            state
        }, fn) {
            // 调用退出的接口
            axios({
                url: "/admin/account/logout",
                withCredentials: true,
            }).then(res => {
                const {
                    status,
                    message
                } = res.data;
                if (status == 0) {
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