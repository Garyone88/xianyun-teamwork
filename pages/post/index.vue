<template>
    <div class="postIndex">
        <el-row>
            <el-col :span="8">
                <!-- 导航栏 -->
                <div><NavMenu /></div>
            </el-col>
            <el-col :span="16">
                <!-- 搜索框 -->
                <div><Search /></div>   
                <!-- 攻略主页 -->
                <div>
                    <el-row type="flex" justify="space-between">
                        <span>推荐攻略</span>
                        <el-button type="primary" icon="el-icon-edit">写游记</el-button>
                    </el-row>
                    <div v-for="(item,index) in posts" :key="index">
                        <h4>{{item.title}}</h4>
                        <p v-html="item.summary"></p>
                        <div>
                            <img v-for="(item2,index2) in item.images" :key="index2" :src="item2" alt="">
                        </div>
                        <el-row type="flex" justify="space-between">
                            <div>{{item.cityName}}<i>{{item.watch}}</i></div>
                            <div></div>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
            
    </div>
</template>

<script>
import NavMenu from "@/components/post/navMenu.vue"
import Search from "@/components/post/search.vue"
export default {
    data(){
        return{
            posts:""
        }
    },
    mounted(){
        this.getPosts()
    },
    methods:{
        getPosts(){
            this.$axios({
                url:"/posts",
                methods:"GET"
            }).then(res=>{
                console.log(res);
                const {data} = res.data;
                this.posts = data;
                console.log(data);
            })
        }
    },
    components:{
        NavMenu,
        Search
    }
}
</script>

<style lang="less">
    .postIndex{
        width: 1000px;
        margin: 0 auto;
        img {
            width: 33%;
        }
    }
</style>
