<template>

    <!-- 特价机票 -->
    <div class="air-sale">
        <el-row type="flex" class="air-sale-pic" justify="space-between">
            <el-col :span="6" v-for="(item, index) in sales" :key="index">
                <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
                    <img :src="item.cover"/>
                    <el-row class="layer-bar" type="flex" justify="space-between">
                        <span>{{item.departCity}}-{{item.destCity}}</span>
                        <span>￥699</span>
                    </el-row>
                </nuxt-link>
            </el-col>
        </el-row>
    </div>

</template>

<script>

export default {
    data(){
        return {
            sales: [] // 去除模拟数据
        }
    },
    mounted(){
        this.$axios({
            url: "/airs/sale",
            method:"GET"
        }).then(res => {
            this.sales = res.data.data;
        });
    },
}
</script>
