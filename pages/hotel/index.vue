<template>
    <div class="main">

        <!-- 面包屑 -->
        

        <!-- 顶部工具栏 -->
        

        <!-- 顶部 -->
        <HotelTop/>

        <!-- 中间工具栏 -->
        <HotelTool/>

        <!-- 底部酒店列表 -->
        <HotelList/>

        <!-- 分页器 -->
        <el-pagination
            class="pagination"
            prev-text='< 上一页'
            next-text='下一页 >'
            :hide-on-single-page='true'
            :pager-count="5"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="prev, pager, next"
            :total="100">
        </el-pagination>
        
        

    </div>
</template>

<script>
import HotelTop from '@/components/hotel/hotelTop.vue';
import HotelList from '@/components/hotel/hotelList.vue';
import HotelTool from '../../components/hotel/hotelTool.vue';

export default {
    data: function () {
        return {
            currentPage: 1,
        }
    },

    components:{
        HotelTop,
        HotelList,
        HotelTool
    },

    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }

      
    },


}
</script>

<style scoped lang='less'>
.main{
    width: 1000px;
    margin: 0 auto;

    .pagination{
        text-align: right;
        padding: 20px 0 40px;
    }
}


 
</style>
