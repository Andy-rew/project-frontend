import { Getters, Mutations, Module, createMapper } from 'vuex-smart-module'
import Config from '@/config/default/config'

class MobileWidthState {
  isMobile = false
  windowWidth: number = Config.defaultWidth
}

class MobileWidthGetters extends Getters<MobileWidthState> {
  get isMobile() {
    return this.state.isMobile
  }
  get windowWidth() {
    return this.state.windowWidth
  }
}

class MobileWidthMutations extends Mutations<MobileWidthState> {
  setWindowWidth(w: number) {
    this.state.windowWidth = w
    this.state.isMobile = w <= Config.mobileWidth
  }
}

export const mobileWidth = new Module({
  state: MobileWidthState,
  getters: MobileWidthGetters,
  mutations: MobileWidthMutations,
})

export const mobileWidthMapper = createMapper(mobileWidth)
