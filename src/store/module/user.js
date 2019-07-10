import {
  login,
  register,
  activate,
  avatar,
  changepassword,
  getorganizations,
  setorganizations,
  getorganizationdetail,
  changeorganization,
  deleteorganization,
  createproject,
  logout,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatar: '',
    token: getToken(),
    email: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar(state, file) {
      state.avatar = file
    },
    setUserId(state, id) {
      state.userId = id
    },
    setEmail(state, email) {
      state.email = email
    },
    setUserName(state, userName) {
      state.userName = userName
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    getusername: state => state.userName,
    getemail: state => state.email,
    gettoken: state => state.token,
    getid: state => state.userId,
    getavatar: state => state.avatar
  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          console.log(res)
          const data = res.data
          commit('setToken', data.header.token)
          commit('setUserName', data.payload.username)
          commit('setEmail', data.payload.email)
          commit('setUserId', data.payload.id)
          commit('setAvatar', "data:image/jpeg;base64," + data.payload.avatar)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 注册
    handleRegister({ }, { userName, email, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        register({
          userName,
          email,
          password
        }).then(res => {
          console.log(res)
          resolve()
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 激活
    handleActivate({ }, token) {
      return new Promise((resolve, reject) => {
        activate({
          token
        }).then(res => {
          console.log(res)
          resolve()
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 上传头像
    handleAvatar({ commit }, { file, id }) {
      return new Promise((resolve, reject) => {
        avatar({
          file,
          id
        }).then(res => {
          console.log(res)
          const data = res.data
          commit('setAvatar', "data:image/jpeg;base64," + data.payload.avatar)
          resolve()
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 修改密码
    handleChangePassword({ commit }, { changePassword: { oldPassword, password }, id }) {
      return new Promise((resolve, reject) => {
        changepassword({
          changePassword: { oldPassword, password },
          id
        }).then(res => {
          console.log(res)
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 获取组织列表
    handleGetOrganizations() {
      return new Promise((resolve, reject) => {
        getorganizations().then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 新建组织
    handleSetOrganizations({ }, { organizationCreate: { description, name } }) {
      return new Promise((resolve, reject) => {
        setorganizations(
          { organizationCreate: { description, name } }
        ).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 获取组织详情
    handleGetOrganizationDetail({ }, { id }) {
      return new Promise((resolve, reject) => {
        getorganizationdetail(
          id
        ).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 修改组织
    handleChangeOrganization({ }, { organizationPut: { allowCreateProject, description, memberPermission, name }, id }) {
      return new Promise((resolve, reject) => {
        changeorganization(
          { organizationPut: { allowCreateProject, description, memberPermission, name }, id }
        ).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 删除组织
    handleDeleteOrganization({ },  id ) {
      return new Promise((resolve, reject) => {
        deleteorganization(
           id 
        ).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 创建项目
    handleCreateProject({ },  {projectCreat:{description,name,orgId,pic}} ) {
      return new Promise((resolve, reject) => {
        createproject(
          {projectCreat:{description,name,orgId,pic}}
        ).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo() {
      try {
        console.log(res)
        const data = res.data
        commit('setToken', data.header.token)
        //commit('setAvatar', data.avatar)
        commit('setUserName', data.username)
        commit('setUserId', data.user_id)
        commit('setAccess', data.access)
        commit('setHasGetInfo', true)
      } catch (error) {
        console.log(error)
      }
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    // getUnreadMessageCount ({ state, commit }) {
    //   getUnreadCount().then(res => {
    //     const { data } = res
    //     commit('setMessageCount', data)
    //   })
    // },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    // getMessageList ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     getMessage().then(res => {
    //       const { unread, readed, trash } = res.data
    //       commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       commit('setMessageReadedList', readed.map(_ => {
    //         _.loading = false
    //         return _
    //       }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       commit('setMessageTrashList', trash.map(_ => {
    //         _.loading = false
    //         return _
    //       }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
