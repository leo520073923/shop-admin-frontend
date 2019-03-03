<template>
  <div class="admin-container">
    <el-container>
      <!-- 左侧菜单栏 -->
      <app-aside width="200px">Aside</app-aside>

      <!-- 右边内容区域 -->
      <el-container>
        <!-- 头部 -->
        <el-header>Header</el-header>
        <!-- 主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/Aside';

export default {
    name:"admin-index",
    //注册组件,注意组件名不要和html的标签名重复  
    components: {
        "app-aside": Aside
    }
};
</script>

<style>
/* container外层的div */
.admin-container{
    position: fixed;
    width:100%;
    top:0;
    bottom:0;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
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
</style>
