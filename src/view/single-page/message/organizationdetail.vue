<template>
  <div class="fh">
    <p @click="back"><i class="iconfont icon-fanhui"></i>返回组织列表</p>
    <img v-bind:src="avatar" alt />
    <p>{{name}}</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目" name="first">
        <project></project>
      </el-tab-pane>
      <el-tab-pane label="成员" name="second">成员</el-tab-pane>
      <el-tab-pane label="团队" name="third">团队</el-tab-pane>
      <el-tab-pane label="设置" name="fourth">
        <set-up :name="name" :avatar="avatar" :description="description" :id="id"></set-up>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import SetUp from './set-up'
import Project from './project'
import { mapActions } from "vuex";
export default {
  components: {
    SetUp,
    Project
  },
  data() {
    return {
      activeName: 'first',
      name:'',
      avatar:'',
      description:'',
      id:''
    }
  },
  methods: {
    ...mapActions(["handleGetOrganizationDetail"]),
    back() {
      this.$router.push({name:'organization'});
    },
    get() {
      console.log(this.$route.params);
      let id = this.$route.params
      this.handleGetOrganizationDetail(id)
        .then(res => {
          console.log(res);
          this.name = res.data.payload.name
          this.avatar = res.data.payload.avatar
          this.description = res.data.payload.description
          this.id = res.data.payload.id
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    }
  },
  mounted() {
    this.get();
  }
};
</script>
<style lang='less'>
.fh {
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
  margin: 0 30px;
  cursor: pointer;
  .icon-fanhui {
    margin-right: 5px;
    font-size: 18px;
    font-weight: normal;
  }
  img{
    width: 16px;
    height: 16px;
  }
}
</style>
