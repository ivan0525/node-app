<template>
  <div class="login">
    <el-form v-model="loginUser" ref="loginUser">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginUser.pasword" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="identity">
        <el-select v-model="loginUser.identity" placeholder="请选择身份">
          <el-option label="管理员" value="manager"></el-option>
          <el-option label="员工" value="employee"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: {
        email: '',
        password: '',
        identity: ''
      }
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
</style>
