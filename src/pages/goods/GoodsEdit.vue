
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
      <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">
          <el-option-group
            v-for="(item, index) in categorys"
            :key="index"
            v-if="item.parent_id===0"
            :label="item.title"
          >
            <el-option
              v-for="(subItem,subIndex) in categorys"
              v-if="subItem.parent_id==item.category_id"
              :key="subIndex"
              :label="`${subItem.category_id} ${subItem.title}`"
              :value="subItem.category_id"
            ></el-option>
          </el-option-group>
          <!-- 
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <!-- <el-form-item label="是否显示">
        <el-switch v-model="form.is_slide"></el-switch>
      </el-form-item>-->
      <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
      </el-form-item>
      <el-form-item label="内容标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="sub_title">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 图片上传 -->
      <el-form-item label="商品货号" prop="goods_no">
        <el-input v-model="form.goods_no"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="stock_quantity">
        <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>

      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>
      <el-form-item label="销售价格" prop="sell_price">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>

      <el-form-item label="图片相册">
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleFileList"
          :file-list="form.fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 图片预览的弹窗 -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>

      <el-form-item label="内容摘要" prop="zhaiyao">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
      </el-form-item>

      <el-form-item label="内容描述" prop="content" class="editor">
        <quillEditor v-model="form.content"></quillEditor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        category_id: "", // 类别id
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao: "",
        content: "",

        // 封面图片
        imgList: [],
        // 多张图片
        fileList: [],
        is_slide: false
      },
      // 头像图片
      imageUrl: "",

      // 图片墙的预览图片链接
      dialogImageUrl: "",
      // 是否预览图片
      dialogVisible: false,
      // 类别数据
      categorys: [],
      // 商品id
      id: ""
    };
  },
  // 祖册组件
  components: {
    quillEditor
  },

  methods: {
    //提交表单数据
    onSubmit() {
      this.$axios({
        method: "POST",
        url: `/admin/goods/edit/${this.id}`,
        data: this.form,
        // 处理跨域
        withCredentials: true
      }).then(res => {
        const { message, status } = res.data;

        if (status == 0) {
          this.$message({
            message: message,
            type: "success"
          });

          setTimeout(() => {
            this.$router.replace("/admin/goods-list");
          }, 1000);
        }
      });
    },

    //退回上一页
    resetForm(form) {
      this.$router.back();
    },

    // 上传封面图片成功的回调函数
    handleAvatarSuccess(res, file) {
      // 头像预览，把图片解析成base64字符串
      this.imageUrl = window.URL.createObjectURL(file.raw);

      this.form.imgList = [res];
    },
    // 上传图片相册的成功回调函数
    handleFileList(res) {
      this.form.fileList.push(res);
    },

    // 上传封面图片成功的回调函数
    // handleAvatarSuccess(res, file) {
    //   // 头像预览，把图片解析成base64字符串
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   this.form.imgList = [res];
    // },

    // 判断图片是否大于2m， 如果是的话不上传
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 点击预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //移出选中的图片
    handleRemove(file, fileList) {
      if (fileList.length === 0) {
        this.$message({
          type: "warning",
          message: "至少保留一张图片"
        });
        return;
      }
      // 在编辑时候如果只有一张图片后台没法删除,至少保留一张图片
      this.form.fileList = fileList;
    }
  },
  mounted() {
    // 请求分类的数据
    this.$axios({
      method: "GET",
      url: `admin/category/getlist/goods`
    }).then(res => {
        // console.log(res);
      const { message } = res.data;

      this.categorys = message;
    });

    //获取动态路由id
    const { id } = this.$route.params;

    //保存到data
    this.id = id;

    //获取id来渲染出需要编辑的数据
    this.$axios({
      url: `admin/goods/getgoodsmodel/${id}`,
      // 处理跨域
      withCredentials: true
    }).then(res => {
      const { message } = res.data;
      //初始化表单的值
      this.form = message;

      //预览图片
      this.imageUrl = message.imgList[0].url;
    //   this.form.fileList=this.form.imgList[0].url;
    //   console.log(this.form);
        this.form.fileList=message.fileList.map(v=>{
            console.log(v)
            return{
                ...v,
                // 覆盖 v 对象里面的url
                url:`http://localhost:8899` + v.shorturl
            }
        })
    });
  }
};
</script>

<style>
.el-form-item__content {
  text-align: left;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/*   清楚富文本编辑的line-height */
.editor .el-form-item__content {
  line-height: unset;
}
</style>
