<template>
    <div class="contianer">
        <!-- 酒店详情内容 -->
        <HotelHome :data="hotelData"/>
        <div></div>
        <!-- 地图 -->
       <Map :data="hotelData"/>
        <div></div>
        <!-- 评论 -->
        <div class="real_comment">
            <h2>真实评论</h2>
            <div class="comment_detail">
                <div class="comment">
                    <p>总评数:9</p>
                    <p>好评数:7</p>
                    <p>差评数:1</p>
                </div>
                <!-- 星号 -->
                <div class="star">
                    <span>
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">

                        </el-rate>
                        
                    </span>
                </div>
                <!-- 综合 -->
                <div class="comprehensive">
                    <p>环境:{{environment}}</p>
                    <p>产品:{{product}}</p>
                    <p>服务:{{service}}</p>
                   
                </div>
            </div>
        </div>
        <!-- 评论 -->
        <div>
            <Commit/>
        </div>
    </div>
</template>

<script>
import HotelHome from "@/components/hotel/hotel_home.vue"
import Map from "@/components/hotel/map.vue"
import Commit from "@/components/hotel/commit.vue"

export default {
    components:{
        HotelHome,
        Map,
        Commit
    
    },
    data(){
        return  {
             hotelData:{},
             arr:[],
             value:0,
             environment:0,
             product:0,
             service:0
        }
        
    },
    computed:{
        star(){
            var num = this.hotelData.stars
            for(var i=0;i<num;i++){
                this.arr.push("<i class='el-icon-star-on'></i>")
            }
            // this.arr.length/10
            var newArr=this.arr.map(v => {
                return v
            });
            return newArr
        }
    },
    mounted(){
        const id = this.$route.query.id
        this.$axios({
            url:"/hotels/",
            params:{
                id
            }
        }).then(res=>{
            console.log(res.data.data);
            this.hotelData=res.data.data[0]
            this.value = this.hotelData.stars
            this.environment = this.hotelData.scores.environment
            this.product = this.hotelData.scores.product
            this.service = this.hotelData.scores.service
        })
    }
}
</script>

<style lang=less scoped>
*{
    padding: 0;
    margin: 0;
}
 .contianer{
        width:1000px;
        margin:20px auto;   
}
.real_comment{
    h2{
        padding: 20px 0;
    }
}
.comment_detail{
    width: 100%;
    height: 90px;
    display: flex;

    .comment{
        flex: 4;
    }
    .star{
        padding-top: 30px;
       color: rgb(247, 186, 42);
        flex: 3;
    }
    .comprehensive{
        padding-top: 30px;
        display: flex;
        flex:5;
        justify-content: space-around;
        p{
            width: 50px;
            height: 50px;
            line-height: 50px;
            border-radius: 50%;
            font-size: 12px;
            text-align: center;
            border: 1px solid rgb(247, 186, 42);
            margin-right: 40px;
            color: rgb(247, 186, 42);
        }
    }
}

</style>
