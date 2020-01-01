<template>
  <div class="index">
    <h2>商品信息管理</h2>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="商品id"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="商品名称"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="商品预览图"
        width="180">
        <template slot-scope="scope">
          <el-image :src="scope.row.pic"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="商品价格"
        width="180">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.price"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="商品分类"
        width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.category">
            <el-option
              v-for="item in categoryList"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
      label="商品简介"
      width="180">
      <template slot-scope="scope">
        <el-input v-model.number="scope.row.desc"></el-input>
      </template>
    </el-table-column>
      <el-table-column
        label="商品详情"
        width="180">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.detail"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="商品状态"
        width="180">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.condition"></el-input>
        </template>
      </el-table-column>

      <el-table-column
        label="所属学校"
        width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.school">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">保存
          </el-button>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: 'goods_index',
    data() {
      return {
        schoolList:[],
        categoryList:[],
        formLabelWidth: '120px',
        tableData: [],
        dialogFormVisible: false,
        addSchoolName: ''

      }
    },
    methods: {
      initCategoryList(){
        var url = this.websiteUrl + '/demo1/category/';
        var that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code === 200) {
            that.categoryList = response.data.data;
          } else {
            console.log(response.data.message);
          }
        }).catch(function (resp) {
          console.log(resp);
        });
      },
      initSchoolList(){
        var url = this.websiteUrl + '/demo1/school/';
        var that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code === 200) {
            that.schoolList = response.data.data;
          } else {
            console.log(response.data.message);
          }
        }).catch(function (resp) {
          console.log(resp);
        });
      },
      handleEdit(index, row) {
        var url = this.websiteUrl + '/demo1/goods/update';
        this.axios.put(url, row).then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        })
          .catch((err) => {
            console.log(err);
          })
      },

      initTableData() {
        var url = this.websiteUrl + '/demo1/goods/all';
        var that = this;
        this.axios.get(url).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            that.tableData = response.data.data;
          } else {
            console.log(response.data.message);
          }
        }).catch(function (resp) {
          console.log(resp);
        });
      },


    },
    mounted() {
      this.initTableData();
      this.initCategoryList();
      this.initSchoolList();
    }
  };
</script>

<style scoped>

</style>
