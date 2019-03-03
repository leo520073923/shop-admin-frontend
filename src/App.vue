<template>
  <div id="app">
    <app-login></app-login>
    <!-- 调用Element UI组件 -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Login from "./components/Login.vue";

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
  components: {
    "app-login": Login
  },
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


