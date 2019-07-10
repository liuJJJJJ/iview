<style lang="less">
  @import './activate.less';
</style>

<template>
  <div class="activate">
    <div class="activate-con">
      <Card icon="activate-in" title="欢迎激活" :bordered="false">
        <div class="form-con">
          <Form>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>立即激活</Button>
            </FormItem>
          </Form>
          <p class="activate-tip">
            已激活
            <router-link to="/login">
              <a>点击登录</a>
            </router-link>
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from 'vuex'
import ElementUI from 'element-ui';
export default {
  data() {
    return {
      count: ""
    };
  },
  methods: {
    ...mapActions([
      'handleActivate'
    ]),
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "激活中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
    handleSubmit() {
      let url = location.search;
      let num = url.indexOf("=");
      num = url.substr(num + 1);
      console.log(num);
      this.handleActivate(num).then(res => {
          console.log(res);
          this.openFullScreen();
          ElementUI.Message.success({
              message : "激活成功",
              duration: 3000,
              showClose: true
          });
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    activate() {
      const TIME_COUNT = 5;

      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处
            //this.$router.push({ name: "login" });
          }
        }, 1000);
      }
    }
  },
  created() {}
};
</script>
<style>
.cs {
  text-align: center;
}
</style>
