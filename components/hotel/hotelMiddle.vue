<template>
    <div class="main">
            <!-- 区域、攻略、均价 -->
            <div class="tips">

                <!-- 区域 -->
                <el-row>
                    <el-col :span="3">区域：</el-col>
                    <el-col :span="21">
                        <div>
                            <a href="#">全部</a>
                            <a href="#">全部</a>
                            <a href="#">全部</a>
                            <a href="#">全部</a>
                        </div>
                        <div>
                            <i class="el-icon-arrow-down" style="color: orange" v-if="true"></i>
                            <i class="el-icon-arrow-up" style="color: orange" v-else></i>
                            等43个区域
                        </div>
                    </el-col>
                </el-row>

                <!-- 攻略 -->
                <el-row>
                    <el-col :span="3">攻略：</el-col>
                    <el-col :span="21">北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
                </el-row>

                <!-- 均价 -->
                <el-row>
                  <el-col :span="3">
                    均价 
                    <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                      <span class="el-icon-question"></span>
                    </el-tooltip>
                      :</el-col>
                  <el-col :span="21">
                      <span>
                          <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                                <i class="iconfont">
                                    &#xe63d;&#xe63d;&#xe63d;
                                    <span>¥332</span>
                                </i>
                            </el-tooltip>
                      </span>
                      <span>
                          <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                               <i class="iconfont">
                                   &#xe63d;&#xe63d;&#xe63d;&#xe63d;
                                   <span>¥521</span>
                                </i>
                            </el-tooltip>
                      </span>
                      <span>
                          <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                               <i class="iconfont">
                                   &#xe63d;&#xe63d;&#xe63d;&#xe63d;&#xe63d;
                                   <span>¥768</span>
                                </i>
                            </el-tooltip>
                      </span>
                  </el-col>
                </el-row>

            </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            restaurants: [],
            
            
            
        }
    },

    methods: {
      
    },
    
}
</script>

<style scoped lang='less'>
.main{
    font-size: 14px;
    color: #666;
    .tips{
        width: 580px;
        > div{
          margin-bottom: 20px;
        }
    }
}
</style>
