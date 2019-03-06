<template>
  <div>
    <!-- 顶部的工具栏 -->
    <el-row type="flex" justify="space-between" align="middle">
      <div class="mb">
        <el-button @click="handleToGoodsAdd">新增</el-button>
        <el-button @click="handleDelete(idsStr)">删除</el-button>
      </div>

      <!-- 搜索框 -->
      <div class="mb">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 商品列表表格区域 -->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" prop="title" width="280">
        <!-- 标题的自定义模板 -->
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-img">
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="categoryname" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.categoryname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price" width="180" align="center">
        <!-- 自定义模板, slot-scope属性可以获取当前每一行数据，数据是一个对象，scoped.row可获取该对象-->
        <template slot-scope="scope">
          <span>{{scope.row.market_price | tofixed}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作" width=auto>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- size-change: 切换页面数据显示条数的时候触发 -->
    <!-- current-change： 切换页面时候触发 -->
    <!-- current-page 代表当前页 -->
    <!-- total: 数据的总条数 -->
    <div class="block mt">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有商品的数据
      tableData: [],
      //当前的页面
      pageIndex: 1,
      //当前显示的页数
      pageSize: 8,
      //搜索条件
      searchValue: "",
      //数据总条数
      totalCount: 0,
      search: ""
    };
  },
  methods: {
    //请求商品的类别数据
    getList() {
      this.$axios
        .get(
          `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
        )
        .then(res => {
          //获取返回的数据
          const { data } = res;
          //表格的数据
          this.tableData = data.message;
          //修改总条数
          this.totalCount = data.totalcount;
          console.log(res);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },


    //删除商品是触发
    handleDelete(ids) {
      //删除的操作
      this.$axios
        .get(`http://localhost:8899/admin/goods/del/${ids}`)
        .then(res => {
          const { message, status } = res.data;

          //删除成功
          if (status == 0) {
            this.$message({
              message: message,
              // type: "success"
            });
            // 重新请求数据
            this.getList();
            console.log(res)
          }
        });
    },
    //当表格选择时触发
    handleSelectionChange(data) {
      //  data是个数组，当前选中的商品
      const ids = data.map(v => {
        return v.id;
      });

      //拼接选中的商品的id
      const idsStr = ids.join(",");

      //保存到data里面
      this.idsStr = idsStr;
    },

    //跳转到新增商品
    handleToGoodsAdd() {
      this.$router.push("/admin/goods-add");
    },
    //切换显示条数的时候触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.getList();
    },
    // 切换页面时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getList();
    },
    //点击搜索时触发
    handleSearch() {
      // 把页面重置为1
      this.pageIndex = 1;
      // 重新请求数据
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  // 过滤器
  filters: {
    tofixed: function(data) {
      return Number(data).toFixed(2);
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

.goods-img {
  width: 64px;
  height: 64px;
  display: block;
  margin-right: 10px;
  flex-shrink: 0;
}
</style>