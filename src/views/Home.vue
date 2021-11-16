<template>
  <div>
    <div class="p-3" style="overflow-x: hidden">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  onReload() {
    location.reload(true)
  }
}
</script>

<style lang="scss">
.card-main {
  height: calc(100vh - 100px);
}
.tableWrapper {
  height: 75vh;
}
.hint {
  font-style: italic;
  font-size: 0.8em;
}
</style>
