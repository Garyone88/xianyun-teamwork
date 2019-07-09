<template>
    <div>
        <el-row type="flex" justify="space-betwee" class="commit">
            <div class="commit_user">
               <el-avatar :size="50" :src="circleUrl" class="img"></el-avatar>
               <span class="level">LV.8</span>
               <span class="date">2019-6-26</span>
            </div>
            <div class="text">
                <div>badwoman</div>
                <textarea autocomplete="off" rows="1" placeholder="添加回复" class="el-textarea__inner" style="resize: none; min-height: 33px;" width="850" @focus="handleBigInput1($event)" @blur="handleSmallInput($event)"></textarea>
               <el-button type="primary" class="btn" v-if="isShow===0">回复</el-button>
            </div>
        </el-row>
        <el-row type="flex" justify="space-betwee" class="re_commit">
            <div class="commit_user">
               <el-avatar :size="50" :src="circleUrl" class="img"></el-avatar>
               <span class="level">LV.8</span>
               <span class="date">2019-6-26</span>
            </div>
            <div class="text">
                <div>badwoman</div>
                <textarea autocomplete="off" rows="1" placeholder="添加回复" class="el-textarea__inner" style="resize: none; min-height: 33px;" width="850" @focus="handleBigInput2($event)" @blur="handleSmallInput($event)"></textarea>
                <el-button type="primary" class="btn" v-if="isShow===1">回复</el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
             circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
             isShow:-1,
        }
    },
    methods:{
        // 单击输入框事件
        handleBigInput1(e){
            e.target.className="el-textarea__inner commonafter"
            this.isShow=0
        },
        // 单击输入框事件
          handleBigInput2(e){
            e.target.className="el-textarea__inner commonafter"
            this.isShow=1
        },
        handleSmallInput(e){
            e.target.className="el-textarea__inner"
            this.isShow=-1
        },
        // 单击回复本地存储
        handleRe(){
            // 本地存储
            console.log(123);
            const ul = document.querySelector(".ul")
            const li = document.createElement("li")
            const text = document.querySelector("text").text
            console.log(text);
            const airs = JSON.parse(localStorage.getItem('airs') || `[]`);
            airs.unshift(this.form);
            localStorage.setItem("airs", JSON.stringify(airs));
        }

    },
    mounted(){
        const id = this.$route.query.id
        this.$axios({
            url:"/hotels/comments",
            params:{
                id,
            }
        }).then(res=>{
            console.log(res.data,123);
        })
    }
}
</script>

<style lang=less scoped>
.commit{
     height: 120px;
}
.commit_user{
    padding-left: 30px;
    position: relative;
    .img{
        vertical-align: middle;
    }
    .level{
        color: #f30;
    }
    .date{
        position: absolute;
        top: 48px;
        left: 20px;
    }
}
.re_commit{
    margin-left: 90px;
    height: 120px;
}
.commonafter{
    height: 50px;
    border: 1px solid blue;
}
.text{
    margin: 20px 0 50px 10px;
    flex:1;
    border-bottom: 1px dashed #eee;
    position: relative;
    box-sizing: border-box;
}
.btn{
    position: absolute;
    right: 0;
    top: 80px;
    background-color: blue;
}
</style>
