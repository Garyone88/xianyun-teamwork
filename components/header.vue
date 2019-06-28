<template>
  <div class="header">
    <!-- 中间的内容 -->
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="/images/logo.jpg" alt>
        </nuxt-link>
      </div>

      <!-- 菜单 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录状态 -->
      <el-row>
        <!-- 下拉菜单 -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <span class="el-dropdown-link">
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt>

            <span>{{$store.state.user.userInfo.user.nickname}}</span>

            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>
              <span @click="handleLogout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div v-else class="login">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
    handleLogout(){
      this.$store.commit("user/clearUserInfo");
      this.$message.warning("退出成功，正在跳转...");
                setTimeout(()=>{
                    this.$router.push("/user/login")
                },3000)
    }
  }
  // mounted(){
  //   console.log(this.$store.state.user.userInfo.user.nickname);
  // }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px 2px #ddd;
  .main {
    width: 1000px;
    height: 60px;
    margin: 0 auto;
    .logo {
      margin-top: 9px;
      width: 156px;
      height: 43px;
      img {
        width: 100%;
      }
    }
    .navs {
      flex: 1;
      height: 60px;
      line-height: 60px;
      a {
        display: block;
        box-sizing: border-box;
        padding: 0 20px;
        height: 100%;
        &:hover {
          border-bottom: 5px solid #409eff;
          color: #409eff;
        }
      }
      .nuxt-link-exact-active {
        background-color: #409eff;
        color: #fff;
        &:hover {
          border-bottom: none;
          color: #fff;
        }
      }
    }
    .el-dropdown-link {
      line-height: 60px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid transparent;
        vertical-align: middle;
        &:hover {
          border: 1px solid #409eff;
        }
      }
    }
    .login {
      line-height: 60px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>

