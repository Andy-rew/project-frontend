import { Vue, Component } from 'vue-property-decorator'
import Config from '@/config/default/config.ts'
import { mobileWidthMapper } from '@/store/modules/mobileWidth'

const Mapper = Vue.extend({
  methods: {
    ...mobileWidthMapper.mapMutations(['setWindowWidth']),
  },
})

@Component
export default class MobileWidthMixin extends Mapper {
  private created() {
    window.addEventListener('resize', this.windowEventHandler)
  }
  private destroyed() {
    window.removeEventListener('resize', this.windowEventHandler)
  }
  private windowEventHandler() {
    this.$nextTick(() => {
      this.setWindowWidth(window?.innerWidth ?? Config.defaultWidth)
    })
  }
}
