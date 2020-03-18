import Vue from 'vue';
import Vuex from 'vuex';
import state from './states';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations
})

export default store;