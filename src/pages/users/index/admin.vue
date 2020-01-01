<template>
  <div class="index">
    <h2>管理员用户管理</h2>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="用户id"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.uid }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.username"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="密码"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.password"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="电话号码"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.phone"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.email"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="学校"
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
          <el-button
            size="mini"
            type="danger" plain
            @click="handleUpdateAuth(scope.$index, scope.row)">取消管理员
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: 'admin',
    data() {
      return {
        tableData: [],
        schoolList: [],

      }
    },
    methods: {
      handleEdit(index, row) {
        var url = this.websiteUrl + '/demo1/admin/update';
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
      handleUpdateAuth(index, row) {
        var url = this.websiteUrl + '/demo1/admin/auth';
        this.axios.get(url, {
          params: {
            uid: row.uid,
            character: 'normal'
          }
        }).then((res) => {
          console.log(res.data.msg);
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
        var url = this.websiteUrl + '/demo1/admin/role?role=admin';
        var that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code === 200) {
            that.tableData = response.data.data;
          } else {
            console.log(response.data.message);
          }
        }).catch(function (resp) {
          console.log(resp);
        });
      },
      initSchoolList() {
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
      }
    },
    mounted() {
      this.initTableData();
      this.initSchoolList();
    }
  };
</script>

<style scoped>

</style>
