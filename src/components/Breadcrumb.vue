<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/goods-list' }">商品列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
};
</script>

<style>
</style>
