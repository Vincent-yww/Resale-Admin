<template>
  <div class="index">
    <h2>学校信息管理
      <el-button @click="dialogFormVisible = true" type="button" plain style="margin-left: 30px">添加学校</el-button>
    </h2>
    <el-dialog title="添加学校" :visible.sync="dialogFormVisible" :modal=false>
      <el-form >
        <el-form-item label="学校名称" :label-width="formLabelWidth">
          <el-input v-model="addSchoolName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSchool">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="学校id"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="学校名称"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
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
    name: 'school_index',
    data() {
      return {
        formLabelWidth: '120px',
        tableData: [],
        dialogFormVisible: false,
        addSchoolName: ''

      }
    },
    methods: {
      handleEdit(index, row) {
        var url = this.websiteUrl + '/demo1/school/update';
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
      handleAddSchool() {
        var url = this.websiteUrl + '/demo1/school/add';
        this.axios.get(url, {
          params: {
            name: this.addSchoolName
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
        var url = this.websiteUrl + '/demo1/school/';
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
