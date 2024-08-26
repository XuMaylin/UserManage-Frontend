<template>
  <div class="user-index">
    <div class="search">
      <el-input placeholder="请输入用户名" v-model="searchContent" class="searchInput" @keyup.enter.native="handleUserSearch">
      </el-input>
      <el-button class="search-button" @click="handleUserSearch" icon="el-icon-search">用户名搜索</el-button>
    </div>
    <div class="btns">
      <el-button class="btn" type="primary" @click="addUser">添加用户</el-button>
      <el-button class="btn" type="danger" @click="deleteUsers">批量删除</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" @selection-change="handleSelectionChange" stripe border
      :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <img src="@/assets/u172.png" class="option-icon" title="删除" @click="deleteUser(scope.row)"/>
            <img src="@/assets/u180.png" class="option-icon" title="编辑" @click="editUser(scope.row)" style="margin-left: 8px;"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-area">
      <el-pagination class="page"
        :current-page.sync="pageNum" :total="total" :page-size="pageSize"
        layout="total, prev, pager, next"></el-pagination>
    </div>
    <el-dialog :visible.sync="addDialog" width="40%" @close="addDialog=false">
      <el-form :model="userForm" label-width="100px" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="addDialog=false" class="btn" style="margin-right: 20px;">取消</el-button>
        <el-button @click="handleConfirm" type="primary" class="btn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserIndex',
  props: {
  },
  data() {
    return {
      tableData: [],
      searchContent: '',
      pageSize: 8,
      pageNum: 1,
      total: 10,
      selections: [],
      addDialog: false,
      isAdd: true,
      userForm: {
        userId: null,
        userName: '',
        password: '',
        createTime: '',
        updateTime: ''
      },
      rules: {
        userName: [{required: true, message: '用户名不能为空'}],
        password: [{required: true, message: '密码不能为空'}]
      }
    }
  },
  methods: {
    getTableData() {
      let url = 'http://localhost:8082/user/getUserSearchResult'
      this.$http({
        method: 'get',
        url: url,
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          searchContent: this.searchContent
        }
      }).then(res => {
        if(res.status === 200) {
          this.tableData = res.data.users
          this.total = res.data.sum
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    handleUserSearch() {
      this.getTableData()
    },
    deleteUser(user) {
      let list = []
      list.push(user.userId)
      this.$confirm("确认删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.handleDelete(list)
      })
    },
    editUser(user) {
      this.userForm = {
        userId: user.userId,
        userName: user.userName,
        password: user.password,
        createTime: user.createTime,
        updateTime: user.updateTime
      }
      this.isAdd = false
      this.addDialog = true
    },
    handleSelectionChange (val) {
      this.selections = val
    },
    addUser() {
      this.userForm = {
        userId: null,
        userName: '',
        password: '',
        createTime: '',
        updateTime: ''
      }
      this.isAdd = true
      this.addDialog = true
    },
    deleteUsers() {
      let list = []
      for(let i in this.selections) {
        list.push(this.selections[i].userId)
      }
      if(list.length >= 0) {
        this.$confirm("确认删除所选？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.handleDelete(list)
        })
      } else {
        this.$message.warning("请先选择要删除的用户！")
      }
    },
    handleDelete(idList) {
      let url = 'http://localhost:8082/user/deleteUser'
      this.$http.delete(url, {data: idList}).then(res => {
        if(res.data) {
          this.$message.success('删除成功')
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    handleConfirm(){
      if(this.userForm.userName.length <= 0 || this.userForm.userName.length <= 0){
        this.$message.warning('输入不能为空')
        return
      }
      let url = '',title = ''
      if(this.isAdd) {
        url = 'http://localhost:8082/user/addUser'
        title = '添加用户'
      } else {
        url = 'http://localhost:8082/user/updateUser'
        title = '更新用户'
      }
      this.$http.post(url, this.userForm,
      {headers: {'Content-Type': 'application/json;charset=utf-8', dataType: 'json'}}).then(res => {
        if(res.status === 200) {
          this.$message.success(title+'成功！')
        } else {
          this.$message.error(title+'失败！')
        }
        this.getTableData()
        this.addDialog = false
      })
    }
  },
  mounted() {
    this.getTableData()
  },
  watch: {
    pageNum() {
      this.getTableData()
    }
  }
}
</script>

<style scoped>
.search{
  display: inline-flex;
  float: left;
  margin-left: 10%;
  margin-bottom: 20px;
}
.searchInput{
  width: 250px;
}
.search-button{
  margin-left: 20px;
}
.table{
  width: 80%;
  margin: 0 auto;
}
.page-area{
  display: inline-flex;
}
.btns{
  float: right;
  margin-right: 10%;
}
.btn{
  width: 150px;
}
</style>
