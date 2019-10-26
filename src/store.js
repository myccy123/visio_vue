import Vue from 'vue'
import Vuex from 'vuex'

// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
const store = {
  state: {
    message: 'Hello!'
  },
  setMessageAction(newValue) {
    this.state.message = newValue
  },
  clearMessageAction() {
    this.state.message = ''
  }
};

export default store;
