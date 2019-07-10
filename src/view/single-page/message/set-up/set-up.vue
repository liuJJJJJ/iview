<template>
  <div class="setup">
    <div class="pic">
      <div class="pbox">
        <img src ref="headerimg" alt />
      </div>
      <div class="filebox">
        <p>上传新图像</p>
        <div class="fileimg">
          选择图片
          <input class="fileSelect" type="file" name id @change="fileimg($event)" />
        </div>
        <p>图片大小不超过1MB</p>
      </div>
    </div>
    <p>
      名称：
      <input type="text" v-bind:placeholder="name" v-model="names" />
    </p>
    <p>
      描述：
      <input type="text" v-bind:placeholder="description" v-model="descriptions" />
    </p>
    <div class="Jurisdiction">
      <p>组织成员创建项目：</p>
      <el-switch
        style="display:block"
        v-model="allowCreateProject"
        active-text="允许"
        inactive-text="禁止"
      ></el-switch>
    </div>
    <div class="Jurisdiction">
      <p>组织成员对项目的权限：</p>
      <el-switch
        style="display:block"
        v-model="memberPermission"
        active-value="1"
        active-text="只可见公开"
        inactive-text="不可见任何"
      ></el-switch>
    </div>
    <el-button type="info" @click="submitForm" plain>保存修改</el-button>
    <div class="delete">
      <h3>删除组织</h3>
      <div class="deletebox">
        <p>删除后无法恢复，请确定此次操作</p>
        <button @click="cut">删除{{name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
export default {
  name: "SetUp",
  props: ["name", "avatar", "description", "id"],
  data() {
    return {
      allowCreateProject: true,
      memberPermission: "1",
      names:'',
      descriptions:'',
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      }
    };
  },
  methods: {
    ...mapActions(["handleChangeOrganization", "handleDeleteOrganization"]),
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
      if (size > 1048576) {
        this.$message({
          type: "info",
          message: `请选择1M以内的图片！`
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
    submitForm() {
      let imgFile = this.$refs.headerimg;
      const file = new FormData();
      file.append("avatar", imgFile.src);
      let allowCreateProject = this.allowCreateProject;
      let memberPermission = parseInt(this.memberPermission);
      let name = this.names;
      console.log(name)
      let description = this.descriptions;
      let id = this.id;
      let avatar = file.get("avatar");
      this.handleChangeOrganization({
        organizationPut: {
          allowCreateProject,
          description,
          memberPermission,
          name
        },
        id
      })
        .then(res => {
          console.log(res);
          let id = this.id;
          this.$router.push({ name: "organization"});
        })
        .catch(err => {
          console.log(err);
        });
    },
    cut() {
      let id = this.id;
      console.log(id)
      this.handleDeleteOrganization(id)
        .then(res => {
          console.log(res);
          this.$router.push({ name: "organization" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    console.log(this.memberPermission);
  }
};
</script>

<style lang="less">
.setup {
  font-size: 14px;
  margin: 0 30px;
}
.pic {
  width: 100%;
  height: 150px;
  .pbox {
    width: 50%;
    float: left;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
    width: 180px;
    height: 150px;
    overflow: hidden;
    img {
      width: 180px;
      height: 150px;
    }
  }
  .filebox {
    width: 50%;
    height: 150px;
    font-size: 14px;
    float: right;
    p {
      margin: 20px 0;
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
.Jurisdiction {
  width: 100%;
  height: 60px;
  margin-top: 30px;
  p {
    margin: 0;
  }
}
.el-button{
  width: 80px;
  height: 30px;
  padding: 0;
}
p {
  margin: 30px 0;
  input {
    width: 80%;
    height: 24px;
  }
}
.delete {
  margin-top: 20px;
  color: brown;
  h3 {
    margin-bottom: 10px;
    margin-top: 40px;
    font-size: 16px;
  }
  .deletebox {
    text-align: center;
    border: 1px solid brown;
    border-radius: 5px;
    font-size: 12px;
    width: 220px;
    height: 120px;
    button {
      color: red;
    }
  }
}
</style>


