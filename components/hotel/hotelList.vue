<template>
    <div class="main">
        <el-row 
        class="hotelitem" 
        type="flex"
        v-for="(item, index) in data"
        :key="index"
        @click="handleClick"
        >
            <div class="hotel-img">
                <nuxt-link :to="`/hotel/detail/?id=${item.id}`">
                    <img :src="item.photos" alt="">
                </nuxt-link>
            </div>
            <el-row class="hotel-info" type="flex" justify="space-between">
                <div class="hotel-introduce">
                    <nuxt-link :to="`/hotel/detail/?id=${item.id}`"><h3>{{item.name}}</h3></nuxt-link>
                    <div class="introduce-tips">
                        {{item.alias}}  
                        <i 
                        class="iconfont iconhuangguan" 
                        :title="`${item.hotellevel? item.hotellevel.name: null}级`" 
                        v-for="item in (item.hotellevel? item.hotellevel.level: 0)" :key="item"></i>
                        <span>{{item.hoteltype.name}}</span>
                        </div>
                    <el-row class="introduce-evaluate" type="flex" justify="space-between">
                        <el-rate
                            v-model="item.stars"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}分">
                        </el-rate>
                        <div><span>{{item.all_remarks}}</span> 条评价</div>
                        <div><span>60</span> 篇游记</div>
                    </el-row>
                    <div class="introduce-site">
                        <span class="el-icon-location"></span>
                        位于: {{item.address}}
                    </div>
                </div>
                <div class="hotel-book">
                    <a href="#">
                        <el-row type="flex" justify="space-between">
                            <div>{{item.products[0].name}}</div>
                            <div><span class="book-price">￥{{item.products[0].price}}</span>起></div>
                        </el-row>
                    </a>
                    <a href="#">
                        <el-row type="flex" justify="space-between">
                            <div>{{item.products[1].name}}</div>
                            <div><span class="book-price">￥{{item.products[1].price}}</span>起></div>
                        </el-row>
                    </a>
                    <a href="#">
                        <el-row type="flex" justify="space-between">
                            <div>{{item.products[2].name}}</div>
                            <div><span class="book-price">￥{{item.products[2].price}}</span>起></div>
                        </el-row>
                    </a>
                </div>
            </el-row>
        </el-row>
    </div>
</template>

<script>
export default {
    data:function () {
        return {
            
        }
    },

    props:{
        data:{
            type: Array,
            // default:[{  scenic: [],hotellevel:{},name: '' }]
            default:[]
        }
    },
    methods:{
        handleClick(){
            const id = this.data.id;
            console.log(id);
             this.$router.push("/hotel/detail/?id="+id)
        }
    }
}
</script>

<style scoped lang='less'>
.hotelitem{
    padding: 25px 0;
    border-bottom: 1px solid #ebeef5;
    .hotel-img{
        width: 320px;
        height: 210px;
        margin-right: 15px;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .hotel-info{
        flex: 1;
        padding: 5px;
        .hotel-introduce{
            width: 425px;
            padding-right: 35px;
            box-sizing: border-box;
            i{
                color: orange;
            }
            h3{
                font-weight: 400;
                font-size: x-large;
            }
            .introduce-tips{
                color: #999;
                margin-bottom: 8px;
            }
            .introduce-evaluate{
                margin-bottom: 10px;
                span{
                    color: #f90;
                }
            }
            .introduce-site{
                font-size: 14px;
                color: #666;
            }
        }
        .hotel-book{
            width: 255px;
            a{
                display: block;
                padding: 12px 20px 12px 10px;
                border-bottom: 1px solid #ebeef5;
                &:hover{
                    background-color: rgba(245, 245, 245, .8)
                }
            }
            .book-price{
                color:#f90;
            }
        }
    }
}
</style>
