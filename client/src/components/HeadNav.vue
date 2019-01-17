<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/solophone.jpg" class="logo">

        <router-link to="/index">
          <span class="title">在线管理系统</span>
        </router-link>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <router-link to="/infoshow">
            <img :src="user.avatar" class="avatar">
          </router-link>
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'HeadNav',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo(commandItem) {
      switch (commandItem) {
        case 'info':
          this.showInfoList();
          break;
        case 'logout':
          this.logout();
          break;
      }
    },
    showInfoList() {
      this.$router.push('/infoshow');
    },
    logout() {
      // 清除token
      localStorage.removeItem('elToken');
      // 设置vuex store
      this.$store.dispatch('clearCurrentState');
      this.$router.push('/login');
    }
  },
}
</script>

<style scoped>
.head-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  min-width: 1000px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border: 1px solid #1f2d3d;
}
.logo-container {
  width: 50%;
  height: 48px;
  line-height: 48px;
  padding-left: 10px;
}
.logo {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  vertical-align: middle;
  border-radius: 50%;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
  color: #fff;
}
.user {
  width: 50%;
  line-height: 48px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding-left: 10px;
  text-align: center;
}
.name {
  line-height: 20px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
