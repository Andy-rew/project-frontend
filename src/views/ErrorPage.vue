<template>
  <div style="height: 90vh">
    <b-card class="mx-auto b-card-pnf-full py-0" align="center">
      <div class="row-404-full">404</div>
      <br />
      <div id="row-page-not-found">СТРАНИЦА НЕ НАЙДЕНА</div>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageNotExist extends Vue {}
</script>

<style scoped lang="scss">
.row-404 {
  font-weight: 900;
}

.row-404-full {
  @extend .row-404;
  font-size: 170px;
}
#row-page-not-found {
  font-size: 35px;
  font-weight: 700;
}
.b-card-pnf {
  top: calc((100vh - 418px - 80px) / 2);
  color: #1e3799;
  border: 1px solid #1e3799;
  -moz-box-shadow: 0 0 10px #1e3799;
  -webkit-box-shadow: 0 0 10px #1e3799;
  box-shadow: 0 0 10px #1e3799;
}
.b-card-pnf-full {
  width: 500px;
  @extend .b-card-pnf;
}
</style>
