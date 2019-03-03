<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- 调用Element UI组件 -->
    <div class="source">
      <h4>登录</h4>
      <el-form label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="uid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <label for>{{uid}}</label> -->
        <el-form-item label="密码">
          <el-input type="password" v-model="pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUidAndPass">提交</el-button>
          <el-button @click="clearAll">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      uid: "",
      pass: ""
    };
  },
  methods: {
    getUidAndPass: function() {
      console.log(this.uid + this.pass);
    },
    clearAll: function() {
      (this.uid = ""), (this.pass = "");
    }
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.source {
  width: 500px;
  margin: 0 auto;
  /* text-align: center; */
}
h4 {
  color: dodgerblue;
}
.el-form {
  text-align: center;
}
.el-form-item__label {
  width: 50px !important;
  text-align: left;
}
.el-form-item__content {
  margin-left: 50px !important;
}
.el-button {
  margin-right: 40px !important;
}
</style>
