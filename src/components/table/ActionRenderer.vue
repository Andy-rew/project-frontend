<template>
  <div v-if="!noActions" class="ActionRenderer__Buttons">
    <b-button-group>
      <b-button
        @click="onPrint"
        v-if="this.params.onPrint && checkType('onPrint')"
      >
        <font-awesome-icon :icon="['fas', 'print']" />
      </b-button>
      <b-button
        @click="onConfirm"
        v-if="this.params.onConfirm && checkType('onConfirm')"
      >
        <font-awesome-icon :icon="['fas', 'check']" />
      </b-button>
      <b-button
        @click="onDownload"
        v-if="this.params.onDownload && checkType('onDownload')"
      >
        <font-awesome-icon :icon="['fas', 'file-download']" />
      </b-button>
      <b-button
        @click="onEdit"
        v-if="this.params.onEdit && checkType('onEdit')"
      >
        <font-awesome-icon :icon="['fas', 'edit']" />
      </b-button>
      <b-button
        @click="onDelete"
        v-if="this.params.onDelete && checkType('onDelete')"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </b-button>
      <b-button
        @click="onInfo"
        v-if="this.params.onInfo && checkType('onInfo')"
      >
        <font-awesome-icon :icon="['fas', 'info']" />
      </b-button>
      <b-button
        @click="onLink"
        v-if="this.params.onLink && checkType('onLink')"
      >
        <font-awesome-icon :icon="['fas', 'external-link-alt']" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICellRendererParams } from 'ag-grid-community'

interface Params extends ICellRendererParams {
  [key: string]: any
}

@Component
export default class AgGridField extends Vue {
  params!: Params
  noActions = false
  noConfirm = false

  created() {
    if (this.params.data) {
      if (this.params.data._noActions) {
        this.noActions = true
      }
      if (this.params.data._noConfirm) {
        this.noConfirm = true
      }
    }
  }

  checkType(type: string) {
    return this.params.getActionByType
      ? this.params.getActionByType(this.params).includes(type)
      : true
  }
  onDelete() {
    this.params.onDelete(this.params)
  }

  onEdit() {
    this.params.onEdit(this.params)
  }

  onInfo() {
    this.params.onInfo(this.params)
  }

  onLink() {
    this.params.onLink(this.params)
  }

  onDownload() {
    this.params.onDownload(this.params)
  }

  onPrint() {
    this.params.onPrint(this.params)
  }

  onConfirm() {
    this.params.onConfirm(this.params)
  }
}
</script>

<style lang="scss" scoped>
.ActionRenderer__Buttons {
  display: flex;
  height: 40px;
  vertical-align: top;
  padding: 3px 0;
}
</style>
