import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'

/* Bootstrap */
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

/* Fonts Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'

library.add(fas, far)
dom.watch()

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* Custom Field */
import AgGridField from '@/components/generatorFields/AgGrid.vue'
import BoostrapDatepicker from '@/components/generatorFields/BootstrapDatepicker.vue'
import BootstrapCheckboxGroup from '@/components/generatorFields/BootstrapCheckboxGroup.vue'
import BootstrapCheckbox from '@/components/generatorFields/BootstrapCheckbox.vue'
import BootstrapField from '@/components/generatorFields/Bootstrap.vue'
import BootstrapRadioGroup from '@/components/generatorFields/BootstrapRadioGroup.vue'
import BootstrapSelect from '@/components/generatorFields/BootstrapSelect.vue'
import BootstrapTextArea from '@/components/generatorFields/BootstrapTextArea.vue'
import DatePicker from '@/components/generatorFields/Datepicker.vue'
import MultiselectField from '@/components/generatorFields/MultiSelect.vue'
import BootstrapFile from '@/components/generatorFields/BootstrapFile.vue'

Vue.component('fieldAgGrid', AgGridField)
Vue.component('fieldBootstrap', BootstrapField)
Vue.component('fieldBootstrapFile', BootstrapFile)
Vue.component('fieldBootstrapCheckboxGroup', BootstrapCheckboxGroup)
Vue.component('fieldBootstrapCheckbox', BootstrapCheckbox)
Vue.component('fieldBootstrapDatepicker', BoostrapDatepicker)
Vue.component('fieldBootstrapRadioGroup', BootstrapRadioGroup)
Vue.component('fieldBootstrapSelect', BootstrapSelect)
Vue.component('fieldBootstrapTextArea', BootstrapTextArea)
Vue.component('fieldDatepicker', DatePicker)
Vue.component('fieldMultiselect', MultiselectField)

/* Form Generator */
import VueFormGenerator from 'vue-form-generator'
Vue.use(VueFormGenerator)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false
  Vue.config.silent = true
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
