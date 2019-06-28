<template>
  <div class="ruleForm">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-link type="primary" class="forgotPassword">忘记密码</el-link>
      <el-button type="primary" class="login" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "blur" }
        ],
      },
    }
  },
  methods:{
      handleLogin(){
           this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch("user/login",this.ruleForm).then(v=>{
                this.$message.success("登录成功，正在跳转...");
                setTimeout(()=>{
                    this.$router.push("/")
                },3000)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
};
</script>

<style lang="less" scoped>
.demo-ruleForm {
  padding: 10px;
  .forgotPassword {
    font-size: 12px;
    float: right;
  }
  .login {
    width: 100%;
  }
}
</style>

