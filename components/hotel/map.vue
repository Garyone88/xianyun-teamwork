<template>
  <div>
    高德地图
    <div id="gaode">
      <div id="container"></div>
      <div class="right">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="交通" name="first">
              <div id="panel"></div>
            </el-tab-pane>
            <el-tab-pane label="风景" name="second">
              <ul>
                  <li class="scenic" v-for="(item,index) in data.scenic"
                    :key="index">
                    {{item.name}}
                  </li>
              </ul>
            </el-tab-pane>
            
          </el-tabs>

      </div>
    </div>
    <!-- 搜索框 -->
    <input type="button" value="小车" />
    <input type="text" placeholder="请输入你的出发城市" v-model="start" />到
    <input type="text" placeholder="请输入你的目的城市" v-model="end" />
    <input type="button" value="搜索" @click="handleSearch" />
    <!-- 酒店服务 -->
    <div class="hotel_message">
      <el-row type="flex" justify="space-between" class="content">
        <span>基本信息</span>
        <span>入住时间: 14:00之后</span>
        <span>离店时间: 12:00之前</span>
        <span>{{data.creation_time}} / {{data.renovat_time}}</span>
        <span>酒店规模: {{data.roomCount}}间客房</span>
      </el-row>
      <el-row type="flex" justify="space-between" class="content">
        <span>主要设施</span>
        <!-- 用品 -->
        <div class="supplies">
          <el-tag
            type="info"
            v-for="(item,index) in data.hotelassets"
            :key="index"
          >{{item.name}}{{item.type}}</el-tag>
        </div>
      </el-row>
      <div class="content">
        <span>停车服务</span>
        <span class="supplies">{{data.parking}}</span>
      </div>
      <div class="content">
        <span>停车服务</span>
        <span class="supplies">-</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
       activeName: 'first',
      current: 0,
      tabs: ["交通", "风景"],
      start: "",
      end: "",
      city: ""
      // baseInfo:{},//酒店基本信息
      // arr:[],//主要设施
    };
  },

  methods: {
    Search(start,end){
       const city = this.data.city.name;
      var map = new AMap.Map("container", {
        resizeEnable: true,
        // center: [116.397428, 39.90923],//地图中心点
        zoom: 13 //地图显示的缩放级别
      });
      // 驾车路线
      var driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME,
        // map 指定将路线规划方案绘制到对应的AMap.Map对象上
        map,
        // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
        panel: "panel"
      });

      var points = [
        { keyword: `${start}`, city: `${city}` },
        { keyword: `${end}`, city: `${city}` }
      ];

      driving.search(points, function(status, result) {
        // 未出错时，result即是对应的路线规划方案
      });
    },
    handleSearch() {
        this.Search(this.start,this.end)
    },
    handleClo1(){
      this.Search("得月楼","夫子庙");
    },
    handleClo2(){
      this.current=1
    },
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
  watch: {
    data() {
      if (this.data) {
        //  console.log(this.data.hotelassets[0]);
        // 存储酒店信息
        // this.baseInfo = this.data.hotelassets[0];
        // this.mainServe1 = this.data.hotelassets[2];
        // this.mainServe2 = this.data.hotelassets[3];
        // const newArr = []
        // this.arr = this.data.hotelassets.map(v=>{
        //     newArr.push(v.type)
        //     newArr.push(v.name)
        //     return newArr
        //   })
        //
        const longitude = this.data.location.longitude;
        const latitude = this.data.location.latitude;
        // const name = this.data.name;//酒店名
        window.onLoad = function() {
          var map = new AMap.Map("container", {
            zoom: 11, //级别
            center: [longitude, latitude], //中心点坐标，天安门广场
            viewMode: "3D" //使用3D视图
          });

          //实时路况图层
          var trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10
          });
          map.add(trafficLayer); //添加图层到地图
          // 添加标记点
          var marker1 = new AMap.Marker({
            // content:"llq",
            position: new AMap.LngLat(longitude, latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: `北京`
          });
          var marker2 = new AMap.Marker({
            // content:"llq",
            position: new AMap.LngLat(118.9655, 31.7144), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: `夫子庙`
          });
          map.add([marker1, marker2]); //添加到地图
          // 异步加载插件
          var toolbar = new AMap.ToolBar();
          map.addControl(toolbar);
        };
        // 页面全部加载完之后，执行

        // 引入高德地图的js 文件
        var url =
          "https://webapi.amap.com/maps?v=1.4.15&key=cb77e0951f5bfc0a20186f582a1e61b8&callback=onLoad&plugin=AMap.ToolBar,AMap.Driving";
        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;
        document.head.appendChild(jsapi);
      }
    }
  },
  mounted(){
    setTimeout(() => {
      this.Search("得月楼","夫子庙");
    }, 2000);
    
  }
};
</script>

<style lang=less scoped>
#gaode {
  width: 100%;
  position: relative;
  height: 500px;
  box-sizing: border-box;
    #container {
    width: 70%;
    height: 500px;
    
  }
  .right{
    position: absolute;
    top: 0;
    right: 0;
    height: 500px;
    overflow: hidden;
  }
}


#panel {
  background-color: white;
  height: 500px;
  overflow-y: auto;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
.hotel_message {
  .content {
    height: 50px;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
  }
  .supplies {
    margin-left: 70px;
    flex: 1;
  }
}
.active {
  border-bottom: 3px solid blue;
  cursor: pointer;
}
</style>
