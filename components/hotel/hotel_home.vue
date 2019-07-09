<template>
  <div>
    <!--  传递数据:prop="data" -->
    <div>
      <span>{{data.breadcrumb}}</span>

      <!-- <span>酒店</span>>
            <span>南京酒店</span>>
      亮哥我喜欢你-->

      <div class="contianer_title">
        <div>
          <h4>
            {{data.name}}
            <!-- 皇冠显示 -->
            <span v-for="(item,index) in star"
            :key="index"
            v-html="item" style="color: #f90;"></span>
          </h4>
        </div>
        <div class="hotel_detail">
          <p>
            <i data-v-3cab31ba class="iconfont iconlocation"></i>
            {{data.alias}}
          </p>
          <p>{{data.address}}</p>
        </div>
        <el-row>
          <!-- 主体显示 -->
          <el-col :span="15">
            <div class="left">
              <img ref="img" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
            </div>
          </el-col>
          <!-- 右边显示 -->
          <el-col :span="9">
            <div class="right">
              <div @click="handleImg($event)">
                <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
              </div>
              <div @click="handleImg($event)">
                <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt />
              </div>
              <div @click="handleImg($event)">
                <img src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg" alt />
              </div>
              <div @click="handleImg($event)">
                <img src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt />
              </div>
              <div @click="handleImg($event)">
                <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt />
              </div>
              <div @click="handleImg($event)">
                <img src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table :data="data.products" style="width: 100%">
        <el-table-column label="价格来源" width="400" >
          <template slot-scope="scope">
            <i class="el-icon-office-building"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="低价房型" width="480">
          <template slot-scope="scope" >
            <span style="margin-left: 10px">{{ scope.row.bestType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低价格/每晚" >
          <template slot-scope="scope">
            <span style="margin-left: 10px;color: #f90;">￥{{ scope.row.price }}</span>起
            <i class="el-icon-arrow-right" style="margin-left: 10px;color: #f90;"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleImg(e) {
      // console.log(e);
      this.$refs.img.src = e.target.src;
    },
  },
  // 皇冠监听
  computed:{
    star(){
      if(this.data.hotellevel){
          const num = this.data.hotellevel.level
            for(var i=0;i<num;i++){
                this.arr.push("<i class='iconfont iconhuangguan clr'></i>")
            }
            // this.arr.length/10
            var newArr=this.arr.map(v => {
                return v
            });
            return newArr
        }
      }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      arr:[]
    };
  }
};
</script>
<style lang=less scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.contianer_title {
  margin-top: 20px;
  .iconhuangguan {
    color: #f90;
  }
  .hotel_detail {
    color: #666;
    font-size: 15px;
    margin-bottom: 30px;
  }
}
.left {
  height: 400px;
  /* background-color: red; */
  img {
    width: 100%;
  }
}
.right {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;

  :nth-child(2n-1) {
    img {
      width: 100%;
    }
    width: 45%;
    margin-bottom: 20px;
    height: 110px;
    margin-left: 5%;
    /* background-color: green; */
  }
  :nth-child(2n) {
    img {
      width: 100%;
    }
    width: 45%;
    margin-bottom: 20px;
    margin-left: 5%;
    height: 110px;
    /* background-color: green; */
  }
}
.hotel_totlo {
  margin: 20px 0;
  font-size: 14px;
  color: #ccc;
  span {
    font-weight: bold;
    color: #000;
    font-size: 16px;
  }
}
</style>
