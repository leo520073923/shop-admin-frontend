<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
    <!-- 头部控制菜单栏的收起展开的图标 -->
    <i class="el-icon-back" @click="handleToggle"></i>
    <div>{{username}} {{identity}}</div>
    <!-- javascript:void(0)让a链接点击不做任何操作，无返回 -->
    <a href="javascript:void(0)" @click="handleLogout">退出</a>
  </el-row>
</template>

<script>

import{mapState} from "vuex"

export default {
  methods: {
    handleToggle: function() {
      // 触发菜单展开事件
      this.$emit("onChange");
    },
    // 处理退出
    handleLogout() {
      this.$store.dispatch("user/logout").then(res => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    // mapState可以订阅store中数据,第一个参数user是命令空间
    ...mapState("user", {
      username: "username",
      identity: "identity"
    })
  }
};
</script>

<style scoped>
.header {
  height: 60px;
}

.el-icon-back {
  cursor: pointer;
}
</style>
