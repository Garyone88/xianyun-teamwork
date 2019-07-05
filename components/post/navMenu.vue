<template>
  <div class="navMenu">
      <div v-for="(item,index) in cities"
      :key="index">
        <el-row type="flex">
            <el-col :span="12"><div class="navTitle" @mouseover="handleMouseover(index)" @mouseout="handleMouseout(index)">{{item.type}}<i class="el-icon-arrow-right"></i>
            
        </div></el-col>
        <el-col :span="12">
            <ul v-for="(item2,index2) in item.children" :key="index2">
                <li v-if="index == current">
                    <span>{{index2+1}} {{item2.city}}</span>
                    <i>{{item2.desc}}</i>
                </li>
            </ul>
        </el-col>
        </el-row>
        
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [],
      current:null
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
      //鼠标移入
    handleMouseover(index){
        this.current = index;
    },
    //鼠标移除
    handleMouseout(index){
        this.current = null;
    }
}
};
</script>

<style lang="less" scoped>
    .navMenu {
        width: 560px;
        height: 164px;
        padding: 20px 40px;
        .navTitle {
            border: 1px solid #ccc;
            height: 34px;
            line-height: 34px;
            padding: 0 20px;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                color: orangered;
            }
            i {
                float: right;
                height: 34px;
                line-height: 34px;
                font-size: 20px;
                color: #666;
            }
        }
        ul {
            list-style: none;
            li {
                background-color: #eee;
                padding: 5px;
                height: 34px;
                span {
                    color: orangered;
                    font-size: 14px;
                    font-weight: 600;
                }
                i {
                    color: #666;
                    font-size: 12px;
                    font-style: normal;
                }
            }
        }
    }
</style>
