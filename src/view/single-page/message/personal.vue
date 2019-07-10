<template>
  <div class="personal">
    <h2>个人信息</h2>
    <div class="personal_header">
      <div class="imgbox">
        <div class="pbox" >
          <img src="" ref="headerimg" alt="">
        </div>
      </div>
      <div class="filebox">
        <p>上传新图像</p>
        <div class="fileimg">
          选择图片
          <input class="fileSelect" type="file" name id @change="fileimg($event)">
        </div>
      </div>
    </div>
    <div class="personal_footer">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="form.section"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import { mapActions } from 'vuex'
import $ from 'jquery'
export default {
  data() {
    return {
      avatar:this.$store.getters.getavatar,
      form: {
        name: "",
        describe: "",
        section: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      cropper: null
    };
  },
  methods: {
    ...mapActions([
      'handleAvatar'
    ]),
    fileimg(e) {
      let reader = new FileReader();
      let img = e.target.files[0];
      console.log(img);
      let type = img.type; //文件的类型，判断是否是图片
      let size = img.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) == -1) {
        this.$message({
          type: "info",
          message: `请选择我们支持的图片格式！`
        });
        return false;
      }
      if (size > 3145728) {
        this.$message({
          type: "info",
          message: `请选择3M以内的图片！`
        });
        return false;
      }
      var that = this;
      console.log(that);
      reader.readAsDataURL(img);
      reader.onload = function() {
        var headerimg = that.$refs.headerimg;
        headerimg.src = this.result;
      };
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let imgFile = $(this.$el).find('.fileSelect')[0].files[0]
          const file = new FormData()
          file.append('file', imgFile)
          let id = this.$store.getters.getid
          console.log(file.get('file'))
          this.handleAvatar({file,id}).then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.personal {
  h2 {
    font-size: 20px;
    margin: 0 50px;
  }
  .personal_header {
    display: flex;
    margin: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid #ccc;
    .imgbox {
      flex: 1;
      box-sizing: border-box;
      padding: 0 10px;
      width:180px;
      .pbox {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
        width: 180px;
        height: 150px;
        overflow: hidden;
        display: inline-block;
        img{
          width: 180px;
          height: 150px;
        }
      }
    }
    .filebox {
      flex: 1;
      p {
        font-size: 20px;
      }
      .fileimg {
        display: flex;
        position: relative;
        overflow: hidden;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        height: 30px;
        width: 80px;
        border: 1px solid#ccc;
        border-radius: 5px;
        .fileSelect {
          position: absolute;
          margin: 0;
          padding: 0;
          z-index: 99;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
  }
  .personal_footer {
    margin: 0 150px;
  }
}
</style>