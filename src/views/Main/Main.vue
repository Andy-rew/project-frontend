<template>
  <div>
    <h2 class="mb-2 title">{{ title }}</h2>
    <figure>
      <img src="logo-leti.png" />
    </figure>
  </div>
</template>

<script lang="ts">
// Vue
import { Component, Vue } from 'vue-property-decorator'
// Config
import Config from '@/config/default/config'

@Component
export default class Main extends Vue {
  private title = Config.systemTitle.fullName
}
</script>

<style lang="scss" scoped>
@import '@/scss/_colors';

.title {
  color: $etu-official-color-blue;
}

h2,
figure {
  text-align: center;
  margin: 0 auto;
}

figure {
  margin: 0 0 1em 0;
}

img {
  width: 100%;
  max-width: 1000px;
  margin: 0 0 1em 0;
}
</style>
