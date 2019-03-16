<template>
  <div class="login-form">
    <div class="login-form-header">登录</div>
    <el-form :model="formData" status-icon label-width="60px">
      <!-- el-form-item是e-form的子组件，不能放到el-form的外部 -->
      <el-form-item label="账号">
        <el-input v-model="formData.uname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.upwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button-list">
        <el-button type="primary" @click="submitForm('formData')">提交</el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

// import { mapActions } from "vuex";

export default {
  data() {
    return {
      formData: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 提交到接口
      // this.$axios({
      //   url: "admin/account/login",
      //   method: "POST",
      //   data: this.formData,
      //   // 处理跨域
      //   withCredentials: true
      // }).then(res => {
      //   const { status, message } = res.data;

      //   // 如果登录错误
      //   if (status == 1) {
      //     this.$message.error(message);
      //   } else {
      //     // 登录成功返回上一页
      //     this.$router.back();
      //   }
      // });

      this.$store.dispatch("user/login",this.formData).then(res=>{
        this.$router.back();
      })
    },
    resetForm(formName) {
      // 重置表单
      this.ruleForm2 = {
        username: "",
        password: ""
      };
    }
  }
};
</script>
<style>
.login-form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -120px 0 0 -250px;
}

.login-form-header {
  color: #66b1ff;
  text-align: center;
  line-height: 2;
  margin-bottom: 20px;
  padding-left: 60px;
}

.button-list {
  text-align: center;
}
</style>
