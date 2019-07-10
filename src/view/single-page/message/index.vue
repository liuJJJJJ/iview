<template>
  <Card shadow>
    <div>
      <div class="message-page-con message-category-con">
        <Menu width="auto" active-name="unread">
          <img v-bind:src="avatar" ref="headering" alt />
          <p class="username">{{username}}</p>
          <p>{{email}}</p>
          <ul v-for="(i,index) in nav" :key="index">
            <li>
              <router-link
                :class="{in:index==current}"
                :to="i.router"
                @click.native="pageto(index,i.router)"
              >{{i.name}}</router-link>
            </li>
          </ul>
        </Menu>
      </div>
      <div class="message-page-con message-view-con">
        <router-view></router-view>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      show: "",
      current: 0,
      username: this.$store.getters.getusername,
      email: this.$store.getters.getemail,
      avatar: this.$store.getters.getavatar,
      nav: [
        { name: "个人信息", index: 1, router: "personal" },
        { name: "修改密码", index: 2, router: "password" },
        { name: "我的组织", index: 3, router: "organization" },
        { name: "我的团队", index: 4, router: "group" }
      ]
    };
  },
  computed: {},
  methods: {
    pageto(index, router) {
      this.current = index;
      this.$router.push(router);
    }
  },
  mounted() {
    console.log(this.$store.getters.getid);
    //console.log(this.$store.getters.getavatar)
  }
};
</script>

<style lang="less">
.message-page {
  &-con {
    height: ~"calc(100vh - 176px)";
    display: inline-block;
    vertical-align: top;
    position: relative;
    &.message-category-con {
      border-right: 1px solid #e6e6e6;
      width: 200px;
      .in {
        border-right: 5px solid black;
        color: black;
      }
      p {
        text-align: center;
      }
      img {
        width: 180px;
        height: 150px;
      }
      ul {
        li {
          height: 50px;
          line-height: 50px;
          list-style: none;
          border-right: 1px solid black;
          a {
            display: block;
            text-align: center;
            color: rgb(170, 169, 169);
          }
          a:hover {
            color: black;
          }
        }
      }
    }
    &.message-view-con {
      position: absolute;
      left: 226px;
      top: 16px;
      right: 16px;
      bottom: 16px;
      overflow: auto;
      //padding: 12px 20px 0;
      .message-view-header {
        margin-bottom: 20px;
        .message-view-title {
          display: inline-block;
        }
        .message-view-time {
          margin-left: 20px;
        }
      }
    }
    .category-title {
      display: inline-block;
      width: 65px;
    }
    .gray-dadge {
      background: gainsboro;
    }
    .not-unread-list {
      .msg-title {
        color: rgb(170, 169, 169);
      }
      .ivu-menu-item {
        .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
          display: none;
        }
        &:hover {
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
