<template>
  <div class="index">
    <h2>商品分类管理
      <el-button @click="dialogFormVisible = true" type="button" plain style="margin-left: 30px">添加类别</el-button>
    </h2>
    <el-dialog title="添加类别" :visible.sync="dialogFormVisible" :modal=false>
      <el-form >
        <el-form-item label="类别名称" :label-width="formLabelWidth">
          <el-input v-model="addCategoryName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCategory">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="类别id"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cid }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="类别名称"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cname"></el-input>
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
    name: 'category_index',
    data() {
      return {
        formLabelWidth: '120px',
        tableData: [],
        dialogFormVisible: false,
        addCategoryName: ''

      }
    },
    methods: {
      handleEdit(index, row) {
        var url = this.websiteUrl + '/demo1/category/update';
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
      handleInsertCategory(index, row) {
        // var url = this.websiteUrl + '/demo1/admin/auth';
        // this.axios.get(url, {
        //   params: {
        //     uid: row.uid,
        //     character: 'admin'
        //   }
        // }).then((res) => {
        //   console.log(res.data.msg);
        // })
        //   .catch((err) => {
        //     console.log(err);
        //   })
      },
      handleAddCategory() {
        var url = this.websiteUrl + '/demo1/category/add';
        this.axios.get(url, {
          params: {
            cname: this.addCategoryName
          }
        }).then((res) => {
          console.log(res.data.msg);
          this.initTableData();
          this.dialogFormVisible=false;
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        })
          .catch((err) => {
            console.log(err);
          })
      },
      initTableData() {
        var url = this.websiteUrl + '/demo1/category/';
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
    }
  };
</script>

<style scoped>

</style>
