<template>
    <div class="main">
        <!-- 面包屑 -->
        <div class="header">酒店 > 南京市酒店预订</div>

        <!-- 搜索工具栏 -->
        <el-row class="tool" type="flex">

            <!-- 地址選擇 -->
            <el-autocomplete
                class="inline-input"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
            ></el-autocomplete>

            <!-- 日期選擇 -->
            <el-date-picker
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>

            <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-user"
              v-model="input">
            </el-input>

            <el-button>查看价格</el-button>
        </el-row>

        <!-- 区域、攻略、均价和地图 -->
        <el-row type="flex">
            <!-- 区域、攻略、均价 -->
            <div class="tips">

                <!-- 区域 -->
                <el-row>
                    <el-col :span="3">区域：</el-col>
                    <el-col :span="21"></el-col>
                </el-row>

                <!-- 攻略 -->
                <el-row>
                    <el-col :span="3">攻略：</el-col>
                    <el-col :span="21">北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
                </el-row>

                <!-- 均价 -->
                <el-row>
                  <el-col :span="3">均价 <span class="el-icon-question"></span> ? :</el-col>
                  <el-col :span="21">¥332¥521¥768</el-col>
                </el-row>

            </div>
            <!-- 地图 -->
            <div class="map"></div>
        </el-row>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            restaurants: [],
            state: '',
            value: '',
            input:''
        }
    },

    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>

<style scoped lang='less'>
.main{
    font-size: 14px;
    color: #666;
    .header{}
    .tool{}
    .tips{
        width: 580px;
        > div{
          margin-bottom: 20px;
        }
    }
    .map{
        width: 420px;
        height: 260px;
        background-color: blue;
    }
}
</style>
