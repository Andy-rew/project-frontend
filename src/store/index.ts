import Vue from 'vue'
import Vuex from 'vuex'

import { Module, createStore } from 'vuex-smart-module'

// Modules
import { mobileWidth } from '@/store/modules/mobileWidth'

Vue.use(Vuex)

const root = new Module({
  modules: {
    mobileWidth,
  },
})
export default createStore(root)
