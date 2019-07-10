import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/api/v1/login',
    data,
    method: 'post'
  })
}

export const register = ({ userName, email, password }) => {
  const data = {
    userName,
    email,
    password
  }
  return axios.request({
    url: '/api/v1/users/regist',
    data,
    method: 'post'
  })
}

export const activate = ({token}) => {
  return axios.request({
    url: '/api/v1/users/active/'+token,
    method: 'post'
  })
}

export const avatar = ({file,id}) => {
  return axios.request({
    url: '/api/v1/users/'+id+'/avatar',
    method: 'post',
    data: file
  })
}

export const changepassword = ({changePassword:{oldPassword,password},id}) => {
  return axios.request({
    url: '/api/v1/users/'+id+'/changepassword',
    method: 'put',
    data: 
      {oldPassword,password}
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getorganizations = () => {
  return axios.request({
    url: '/api/v1/organizations',
    method: 'get'
  })
}

export const setorganizations = ({organizationCreate:{description,name}}) => {
  return axios.request({
    url: '/api/v1/organizations/create',
    method: 'post',
    data:{
      description,
      name
    }
  })
}

export const getorganizationdetail = (id) => {
  return axios.request({
    url: '/api/v1/organizations/'+id,
    method: 'get',
    data:{
      id
    }
  })
}

export const changeorganization = ({organizationPut:{allowCreateProject,description,memberPermission,name},id}) => {
  return axios.request({
    url: '/api/v1/organizations/'+id,
    method: 'put',
    data:{
      allowCreateProject,id,description,memberPermission,name
    }
  })
}

export const deleteorganization = (id) => {
  return axios.request({
    url: '/api/v1/organizations/'+id,
    method: 'delete',
    data:{
      id
    }
  })
}

export const createproject = ({projectCreat:{description,name,orgId,pic}}) => {
  return axios.request({
    url: '/api/v1/projects',
    method: 'post',
    data:{
      description,name,orgId,pic
    }
  })
}


export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
