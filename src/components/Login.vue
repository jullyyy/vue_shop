<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区 :model代表数据绑定 :rules="rules"指定属性绑定对象-->
      <!-- ref="loginFormRef"为表单添加引用 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        class="login_form"
      >
        <!-- 用户名 prop="xxx"指定验证规则-->
        <el-form-item prop="username">
          <!-- 这里 prefix-icon 中填写的是iconfont前缀和图标名（iconfont网站中对应user
.icon-user，这里组合只取后面的icon-user）的组合 -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 设置input的type="password"，使密码不可见-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 这是表单的校验对象 其中每个属性都是一个校验规则
      rules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 重置操作(重置为初始值，而不是空值)
    resetLoginForm() {
      // console.log(this.$refs)  this.$refs.loginFormRef就是表单的引用，可以当表单来使用
      this.$refs.loginFormRef.resetFields() //调用Element-ui中的resetFields()进行重置
    },
    // 登录验证
    login() {
      // 箭头函数返回结果到valid中，因为只有valid一个形参(valid也是函数返回的布尔值)，所以一般不写(valid)，直接写valid
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return
        // valid为true才发起请求
        // {data:res}解构
        const { data: res } = await this.$http.post('login', this.loginForm)
        // 返回结果是promise，可以在上一语句前面加await，但await只能被用在async修饰的方法中，所以要在valid前面加async
        // console.log(res);
        // 状态码是200就表明登录成功了
        if (res.meta.status != 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')

        // 1.将登陆成功后的token，保存到客户端的sessionStorage中
        // 1.1 项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
        // 1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push('/home')
      })
    },
  },
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px#eee;

  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  //默认login_form为box-content
  box-sizing: border-box;
}
.btns {
  // 弹性布局
  display: flex;
  justify-content: flex-end;
}
</style>