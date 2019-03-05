<template>
  <div class="admin-container">
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="auto">
        <!-- 预留存放logo的位置 -->
        <div class="logo"></div>

        <!-- 菜单栏 -->
        <app-aside :isCollapse="isCollapse"></app-aside>
      </el-aside>

      <!-- 右边内容区域 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <app-header @onChange="changeCollapse"></app-header>
        </el-header>
        <!-- 面包屑 -->
        <app-breadcrumb></app-breadcrumb>
        <!-- 主体 -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
import Breadcrumb from "../components/Breadcrumb";

export default {
  name: "admin-index",
  data() {
    return {
      isCollapse: false
    };
  },
  //注册组件,注意组件名不要和html的标签名重复
  components: {
    "app-aside": Aside,
    "app-header": Header,
    "app-breadcrumb": Breadcrumb
  },
  methods: {
    //修改菜单栏的手气展开
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style>
/* container外层的div */
.admin-container {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  margin-bottom: 40px;
  /*继承admin-container的高度*/
  height: 100%;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  height: 100%;
}
</style>
