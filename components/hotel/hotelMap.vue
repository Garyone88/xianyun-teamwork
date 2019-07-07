<template>
  <div class="main">
      <div id="container" class="map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function () {
        var map = new AMap.Map("container", {
      zoom: 11, //级别
      center: [116.397428, 39.90923], //中心点坐标
      viewMode: "3D" //使用3D视图
    });

    // var toolbar = new AMap.ToolBar();
    // map.addControl(toolbar);
    }

    var url = `https://webapi.amap.com/maps?v=1.4.15&key=4b3f5a9cef2a0bb7a697dd04c4e5df75&callback=onLoad&plugin=AMap.ToolBar,AMap.Driving,AMap.Transfer,AMap.Walking`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped lang='less'>
.main {
  width: 420px;
  height: 260px;
  .map{
      height: 100%;
      width: 100%;
  }
}
</style>
