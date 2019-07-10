<template>
  <div class="project">
    <div class="projectbox create">
      <h2>我创建的项目</h2>
      <i class="iconfont icon-jiahao" @click="open=true"></i>
      <el-dialog title="创建项目" :visible.sync="open">
        <el-form :model="form">
          <el-form-item label="组织" :label-width="formLabelWidth">
            <el-select v-model="form.org" placeholder="Please select a organization">

            </el-select>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="Name"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="form.description"
              autocomplete="off"
              placeholder="Description"
            ></el-input>
          </el-form-item>
          <el-form-item label="可见" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="公开">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="open=false;create('form')">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="projectbox partake">
      <h2>我参与的项目</h2>
    </div>
    <div class="projectbox collect">
      <h2>我收藏的项目</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "project",
  data() {
    return {
      open: false,
      form: {
        name: '',
        description: '',
        org: '',
        region: ''
      },
      formLabelWidth: "120px"
    };
  },
  ...mapActions(["handleCreateProject"]),
  methods: {
    create() {
      this.handleCreateProject({
        projectCreat: { description, name, orgId, pic }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.project {
  background-color: aliceblue;
  padding-top: 10px;
}
.projectbox {
  width: 80%;
  height: 200px;
  font-size: 14px;
  margin: 10px;
  background-color: white;
  h2 {
    font-size: 14px;
  }
  .icon-jiahao {
    float: right;
    line-height: 180px;
    font-size: 40px;
    color: gray;
    cursor: pointer;
  }
}
</style>
