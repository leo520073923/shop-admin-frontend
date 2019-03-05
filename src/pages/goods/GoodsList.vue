<template>
  <div>
    <div class="form-control">
      <!-- 新增，搜索功能区域 -->
    </div>
    <!-- 商品列表表格区域 -->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" prop="title">
        <div class="goods-info">
          <div class="goods-img">
            <img src="https://www.baidu.com/img/bd_logo1.png?where=super">
          </div>
          <p style="7display: inline-block;">商品标题</p>
        </div>
      </el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="请输入内容"/>
          <el-button class="search" type="primary" icon="el-icon-search"></el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: 200,
          type: "王小虎",
          price: 20
        },
        {
          title: "2016-05-04",
          type: "王小虎",
          price: 20
        },
        {
          title: "2016-05-01",
          type: "王小虎",
          price: 20
        },
        {
          title: "2016-05-03",
          type: "王小虎",
          price: 20
        }
      ],
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped lang="scss">
.form-control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.el-table {
  margin-bottom: 20px;
}

.goods-info {
  display: flex;
  align-items: center;

  .goods-img {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 10px;
    img {
      display: block;
      height: 64px;
    }
  }
}
</style>