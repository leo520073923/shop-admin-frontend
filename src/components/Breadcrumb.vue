<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:item.src}" 
      v-for="(item, index) in routeInfo" 
      :key="index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  // data(){
  //   return{
  //     routeInfo:""
  //   }
  // },
  // mounted() {
  //   console.log(this.$route);
  // },
  computed: {
    // 监听路由的变化，生出鞥一个数组用于渲染面包屑信息
    routeInfo: function() {
      //获取多个路由记录
      const matched = this.$route.matched;
      //重新生产一个循坏的数据格式
      const newArr = matched.map(v => {
        return {
          src: v.path,
          title: v.meta
        };
      })
      return newArr;
    }
  }
};
</script>

<style scoped>
.breadcrumb {
  padding-bottom: 20px;
  border-bottom: 1px #999 solid;
  margin-bottom: 20px;
}
</style>
