const state = {
  menuList: []
}
const getters = {
  getMenuList (state) {
    return state.menuList
  }
}
const actions = {
  fetchMenuList ({commit}) {
    // axios.get('/api/menuList').then((res) => {
    //   console.log(res)
    //   commit('updateMenuList', res.data.result.menuList)
    // }).catch(() => {
    //
    // })
  }
}
const mutations = {
  updateMenuList (state, menuList) {
    state.menuList = menuList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
