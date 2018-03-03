import Vue from 'vue'
import Vuex from 'vuex'
import list from './list/index'
import user from './user/index'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,list
  }
})