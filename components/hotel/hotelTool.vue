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
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{hotellevel}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>

            <el-row class="tool-item">
                <div class="tool-title">住宿类型</div>
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{hoteltype}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>

            <el-row class="tool-item">
                <div class="tool-title">酒店设施</div>
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{hotelfacility}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>

            <el-row class="tool-item">
                <div class="tool-title">酒店品牌</div>
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{hotelbrand}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-row>


        </el-row>


            
    </div>
</template>

<script>
export default {
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
        handleCommand(command) {
        this.$message('click on item ' + command);
      }
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
