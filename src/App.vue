<template>
  <div id="app">
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MobileWidthMixin from '@/mixins/mobile'

@Component({ mixins: [MobileWidthMixin] })
export default class App extends Vue {}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import './scss/app.scss';
@import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
@import '../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css';
@import '../node_modules/vue-form-generator/dist/vfg.css';
//@import './scss/vfg.scss';
</style>
