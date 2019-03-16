<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属类别">
        <el-cascader
          :options="data"
          v-model="defaultId"
          :show-all-levels="false"
          @change="handleChange"
        ></el-cascader>
        当前分类的id为：{{form.category_id}}
      </el-form-item>

      <el-form-item label="排序数字">
        <el-input v-model="form.sort_id" placeholder="输入的排序值必须大于选中的类别"></el-input>
      </el-form-item>

      <el-form-item label="类别名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="类别级别">
        <el-input v-model="form.class_layer"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        category_id: "",
        sort_id: "",
        title: "",
        class_layer: ""
      },
      // 级联选择器的数据
      data: [],
      // 默认选择的所属类别id
      defaultId: []
    };
  },
  methods: {
    handleChange(data) {
      // console.log(data)
      // 选中分类的id数据
      this.form.category_id = data[data.length - 1];
      // console.log(this.form.category_id)
    },

    onSubmit() {
      this.$axios({
        method: "POST",
        url: `/admin/category/edit/${this.form.id}`,
        data: this.form,
        // 处理跨域
        withCredentials: true
      }).then(res => {
        console.log(res);
        const {status,message}=res.data;
        if(status===0){
            this.$message({
                type:"success",
                message
            });
            this.$router.back();
        }
      });
    }
  },
  mounted() {
    //请求当前的分类数据
    const { id } = this.$route.params;

    this.$axios({
      url: `/admin/category/getcategorymodel/${id}`
    }).then(res => {
      //   console.log(res);
      const { message, status } = res.data;
      if (status == 0) {
        this.defaultId.push(message[0].channel_id), 
        this.form = message[0]
      }
    });
  }
};
</script>


<style>
</style>
