<template>
  <el-row type="flex" class="detail">
    <!-- 左面 -->
    <el-col :span="18" class="left">
      <!-- 面包屑 -->
      <div class="mianbao">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h1 class="title">塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
      <div class="time">
        <p>攻略：2019-05-22 10:57</p>
        <p>阅读：567</p>
      </div>
      <!-- 文章内容 -->
      <div class="content">
        <p>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</p>
        <img
          style=" width: 100% ; height: 100% "
          src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
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
            src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png"
            alt
          />
        </p>
        <img
          style=" width: 100% ; height: 100% "
          src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
          alt
        />
        <p>
          怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。
          在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。
          怎样在机票酒店上获得最高性价比的体验？ 直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。
        </p>
      </div>
      <!-- 评论点赞 -->
      <div class="good">
        <div class="good-list">
          <i class="iconfont iconpinglun"></i>
          <p>评论(91)</p>
        </div>
        <div class="good-list">
          <i class="iconfont iconstar1"></i>
          <p>收藏</p>
        </div>
        <div class="good-list">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
        <div class="good-list">
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
    <el-col :span="6" class="right">
      <div class="about">
        <p>相关攻略</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",

      dialogImageUrl: "",
      dialogVisible: false,

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
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
    }
  }
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
padding: 50px  0;
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
        p{
              margin-top: 5px;
    font-size: 14px;
    color: #999;
        }
      }
    }
    .speak{
      p{
font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
      }
    }
    .image-put{
      margin-top:15px;
      display: flex;
      justify-content: space-between;
    }
    .comment{
      margin: 20px 0;
      border: 1px solid #ddd;
    }
  }

  .right {
    .about {
      margin: 40px 0;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      font-size: 18px;
    }
  }
}
</style>
