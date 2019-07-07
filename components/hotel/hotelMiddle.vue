<template>
    <div class="main">
            <!-- 区域、攻略、均价 -->
            <div class="tips">

                <!-- 区域 -->
                <el-row>
                    <el-col :span="3">区域：</el-col>
                    <el-col :span="21">
                        <div 
                        v-if="data[0]" 
                        :class="{'link':true,'link-hidden':isShow}">
                            <em @click="handleLinkAll">全部</em>
                            <!-- :class="{'link-choose': (this.$route.query.scenic || 0) === item.id}" -->
                            <em
                            @click='handleLinkChoose(item.id)'
                            v-for="(item, index) in data[0].scenic" 
                            :key="index">
                                {{item.name}}
                            </em>
                        </div>
                        <div v-if="data[0]" class="hidden" @click="handleHidden">
                            <i class="el-icon-arrow-down" style="color: orange" v-if="isShow"></i>
                            <i class="el-icon-arrow-up" style="color: orange" v-else></i>
                            等{{data[0].scenic.length}}个区域
                        </div>
                        <div v-else><h3>暂无数据</h3></div>
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
                  <el-col :span="21" class="ave">
                      <span>
                          <i class="iconfont iconhuangguan" v-for="item in 3" :key="item"></i>
                          <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                            <span>¥332</span>
                          </el-tooltip>
                      </span>
                      <span>
                          <i class="iconfont iconhuangguan" v-for="item in 4" :key="item"></i>
                          <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                                <span>¥521</span>
                            </el-tooltip>
                      </span>
                      <span>
                          <i class="iconfont iconhuangguan" v-for="item in 5" :key="item"></i> 
                          <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                                <span>¥768</span>
                            </el-tooltip>
                      </span>
                  </el-col>
                </el-row>

            </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type: Array,
            default: [{scenic:[{name:''}],name:''}]
        }
    },
    data: function () {
        return {
            restaurants: [],
            isShow: true
        }
    },
    
    methods:{
        handleLinkChoose(id){
            this.$router.push({
                path: '/hotel',
                query:{
                    ...this.$route.query,
                    scenic:id
                }
            })
        },

        handleHidden(){
            this.isShow = !this.isShow;
        },

        handleLinkAll(){
            let{scenic, ...newobj} = this.$route.query;
            this.$router.push({
                path: '/hotel',
                query: newobj
            })
        }
    }
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

        .link{
           em{
                margin-right: 10px;
                cursor: pointer;
                font-style: normal;
                &:hover{
                    color: aqua;
                    text-decoration: underline;
                }
           }
        }

        .link-hidden{
            height: 42px;
            overflow: hidden;
        }

        .link-choose{
            background-color: #eee;
            &:hover{
                color: #666 !important ;
                text-decoration: none !important;
                cursor: text;
            }
        }

        .hidden{
            cursor: pointer;
        }

        .ave{
            span{
                margin-right: 20px;
            }
            i{
                color: orange;
            }
        }
    }
}
</style>
