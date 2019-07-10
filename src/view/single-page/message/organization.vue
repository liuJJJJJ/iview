<template>
  <div class>
    <div class="organization">
      <h2>我的组织</h2>
      <i class="iconfont icon-jiahao" @click="open = true"></i>
      <el-dialog title="创建组织" :visible.sync="open">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="Name"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.description" autocomplete="off" placeholder="Description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="open=false;setup('form')">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="personal_header" v-for="(item,index) in items" :key="index">
      <el-container @click.native="getDetails(item.id)">
        <el-aside width="50px"><img v-bind:src="item.avatar" alt /></el-aside>
        <el-container>
          <el-header height="25px">{{item.name}}</el-header>
          <el-footer height="25px">{{item.description}}</el-footer>
        </el-container>
      </el-container>
      <i class="iconfont icon-shezhichilun" @click="getDetails(item.id)"></i>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data(){
    return{
      items:'',
      name:'',
      description:'',
      avatar: '',
      open: false,
      form:{
        name:'',
        description:''
      },
       formLabelWidth: '120px'
    }
  },
  methods: {
    ...mapActions(["handleGetOrganizations","handleSetOrganizations"]),
    or() {
      this.handleGetOrganizations()
        .then(res => {
          console.log(res.data.payload);
          this.items = res.data.payload
          this.name = res.data.payload[0].name
          this.description = res.data.payload[0].description
          this.avatar = res.data.payload[0].avatar
        })
        .catch(err => {
          console.log(err);
        });
    },
    setup(){
      let name = this.form.name
      let description = this.form.description
      this.handleSetOrganizations({organizationCreate: { description, name }}).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    getDetails(id){
      this.$router.push({name:'organizationdetail',params:{'id':id}});
    }
  },
  mounted() {
    this.or();
  }
};
</script>
<style lang="less">
.organization {
  width: 100%;
  height: 30px;
  h2 {
    font-size: 20px;
    margin: 0 50px;
    float: left;
  }
  .icon-jiahao {
    float: right;
    font-size: 30px;
    line-height: 30px;
  }
}
.personal_header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 15px;
  .el-aside{
    height: 50px;
    margin-left: 25px;
    img{
    width: 50px;
    height: 50px;
    }
  }
  .el-container{
    height: 50px;
    font-size: 15px;
    line-height: 50px;
    float: left;
    cursor: pointer;
    .el-header{
      line-height: 25px;
      padding: 0;
      font-weight: 700;
    }
    .el-footer{
      line-height: 25px;
      padding: 0;
    }
  }
  .icon-shezhichilun{
    float: right;
    font-size: 24px
  }
}
i {
  cursor: pointer;
}
</style>

