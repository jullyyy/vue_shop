<template>
  <div>
    // 退出
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出 基于token，只需销毁本地token，这样后续请求就没有能携带的token，必须重新登录生成新token才行
    logout() {
      window.sessionStorage.clear()
      // 编程式导航 重定向到login页面
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped></style>
