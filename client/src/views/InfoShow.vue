<template>
  <div class="infoshow bg">
    <div class="container mask">
      <div class="content">
        <img :src="user.avatar" class="avatar">
        <div class="user-item">
          <span>用户名：</span>
          <span>{{user.name}}</span>
        </div>
        <div class="user-item">
          <span>用户身份：</span>
          <span>{{user.identity === 'manager' ? '管理员' : '员工'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoShow',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  padding-top: 60px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user-item {
  margin-top: 30px;
}
</style>
