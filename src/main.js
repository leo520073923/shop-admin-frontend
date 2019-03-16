import Vue from 'vue'
import App from './App.vue'
// 引入store到组件
import store from './store'

// 1.引入axios
import axios from 'axios';

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

// element-ui：1.引入
import ElementUI from "element-ui";
// element-ui: 2.引入样式
import 'element-ui/lib/theme-chalk/index.css';

//引入vue-router
import VueRouter from "vue-router";

// 导入组件
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import GoodsList from "./pages/goods/GoodsList";
import GoodsAdd from "./pages/goods/GoodsAdd";
import GoodsEdit from "./pages/goods/GoodsEdit";
import CategoryList from "./pages/category/CategoryList";
import CategoryAdd from "./pages/category/CategoryAdd";
import CategoryEdit from "./pages/category/CategoryEdit";

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'


//注册插件
Vue.use(VueRouter)
// Vue.use(VueQuillEditor)
// 3.全局注册组件
Vue.use(ElementUI)

Vue.config.productionTip = false

//配置路由
const routes = [{
    path: "/",
    redirect: "/admin"
  },
  {
    path: "/login",
    component: Login,
    meta: "登录",
  },
  {
    path: "/admin",
    component: Admin,
    meta: "首页",
    redirect: "/admin/goods-list",
    children: [{
        path: "goods-list",
        component: GoodsList,
        meta: "商品列表"
      }, {
        path: "category-list",
        component: CategoryList,
        meta: "栏目列表"
      },
      {
        path: "goods-add",
        component: GoodsAdd,
        meta: "添加商品"
      },
      {
        path: "goods-edit/:id",
        component: GoodsEdit,
        meta: "商品编辑"
      },
      {
        path: "category-add",
        component: CategoryAdd,
        meta: "新增栏目"
      },
      {
        path:"category-edit/:id",
        component:CategoryEdit,
        meta:"编辑栏目"
      }
    ]
  }
]

// 创建路由对象
const router = new VueRouter({
  routes
})

// 给axios给次请求自动加上域名
axios.defaults.baseURL = 'http://localhost:8899';

// 给vue构造函数的原型链添加$axios
Vue.prototype.$axios = axios;

new Vue({
  // 挂载到根实例
  router,
  render: h => h(App),
  // 绑定store到组件，组件可以使用this.$store访问
  store,
}).$mount('#app')