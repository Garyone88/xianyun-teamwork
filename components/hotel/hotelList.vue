<template>
    <div class="main">
        <el-row class="hotelitem" type="flex">
            <div class="hotel-img">
                <a href="#">
                    <img src="http://qcloud.dpfile.com/pc/wQ2ejOSmhB4OoEq1LYPHp_2RhNciyW026YiQFr_EEZsQrI_ZB6abZPwgKDOmI03U3dWYFEM5hoslgWXTJDjSPA.jpg" alt="">
                </a>
            </div>
            <el-row class="hotel-info" type="flex" justify="space-between">
                <div class="hotel-introduce">
                    <a href="#"><h3>亮哥我喜欢你</h3></a>
                    <div class="introduce-tips">hao lai ge shang wu hotel  经济型</div>
                    <el-row class="introduce-evaluate" type="flex" justify="space-between">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}分">
                        </el-rate>
                        <div><span>58</span> 条评价</div>
                        <div><span>60</span> 篇游记</div>
                    </el-row>
                    <div class="introduce-site">
                        <span class="el-icon-location"></span>
                        位于: 高淳县淳溪镇镇兴路118号(高淳县委党校对面)
                    </div>
                </div>
                <div class="hotel-book">
                    <a href="#">
                        <el-row type="flex" justify="space-between">
                            <div>携程</div>
                            <div><span class="book-price">￥68</span>起></div>
                        </el-row>
                    </a>
                    <a href="#">
                        <el-row type="flex" justify="space-between">
                            <div>艺龙</div>
                            <div><span class="book-price">￥34</span>起></div>
                        </el-row>
                    </a>
                    <a href="#">
                        <el-row type="flex" justify="space-between">
                            <div>Hotels.com</div>
                            <div><span class="book-price">￥105></span>起</div>
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
            value: 3.5
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
