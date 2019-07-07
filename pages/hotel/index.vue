<template>
  <div class="main">
    <!-- 面包屑 -->
    <div class="breadcrumb">酒店 > 南京市酒店预订</div>

    <!-- 顶部工具栏 -->
    <el-row class="tool" type="flex">
      <!-- 地址選擇 -->
      <el-autocomplete
        @blur="handleInputDestination"
        @focus="handleInputDestination"
        class="destination-input"
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请输入目的地"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>

      <!-- 日期選擇 -->
      <el-date-picker
        clear-icon="date-input"
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <el-input
        :disabled='isShow'
        @focus='handleInputPerson'
        class="population-input"
        placeholder="人数未定"
        suffix-icon="el-icon-user"
        v-model="input"
      ></el-input>

      <div class="hidden-select" v-show="isShow">
        <div class="hidden-select-input">
          <el-col :span="6">每间</el-col>
          <el-col :span="9">
            <el-select v-model="adult" placeholder="成人数量" size="mini">
              <el-option
                v-for="item in adultlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="9">
            <el-select v-model="children" placeholder="儿童数量" size="mini">
              <el-option
                v-for="item in childrenlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </div>
        <div class="hidden-select-button">
          <el-button size="mini" type="primary" @click="handleAffirmPerson">确定</el-button>
        </div>
      </div>

      <el-button type="primary">查看价格</el-button>
    </el-row>

    <!-- 中间 -->
    <el-row type="flex" justify="space-between" class="middle">
      <HotelMiddle/>
      <HotelMap />
    </el-row>
    <!-- 中间工具栏 -->
    <HotelTool 
    :data='hoteloptions' 
    @changePrice_in='changePrice_in'
    @changeHotellevel='changeHotellevel'
    @changeHoteltype='changeHoteltype'
    @changeHotelasset='changeHotelasset'
    @changgeHotelbrand='changgeHotelbrand'
    />

    

    <!-- 底部酒店列表 -->
    <HotelList :data='hotellist' v-if="hotellist.length !== 0"/>
    <div v-else>
      <h2 style="text-align: center;">暂无数据</h2>
    </div>

    <!-- 分页器 -->
    <el-pagination
      class="pagination"
      prev-text="< 上一页"
      next-text="下一页 >"
      :hide-on-single-page="true"
      :pager-count="5"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import HotelMiddle from "@/components/hotel/hotelMiddle.vue";
import HotelList from "@/components/hotel/hotelList.vue";
import HotelTool from "@/components/hotel/hotelTool.vue";
import HotelMap from "@/components/hotel/hotelMap.vue";

