<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属类别">
        <el-cascader :options="data" :show-all-levels="false" @change="handleChange"></el-cascader>
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
      data: []
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
        url: `/admin/category/add/goods`,
        data: this.form,
        // 处理跨域
        withCredentials: true
      }).then(res => {
        console.log(res)
        // const { message } = res.data;
        // this.$message({
        //   message,
        //   type: "success"
        // });
        // setTimeout(() => {
        //   this.$router.back();
        // }, 1000);
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      console.log(res);
      const { message } = res.data;

      //最终的结果的数组
      let arr = [];

      //递归函数
      function loop(arr, item) {
        arr.forEach(v => {
          //最重要的判断，判断item的id是否和父级的category_id相等，
          // 如果相等的话就把item加入到当前分类下children
          if (v.category_id == item.parent_id) {
            //判断当前的分类是否有children属性
            if (!v.children) {
              //没有的话初始化为空数组
              v.children = [];
            }

            //加入到当前分类下children
            v.children.push({
              ...item,
              value: item.category_id,
              label: item.title
            });
            return;
          }

          // 如果不符合上面的条件，继续递归判断当前分类的子元素
          if (v.children) {
            loop(v.children, item);
          }
        });
      }

      message.forEach(v => {
        // 如果是顶级的分类直接加入到arr
        if (v.parent_id === 0) {
          arr.push({
            ...v,
            value: v.category_id,
            label: v.title
          });
        } else {
          //如果不是顶级分类，通过递归函数去查找父级分类
          loop(arr, v);
        }
      });
      this.data = arr;
    });
  }
};
</script>

<style>
</style>
