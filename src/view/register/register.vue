<style lang="less">
  @import './register.less';
</style>

<template>
  <div class="register">
    <div class="register-con">
      <Card icon="log-in" title="欢迎注册" :bordered="false">
        <div class="form-con">
          <register-form @on-success-valid="handleSubmit"></register-form>
          <p class="register-tip">
            已有帐号
            <router-link to="/login">
              <a>点击登录</a>
            </router-link>
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import RegisterForm from '_c/register-form'
import { mapActions } from 'vuex'
import ElementUI from 'element-ui';
export default {
  components: {
    RegisterForm
  },
  methods: {
    ...mapActions([
      'handleRegister'
    ]),
    handleSubmit ({ userName, email, password }) {
      this.handleRegister({ userName, email, password }).then(res => {
          ElementUI.Message.success({
            message : '注册成功,请前往激活',
            duration: 3000,
            showClose: true
          });
      })
    }
  }
}
</script>

<style>

</style>