export default {
  data: function() {
    return {
      currentPage: 1,  //当前页码
      total: 1,   //页数总计
      pagesize: 10, //每页没显示多少条
      input: "",
      value: "",
      state: "", //目的地
      adult: 1, //成年人
      children: 0, //儿童
      person: 1,    //总人数 
      isShow: false, //隐藏选项
      price_lt: 0,   //工具栏的价格
      hotellevel: 0, //工具栏的酒店等级
      hoteltype: 0,  //工具栏的酒店类型
      hotelasset: 0, //工具栏的酒店设施
      hotelbrand: 0, //工具栏的酒店品牌


      adultlist: [
        { value: 1, label: "1成人" },
        { value: 2, label: "2成人" },
        { value: 3, label: "3成人" },
        { value: 4, label: "4成人" },
        { value: 5, label: "5成人" },
        { value: 6, label: "6成人" },
        { value: 7, label: "7成人" }
      ],

      childrenlist: [
        { value: 0, label: "0儿童" },
        { value: 1, label: "1儿童" },
        { value: 2, label: "2儿童" },
        { value: 3, label: "3儿童" },
        { value: 4, label: "4儿童" }
      ],

      restaurants: [], //目的地显示数组

      // hotellist:[{  scenic: [],hotellevel:{},name: '' }],  //根据条件渲染的酒店列表
      hotellist:[],  //根据条件渲染的酒店列表

      hoteloptions: {}  //酒店选项的数据
    };
  },

  components: {
    HotelMiddle,
    HotelList,
    HotelTool,
    HotelMap
  },

  methods: {
    //修改当前页
    handleCurrentChange(val) {
      this.gethotellist((val-1)*this.pagesize).then( res => {
        this.hotellist = res.data.data;
      })
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    handleSelect(item) {
      this.$router.push({
        path: "/hotel",
        query: {
          city: item.id
        }
      });
    },

    //查询城市的方法
    getCity(city) {
      return this.$axios({
        url: "/airs/city",
        method: "GET",
        params: { name: city }
      });
    },

    //输入目的地
    handleInputDestination() {
      if (this.state !== "") {
        this.getCity(this.state).then(res => {
          let { data } = res.data;
          data.forEach(v => {
            v.value = v.name;
          });
          this.restaurants = data;
          this.restaurants = this.restaurants[0];
          this.state = this.restaurants.name;
          this.$router.push({
            path: "/hotel",
            query: {
              city: this.restaurants.id
            }
          });
        });
      }
    },

    //输入人数
    handleInputPerson(){
        this.isShow = true;
    },

    //确认人数
    handleAffirmPerson(){
        this.person = this.adult + this.children;
        if(this.children !== 0){
            this.input = `${this.adult}成人 ${this.children}儿童`
        }else{
            this.input = `${this.adult}成人`
        }
        this.isShow = false;
    },

    //请求分页列表
    gethotellist(start){
      return this.$axios({
          url: `/hotels`,
          method: 'GET',
          params:{
          _limit: this.pagesize,
          _start: start,
          ...this.$route.query
        }
      })
    },

    //工具组件传值回来修改价格数据
    changePrice_in(val){
      this.price_lt = val;
    },

    //工具组件传值回来修改酒店等级
    changeHotellevel(val){
      this.hotellevel = val;
    },

    //工具组件传值回来修改酒店类型
    changeHoteltype(val){
      this.hoteltype = val;
    },

    //工具组件传值回来修改酒店设施
    changeHotelasset(val){
      this.hoteltype = val;
    },

    //工具组件传值回来修改酒店品牌
    changgeHotelbrand(val){
      this.hotelbrand = val;
    }
  },

  watch: {
    state: function() {
      this.getCity(this.state).then(res => {
        let { data } = res.data;
        data.forEach(v => {
          v.value = v.name;
        });
        this.restaurants = data;
      });
    },

    price_lt: function () {
      this.$router.push({
        path: '/hotel',
        query:{
          ...this.$route.query,
          price_lt: this.price_lt
        }
      })
    },

    hotellevel:function () {
      this.$router.push({
        path: '/hotel',
        query:{
          ...this.$route.query,
          hotellevel: this.hotellevel
        }
      })
    },

    hoteltype:function () {
      this.$router.push({
        path: '/hotel',
        query:{
          ...this.$route.query,
          hoteltype: this.hoteltype
        }
      })
    },


    hotelasset:function () {
      this.$router.push({
        path: '/hotel',
        query:{
          ...this.$route.query,
          hotelasset: this.hotelasset
        }
      })
    },

    hotelbrand:function () {
      this.$router.push({
        path: '/hotel',
        query:{
          ...this.$route.query,
          hotelbrand: this.hotelbrand
        }
      })
    },

    $route(){
      this.gethotellist().then( res => {
        this.currentPage = 1;
        this.total = res.data.total;
        this.hotellist = res.data.data;
      })
    }
  },

  mounted() {
    this.currentPage = 1;
    //获取城市列表
    this.getCity().then(res => {
      let { data } = res.data;
      data.forEach(v => {
        v.value = v.name;
      });
      this.restaurants = data;
    });

    //获取酒店信息
    this.gethotellist().then( res => {
      // console.log(res);
      this.currentPage = 1;
      this.total = res.data.total;
      this.hotellist = res.data.data;
    })

    //请求酒店选项
    this.$axios({
        url: '/hotels/options',
        method: 'GET'
    }).then( res =>{
        let {data} = res.data;
        this.hoteloptions = data;
    })


    

  }
};
</script>

<style scoped lang='less'>
.main {
  width: 1000px;
  margin: 0 auto;
  color: #606266;
  font-size: 14px;

  .breadcrumb {
    padding: 20px 0;
  }

  .tool {
    padding-bottom: 20px;
    > div {
      margin-right: 5px;
    }
    .destination-input {
      flex: 3;
    }
    .date-input {
      flex: 5;
    }
    .population-input {
      flex: 3;
      position: relative;
    }
    .hidden-select {
      position: absolute;
      right: 37px;
      top: 47px;
      width: 326px;
      height: 123px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 12px;
      z-index: 100;
      box-shadow: -1px -1px 3px 2px rgb(104, 100, 100);

      .hidden-select-input {
        height: 55px;
        border-bottom: 1px solid #ddd;
      }
      .hidden-select-button {
        text-align: right;
        margin-top: 16px;
      }
    }
  }

  .middle {
    padding-bottom: 20px;
  }

  .pagination {
    text-align: right;
    padding: 20px 0 40px;
  }
}
</style>
