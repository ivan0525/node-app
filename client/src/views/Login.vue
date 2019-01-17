<template>
  <div class="login bg">
    <div class="form-container">
      <div class="manage-tip">
        <span class="title">在线管理系统</span>
        <el-form
          class="form-panel"
          :model="loginUser"
          ref="loginForm"
          :rules="rules"
          status-icon
          label-width="80px"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="login-btn-container">
            <el-button type="primary" class="submit-btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <el-form-item class="no-acount">
            <span>还没有账号？现在</span>
            <a class="goto-reg" href="/register">注册</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在6~30之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/users/login', this.loginUser)
            .then(res => {
              // console.log(res);
              // 获取token
              const { token } = res.data;
              // 存储token到localstorage
              localStorage.setItem('elToken', token);

              // 解析token
              const decode = jwt_decode(token);

              // token存储到vuex中

              this.$store.dispatch('setAuthenticated', !this.isEmpty(decode));
              this.$store.dispatch('setUser', decode);

              this.$message({
                message: '登录成功',
                type: 'success'
              });
              // 请求成功跳转页面
              this.$router.push('/index');
            });

        }
      })
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
}
.login-btn-container /deep/ .el-form-item__content,
.no-acount /deep/ .el-form-item__content {
  margin-left: 0 !important;
}
.no-acount {
  color: #666;
}
.no-acount .goto-reg {
  color: #409eff;
}
.no-acount .goto-reg:hover {
  color: rgb(245, 94, 94);
}
</style>
