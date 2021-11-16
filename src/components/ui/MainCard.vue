<template>
  <div
    :class="{ 'd-flex': !noflex, 'flex-column': !noflex, 'flex-fill': !noflex }"
  >
    <b-card
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      header-class="MainCard__header"
      :no-body="noBody"
    >
      <template v-slot:header>
        <div class="d-flex flex-row align-items-center">
          <span
            v-if="icons && icons.length && tooltipStatus"
            class="pr-3 pl-3 mr-2 icon rounded-pill"
            style="color: black !important"
            :title="tooltipStatus"
          >
            <font-awesome-icon
              v-for="(icon, index) in icons"
              :key="index"
              :icon="icon"
              class="mr-2'"
            />
          </span>
          <b v-html="name" class="name" />
          <div class="ml-auto d-flex flex-row" style="height: 32px">
            <slot name="controls" />
          </div>
        </div>
      </template>
      <slot></slot>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MainCard extends Vue {
  @Prop({ type: String, required: true }) private readonly name!: string

  @Prop({ type: String, required: false })
  private readonly tooltipStatus!: string
  @Prop({ type: Array, required: false }) private readonly icons!: string[][]

  @Prop({ type: Boolean, default: false }) private readonly noflex!: boolean
  @Prop({ type: Boolean, default: false }) private readonly 'no-body'!: boolean

  @Prop({ type: Boolean, default: false }) private readonly linkIcon!: boolean
}
</script>

<style lang="scss" scoped>
@import '@/scss/_colors.scss';
.MainCard__header {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.icon {
  background-color: map-get($french-palette, 'yellow-3');
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
