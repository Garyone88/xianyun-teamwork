<template>
  <el-row type="flex" class="detail">
    <!-- 左面 -->
    <el-col :span="17" class="left" v-for="(item,index) in detail" :key="index">
      <!-- 面包屑 -->
      <div class="mianbao">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h1 class="title">{{item.title}}</h1>
      <div class="time">
        <p>攻略：{{item.city.created_at}}</p>
        <p>阅读：567</p>
      </div>
      <!-- 文章内容 -->
      <div class="content">
        {{item.content}}
        <img
          style=" width: 100% ; height: 100% "
          :src="item.images[0]"
          alt
        />
        <p style="color:#99a6c4">图：塞班岛。 by第5季旅游</p>

        <h1>一、怎样用6000块玩转塞班？</h1>
        <p>大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。</p>
        <h3>1.怎样订机票+酒店性价比最高？</h3>
        <p clss="content-tu">
          机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了
          <img
            style="width:56px;height:56px"
             :src="item.images[1]"
            alt
          />
        </p>
        <img
          style=" width: 100% ; height: 100% "
           :src="item.images[2]"
          alt
        />

          {{item.summary}}

      </div>
      <!-- 评论点赞 -->
      <div class="good">
        <div class="good-list">
          <i class="iconfont iconpinglun"></i>
          <p>评论(91)</p>
        </div>
        <div class="good-list" @click="handleCollect">
          <i class="iconfont iconstar1"></i>
          <p>收藏</p>
        </div>
        <div class="good-list">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
        <div class="good-list" @click="handleGood">
          <i class="iconfont iconding"></i>
          <p>点赞9</p>
        </div>
      </div>

      <!-- 评论 -->
      <div class="speak">
        <p>评论</p>
        <div>
          <el-input type="textarea" :rows="2" placeholder="说点什么吧..." v-model="textarea"></el-input>
        </div>
        <!-- 图片上传  -->
        <div class="image-put">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
          <div>
            <el-button type="primary">提交</el-button>
          </div>
        </div>
        <!-- 评论页面 -->
        <div class="comment">
          <template>
            <div>
              <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
              <el-divider></el-divider>
              <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
            </div>
          </template>
        </div>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-col>

    <!-- 右面 -->
    <el-col :span="7" class="right">
      <div class="about">
        <p>相关攻略</p>
      </div>

         <div class="about-btm">
            <el-row class="img-content" v-for="(item,index) in recommend" :key="index">
                <el-col :span="9" class="img-content-left">
                  <div class="grid-content bg-purple-light"> <img  alt="">
                  </div>
                </el-col>
                <el-col :span="5" class="img-content-right">
                  <div class="img-content-right-like">
                    <h4>{{item.title}}</h4>
                    <nuxt-link to="#">
                       <p>2019-07-6 10:59 阅读</p> 
                    </nuxt-link>
                  </div>  
                </el-col>
          </el-row >
         </div>

    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      detail:[],
      recommend:[],
      textarea:"",
      dialogImageUrl:"",
      dialogVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  mounted(){
       this.$axios({
              url:'posts',
              method:'GET',
              params:this.$route.query,
       }).then(res=>{
             this.detail = res.data.data;  
       })
        this.$axios({
              url:'posts/recommend',
              method:'GET',
              params:this.$route.query,
       }).then(res=>{
             console.log( res.data.data)
             this.recommend = res.data.data
       })
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 收藏功能
    handleCollect() {
      let token = this.$store.state.user.userInfo.token;
      if (token) {
        this.$axios({
          url: "/posts/star",
          method: "GET",
          params:{
          id: this.$route.query.id
          },
           headers: {
            Authorization: `Bearer ${token}`
          },

        }).then(res => {
          this.$message.success("收藏成功");
        });
      } else {
        this.$router.push({
          path: "/user/login"
        });
        this.$message.success("请登录");
      }
    },
    // 点赞功能
    handleGood (){
    let token=this.$store.state.user.userInfo.token
    if(token){
    this.$axios({
      url:"/posts/like",
      method:'GET',
      headers:{
         Authorization:`Bearer ${token}`
      },
      params:{
         id:this.$route.query.id
      }
    }).then(res=>{
       this.$message.success("点赞成功");
    })
    }else{
      this.$router.push({
        path: "/user/login"
      });
      this.$message.success("请登录");
    }
    }
  },
};
</script>

<style scoped lang='less'>
.detail {
  width: 1000px;
  margin: 0 auto;
  position: relative;
  .left {
    .mianbao {
      margin: 20px 0;
    }
    .title {
      padding-bottom: 20px;
      border-bottom: 1px solid #dddd;
    }
    .time {
      color: #999;
      padding: 20px 0;
      display: flex;
      flex-direction: row-reverse;
      font-size: 14px;
      p {
        padding-right: 20px;
      }
    }
    .good {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px 0;
      .good-list {
        margin: 0 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        i {
          display: block;
          font-size: 28px;
          color: orange;
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
    .speak {
      p {
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
    .image-put {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
    .comment {
      margin: 20px 0;
      border: 1px solid #ddd;
    }
  }

  .right {
     margin-left:40px;
    .about {
      margin: 20px 0;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      font-size: 18px;
    }
    .about-btm{
         .img-content{
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
                padding-bottom:10px;
                font-size: 18px;

           .img-content-left{
              img{width:100px; height:100px; background:'#333';  display: block;}
           }
           .img-content-right{
             h4{
                padding-top: 0px;
             }
             a{
                    position: absolute;
                     display: block;
                     width: 100%;
                     font-size: 12px;
                     color: #ccc;
                     margin-left: 40px;
                     padding-left: 36px;
                     bottom: 10px;
                     left: 30px;
                     
                  p{
                      
                    }
             }    
           
           }
         }
    } 
  }
}
</style>
