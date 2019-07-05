<template>
    <div>
        <div id="container" style="width:800px; height:500px">
            
        </div>
        <input type="text" v-model="pos.start">
            <input type="text" v-model="pos.end">
            <span @click="handleSearch">搜索</span>
            <div id="searchInfo"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pos:{
                start:"",
                end:""
            },
            map:null
        }
    },
    methods:{
        handleSearch(){
             this.map = new AMap.Map('container',{
                zoom:11,//级别
            });
            var driving = new AMap.Driving({
                // policy:AMap.DrivingPolicy.LEAST_TIME,
                map: this.map,
                panel: "searchInfo",
            })
            var points = [
                { keyword: this.pos.start,city:"广州" },
                { keyword: this.pos.end,city:"广州" }
            ]
            
            driving.search(points, function (status, result) {
                // 未出错时，result即是对应的路线规划方案
                console.log(result);
            })
        }
    },
    mounted(){
        window.onLoad  = function(){
            this.map = new AMap.Map('container',{
                zoom:11,//级别
                center: [113.42794, 23.129484],//中心点坐标
                viewMode:'3D'//使用3D视图
            });
            //实时路况图层
            var trafficLayer = new AMap.TileLayer.Traffic({
                zIndex: 10
            });
            map.add(trafficLayer);//添加图层到地图
            //标记点信息
            var infoWindow = new AMap.InfoWindow({ //创建信息窗体
                isCustom: true,  //使用自定义窗体
                content:`<div class="tips">
                <h6>津安创意园</h6>
                <p>天河区珠吉路58号</p>
                </div>`, //信息窗体的内容可以是任意html片段
                offset: new AMap.Pixel(16, -45)
            });
            var onMarkerMouseover  =  function(e) {
                infoWindow.open(map, e.target.getPosition());//打开信息窗体
                //e.target就是被点击的Marker
            } 
            var onMarkerMouseout  =  function(e) {
                infoWindow.close(map, e.target.getPosition());//关闭信息窗体
                //e.target就是被点击的Marker
            } 
            //标记点
            var marker = new AMap.Marker({
                position:[113.42794, 23.129484]//位置
            })
            map.add(marker);//添加到地图
            marker.on('mouseover',onMarkerMouseover);//绑定mouseover事件
            marker.on('mouseout',onMarkerMouseout);//绑定mouseout事件
            // 插件
            AMap.plugin(['AMap.ToolBar','AMap.Driving'],function(){//异步同时加载多个插件
            var toolbar = new AMap.ToolBar();//工具栏
            map.addControl(toolbar);
  });
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=91b3b3c5aa92f5c25a9128449e5756cb&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
            }
}
</script>

<style>
    .tips{
        background-color: #ccc;
        border: 1px solid #000;
        font-size: 14px;
    }
</style>
