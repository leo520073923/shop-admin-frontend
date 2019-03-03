<template>
  <div id="app">
    <router-view></router-view>
    <!-- 调用Element UI组件 -->
  </div>
</template>

<script>
// import Login from "./components/Login.vue";

export default {

  // components: {
  //   "app-login": Login
  // },
  mounted() {
    //请求数据
    // this.$axios
    //   .get("http://127.0.0.1:8899/admin/account/getlist?pageIndex=1&pageSize=5")
    //   .then(res => {
    //     console.log(res.data);
    //   });
  }
};
</script>

<style>

*{
  margin:0;
  padding:0;
}

</style>


