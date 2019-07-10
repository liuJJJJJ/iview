<template>
  <div class="personal">
    <h2>密码修改</h2>
    <div class="personal_footer">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" placeholder="旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="affirmPsw">
          <el-input v-model="form.affirmPsw" placeholder="确认新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {
        oldPassword: "",
        password: "",
        affirmPsw: ""
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "请输入旧密码 ",
            trigger: "blur"
          },
          {
            pattern: /^[\w_-]{6,16}$/,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入新密码 ",
            trigger: "blur"
          },
          {
            pattern: /^[\w_-]{6,16}$/,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur"
          }
        ],
        affirmPsw: [
          {
            required: true,
            message: "请输入确认密码 ",
            trigger: "blur"
          },
          {
            pattern: /^[\w_-]{6,16}$/,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions([
      'handleChangePassword'
    ]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.$store.getters.getid
          let oldPassword = this.form.oldPassword
          let password = this.form.password
          console.log(password)
          this.handleChangePassword({changePassword:{oldPassword,password},id}).then(res => {
            console.log(res);
            this.$router.push({ name: "login" });
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
  .personal_footer {
    margin: 0 150px;
  }
}
</style>