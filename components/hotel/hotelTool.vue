<template>
    <div class="tool">
        <el-row type="flex">

            <el-row class="tool-item">
                <el-row type="flex" justify="space-between">
                    <div>价格</div>
                    <div>0-{{value}}</div>
                </el-row>
                <el-slider v-model="value" :max="4000"></el-slider>
            </el-row>

            <el-row class="tool-item">
                <div class="tool-title">住宿等级</div>
                    <el-dropdown @command="handleLevels">
                    <span class="el-dropdown-link">
                        {{hotellevel}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                        command='all'
                        >不限</el-dropdown-item>
                        <el-dropdown-item 
                        :command="`${item.level}&${item.name}`" 
                        v-for="(item, index) in data.levels"
                        :key="index">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>

            <el-row class="tool-item">
                <div class="tool-title">住宿类型</div>
                    <el-dropdown @command="handleTypes">
                    <span class="el-dropdown-link">
                        {{hoteltype}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                        command='all'
                        >不限</el-dropdown-item>
                        <el-dropdown-item 
                        :command="`${item.id}&${item.name}`" 
                        v-for="(item, index) in data.types"
                        :key="index">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>

            <el-row class="tool-item">
                <div class="tool-title">酒店设施</div>
                    <el-dropdown @command="handleAssets">
                    <span class="el-dropdown-link">
                        {{hotelfacility}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                        command='all'
                        >不限</el-dropdown-item>
                        <el-dropdown-item 
                        :command="`${item.id}&${item.name}`" 
                        v-for="(item, index) in data.assets"
                        :key="index">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>

            <el-row class="tool-item">
                <div class="tool-title">酒店品牌</div>
                    <el-dropdown @command="handleBrands">
                    <span class="el-dropdown-link">
                        {{hotelbrand}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="height: 200px;overflow: auto;">
                        <el-dropdown-item
                        command='all'
                        >不限</el-dropdown-item>
                        <el-dropdown-item 
                        :command="`${item.id}&${item.name}`"  
                        v-for="(item, index) in data.brands"
                        :key="index">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>


        </el-row>


            
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type: Object,
            default:{}
        }
    },
    data: function () {
        return {
            value: 4000,
            hotellevel: '不限',
            hoteltype: '不限',
            hotelfacility: '不限',
            hotelbrand: '不限'
        }
    },

    methods:{
        handleLevels(command) {
            if(command === 'all'){
                this.hotellevel = '不限';
                this.$emit('changeHotellevel',command);
            }else{
                let arr = command.split('&')
                this.$emit('changeHotellevel',+arr[0]);
                this.hotellevel = arr[1];
            }
            
        },

        handleTypes(command) {
            if(command === 'all'){
                this.hoteltype = '不限';
                this.$emit('changeHoteltype',command);
            }else{
                let arr = command.split('&')
                this.$emit('changeHoteltype',+arr[0]);
                this.hoteltype = arr[1];
            }
        },

        handleAssets(command) {
            if(command === 'all'){
                this.hotelfacility = '不限';
                this.$emit('changeHotelasset',command);
            }else{
                let arr = command.split('&')
                this.$emit('changeHotelasset',+arr[0]);
                this.hotelfacility = arr[1];
            }
        },

        handleBrands(command) {
            if(command === 'all'){
                this.hotelbrand = '不限';
                this.$emit('changgeHotelbrand',command);
            }else{
                let arr = command.split('&')
            this.$emit('changgeHotelbrand',+arr[0]);
            this.hotelbrand = arr[1];
            }
        },

    },

    watch:{
        value:function () {
            this.$emit('changePrice_in',this.value)
        }
    },

    mounted(){
        setTimeout( () => {
            if(this.$route.query.price_lt !== undefined){
                this.value = +this.$route.query.price_lt
            }

            if(this.$route.query.hotellevel === undefined){
                this.hotellevel = '不限'
            }else{
                this.hotellevel = this.data.levels[+this.$route.query.hotellevel-1].name;
            }

            if(this.$route.query.hoteltype === undefined){
                this.hoteltype = '不限'
            }else{
                this.hoteltype = this.data.types[+this.$route.query.hoteltype-1].name;
            }

            if(this.$route.query.hotelasset === undefined){
                this.hotelfacility = '不限'
            }else{
                this.hotelfacility = this.data.assets[+this.$route.query.hotelasset-1].name
            }

            if(this.$route.query.hotelbrand === undefined){
                this.hotelbrand = '不限'
            }else {
                this.hotelbrand = this.data.brands[+this.$route.query.hotelbrand-4].name
            }
        },3000)
    }
    
}
</script>

<style scoped lang='less'>
.tool{
    border: 1px solid #ddd;
    padding: 5px 20px;
    color: #666;
    height: 80px;
    color: #606266;
    font-size: 13px;
    box-sizing: border-box;
    .tool-item{
        flex: 1;
        text-align: center;
        padding-right: 15px;
        margin-top: 7px;
        box-sizing: border-box;
        border-right: 1px solid #ddd;
        &:last-child{
            border-right: none;
        }
        .tool-title{
            margin-bottom: 5px;
        }
    }
}


.el-dropdown-link {
    cursor: pointer;
    color: #606266;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
