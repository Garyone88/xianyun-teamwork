<template>
<div class="container">
      <el-row type="flex" justify="space-between">
           <el-col :span="20">
                <h2>发表新攻略</h2>
                <p>分享你的个人游记，让更多人看到哦</p>
                <el-form ref="form" :model="form"  label-width="80px" size="mini">
                    <el-input placeholder="请输入标题" v-model="form.title"></el-input>
                    <section class="contain-editor">
                          <div class="quill-editor" 
                              :content="content" 
                              @change="onEditorChange($event)"
                              @blur="onEditorBlur($event)"
                              @focus="onEditorFocus($event)"
                              @ready="onEditorReady($event)"
                              v-quill:myQuillEditor="editorOption">
                          </div>
                    </section> 
                      <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                            <el-autocomplete
                              :fetch-suggestions="queryDepartSearch"
                              placeholder="请搜索出发城市"
                              @select="handleDepartSelect"
                              class="el-autocomplete"
                              v-model="form.city"
                              ></el-autocomplete>
                            </el-form-item>
                            <el-form-item class="demo-form-bottom">
                                <el-button type="primary" @click="submitForm()">发布</el-button>
                                或者 
                                <span @click="draftBox">保存到草稿</span>
                        </el-form-item>
                </el-form> 
           </el-col>
            <el-col :span="2">
                <div class="draft-box">
                      <h4>草稿箱({{form.sum}}) </h4>
                      <el-row v-for="(item,index) in history" :key="index">
                            <div class="draft-item">
                                <span>{{item.title}}</span>
                                <p>2019-6-8</p>
                            </div>
                      </el-row>
                </div>
            </el-col>
      </el-row>
 </div>       
</template>

<script>
export default {
     data() {
      return {
            history:[],
            form: {
                sum:'0',
                title: '',
                city: '',
                departCode: "",
            },
         // 表单规则
      rules: {
          city:[{ required: true, message: '请输入城市名', trigger: 'blur' }],
          title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
      content: '',
      editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              ['link', 'image'],
            ]
          }
        }
      };
    },
      mounted(){
            this.history = JSON.parse(localStorage.getItem("posts") || `[]`);
            this.form.sum = this.history.length;
      },

      methods: {

              queryDepartSearch(value, cb){
                        if(!value){
                               return cb([])
                          }
                        this.$axios({
                          url:"/airs/city",
                          method:"GET",
                          params:{name:value},
                        }).then(res=>{
                          const {data} = res.data;
                          const newData = data.map(v=>{
                            return {
                              ...v,
                              value: v.name.replace("市","")
                              }
                          })
                          // 如果用户不在下拉选项中选择，默认选择第一个
                          this.form.city = newData[0].value;
                          this.form.departCode = newData[0].sort;
                          cb(newData)
                        })
                      },

                        // 目标城市下拉选择时触发
                      handleDepartSelect(item) {
                          this.form.city = item.value;
                          this.form.departCode = item.sort;
                      },

                    onEditorBlur(editor) {
                      // console.log('editor blur!', editor)
                    },
                    onEditorFocus(editor) {
                      // console.log('editor focus!', editor)
                    },
                    onEditorReady(editor) {
                      // console.log('editor ready!', editor)
                    },
                    onEditorChange({ editor, html, text }) {
                      // console.log('editor change!', editor, html, text)
                      this.content = html
                    },
                    draftBox(){
                        const rules = {
                            title:{
                                value:this.form.title,
                                message:'请输入主题'
                            },
                            city: {
                                value: this.form.city,
                                message: "请输入出发城市"
                            },
                          
                        }
                    // 验证的开关，如果是false代表不通过
                        let valid = true;
                        
                        // 循环验证表单的数据
                        Object.keys(rules).forEach(v => {
                            if(!valid) return;

                            if(!rules[v].value){
                                this.$message.warning(rules[v].message);
                                valid = false;
                            }
                        })
                        
                        if(!valid){
                            return;
                        }
                          const data = [{
                            content: this.content,
                            city:this.form.city,
                            title:this.form.title,
                          }]

                        
                  // 把当前表单的值保存到本地
                  const localAirs = JSON.parse(localStorage.getItem("posts") || `[]`);

                  // 存进去新的搜索记录
                  localAirs.unshift(this.form); 

                  // 保存到本地
                  localStorage.setItem("posts", JSON.stringify(localAirs));
                    },
                    submitForm(){
                        const token = this.$store.state.user.userInfo.token;
                        if(!token){
                          this.$message.success("请先去登录!");
                            return 
                        }
                        const rules = {
                            title:{
                                value:this.form.title,
                                message:'请输入主题'
                            },
                            city: {
                                value: this.form.city,
                                message: "请输入出发城市"
                            },
                          
                        }
                    // 验证的开关，如果是false代表不通过
                        let valid = true;
                        
                        // 循环验证表单的数据
                        Object.keys(rules).forEach(v => {
                            if(!valid) return;

                            if(!rules[v].value){
                                this.$message.warning(rules[v].message);
                                valid = false;
                            }
                        })
                        
                        if(!valid){
                            return;
                        }
                        const data = {
                                  content: this.content,
                                  city:this.form.city,
                                  title:this.form.title,
                                  destCode:this.destCode
                          }
                          // 获取token
                        const {
                                  user: { userInfo }
                                } = this.$store.state;
                        this.$axios({
                              url:'posts',
                              method:'POST',
                              data,
                              headers: {
                                  Authorization: `Bearer ${userInfo.token || "NO TOKEN"}`
                              }
                          }).then(res => {
                              const {status,message} = res.data;
                              if(status==0){
                                this.$message.success(message)
                              }
                              this.form.city=" ";
                              this.form.title=" ";
                              this.content=" ";
                          })
                    }
                  }
                  
              }
    </script>

    <style scoped lang="less">
    .container{
        width: 1000px;
        margin: 20px auto;
        height: auto;
        .contain-editor{
            margin-top: 20px;
            .quill-editor {
                min-height: 200px;
                height: 450px;
                max-height: 600px;
                overflow-y: auto;
                }
        }
      
        h2{
        font-size: 22px;
        font-weight: 400;
        }
        p{
            margin: 2px 0;
            font-size: 12px;
            color: #ccc
          }
          .draft-box{
              padding:10px;
              width: 120px;
              height: auto;
              border: 1px solid #ccc;
          }
          .demo-form-inline{
              vertical-align: middle;
              margin: 16px 0;
              width: 260px;
              margin-left: -12px;
        
            /deep/  .el-form-item__label{line-height: 42px;}
            .demo-form-inp{
              /deep/   input{
                        height: 40px;
                        vertical-align: middle;
                  }
              }
          }
          .demo-form-bottom{
                margin-left: -10%;
                span{
                    color: orange;
                    font-size: 12px;
                    cursor: pointer;
                }
          }
          .draft-box{
            .draft-item{
              margin: 6px 0;
              cursor:pointer;
            }
            h4{
              margin-bottom: 10px;
            }
          }

    }


      .input-with-select .el-input-group__prepend {
        background-color: #fff;
      }

</style>
