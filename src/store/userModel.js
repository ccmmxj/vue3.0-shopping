import axios from 'axios'
import qs from 'qs'
import router from '../base/router'
import host from '../base/addr'

const state = {
  user: undefined
}
const getters = {
  getUser (state) {
    return state.user
  }
}
const actions = {
  login ({commit}, data) {
    axios({
      method: 'POST',
      url: host.host + 'login',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials:true,
      data: qs.stringify(data),
      dataType: 'json'
    }).then((res) => {
      console.log(res)
      if (res.data.success) {
        commit('updateUser', res.data.result)
        router.push('/shopme/manage')
      } else {
        index.alert(res.data.message)
      }
    }).catch((err) => {
      console.log(err.data)
        index.alert(err.data)
    })
    // axios.post('http://127.0.0.1:8001/login' ,{username:username,password:password}).then((res) => {
    //   console.log(res)
    //   commit('updateUser', res.data.result.user)
    //   router.push('/shopme/manage')
    // }).catch(() => {
    //
    // })
  },
  logout ({commit}) {
    axios({
      method: 'GET',
      url: host.host + 'logout;jsessionid=' + state.user.sessionId,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials:true,
      data: qs.stringify({}),
      dataType: 'json'
    }).then((res) => {
      console.log(res)
      if (!res.data.success) {
        index.alert(res.data.message)
      }
    }).catch((err) => {
      console.log(err.data)
    })
    // axios.post('http://127.0.0.1:8001/login' ,{username:username,password:password}).then((res) => {
    //   console.log(res)
    //   commit('updateUser', res.data.result.user)
    //   router.push('/shopme/manage')
    // }).catch(() => {
    //
    // })
    commit('logoutUser')
  }
}
const mutations = {
  updateUser (state, user) {
    state.user = user
  },
  logoutUser (state) {
    state.user = undefined
    router.push('/shopme/logout')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
