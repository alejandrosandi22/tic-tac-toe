import { createStore } from 'vuex'

export default createStore({
  state: {
    toggle: false
  },
  getters: {
  },
  mutations: {
    usersToggle(state){ 
      if (state.toggle) state.toggle = false;
      else state.toggle = true;
    }
  },
  actions: {
    showAndHideUsers(context){
      context.commit('usersToggle');
    }
  },
  modules: {
  }
})
