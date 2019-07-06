<template>
  <div>
    <el-row class="tac">
      <el-col :span="8">
        <el-menu        
          class="el-menu-vertical-demo"
          :collapse="true"
          @open="handleOpen"
          @close="handleClose"
          v-for="(item,index) in cities"
          :key="index"       
        >
          <el-submenu index="index" active-text-color="#FF0000">
            <template slot="title">
              <el-row type="flex" justify="space-between" align="middle">
                  {{item.type}}<i class="el-icon-arrow-right"></i>
              </el-row>
            </template>        
              <el-menu-item index="index-index2" v-for="(item2,index2) in item.children" :key="index2">
                  <span>{{index2+1}} {{item2.city}}</span>
                    <i>{{item2.desc}}</i>
                </el-menu-item>
          </el-submenu>
         
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
 data() {
    return {
      cities: [],
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities",
      methods: "GET"
    }).then(res => {
      const { data } = res.data;
      this.cities = data;
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo {
        width: 264px;
    }
</style>
