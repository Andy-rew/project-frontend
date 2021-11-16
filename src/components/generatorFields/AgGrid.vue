<template>
  <div class="w-100">
    <div
      v-if="schema.buttonToolbar && !schema.noAddButton"
      class="d-flex flex-row justify-content-end mb-1"
    >
      <b-button-group>
        <b-button
          v-if="!schema.noAddButton && !schema.disabled"
          variant="primary-outline"
          :disabled="schema.disabled"
          @click="onAdd"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          Добавить
        </b-button>
      </b-button-group>
    </div>
    <ag-grid-vue
      :columnDefs="columnDefs"
      :gridOptions="schema.gridOptions"
      class="ag-theme-alpine"
      v-model="value"
      :style="style"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import { AgGridVue } from 'ag-grid-vue'
import _ from 'lodash'
import { GenField } from 'vue-form-generator'
import { GridApi } from 'ag-grid-community'
import { ICellRendererParams, ColDef } from 'ag-grid-community'
import ActionRenderer from '@/components/table/ActionRenderer.vue'
import AgGridFactory from '@/factories/agGridFactory'
import store from '@/store'

@Component({ components: { AgGridVue, ActionRenderer } })
export default class AgGridField extends Mixins(abstractField) {
  private schema!: GenField
  private value!: any[]

  updated() {
    if (!store.state['mobileWidth']['isMobile']) {
      this.schema.gridOptions.api.sizeColumnsToFit()
    }
  }

  private get gridApi(): GridApi {
    return this.schema.gridOptions.api
  }

  private get columnDefs(): ColDef[] {
    let colDefs = _.cloneDeep(this.schema.columnDefs)
    for (const column of colDefs) {
      column.editable =
        (!_.isNil(column.editable)
          ? column.editable
          : this.schema.gridOptions.defaultColDef.editable) &&
        !this.schema.disabled
    }

    if (this.schema.buttonToolbar && !this.schema.disabled) {
      colDefs.push({
        ...AgGridFactory.getActionColumn({
          cellRendererParams: {
            onDelete: this.onDelete,
            onClone: this.schema.noCloneButton ? null : this.onClone,
          },
        }),
      })
    }
    if (this.schema.wrapHeader) {
      colDefs = colDefs.map((colDef: any) => ({
        ...colDef,
        headerClass: 'AgGridHeader-wrap',
      }))
    }
    return colDefs
  }

  private get style() {
    if (this.schema.style) {
      return this.schema.style
    }

    if (this.schema.gridOptions.domLayout) {
      return {
        width: '100%',
      }
    }
    return {
      width: '100%',
      height: '400px',
    }
  }

  private onAdd() {
    if (!this.value) {
      this.value = [{}]
    } else {
      this.value = [...this.value, {}]
    }
  }

  private onDelete(params: ICellRendererParams) {
    this.value = this.value.filter((i, index) => index !== params.rowIndex)
    this.$nextTick(() => {
      if (this.schema.deleteCallback) {
        this.schema.deleteCallback(this.gridApi)
      }
    })
  }
  private onClone(params: ICellRendererParams) {
    this.value = [
      ...this.value.filter((i, index) => index <= params.rowIndex),
      _.cloneDeep(this.value.find((i, index) => index === params.rowIndex)),
      ...this.value.filter((i, index) => index > params.rowIndex),
    ]
    this.$nextTick(() => {
      if (this.schema.cloneCallback) {
        this.schema.cloneCallback(this.gridApi)
      }
    })
  }
  private created() {
    if (this.schema.gridOptions && !this.schema.gridOptions.onGridReady) {
      this.schema.gridOptions.onGridReady = this.onGridReady
    }
  }
  private onGridReady({ api }: { api: GridApi }) {
    if (!store.state['mobileWidth']['isMobile']) {
      api.sizeColumnsToFit()
    }
    api.resetRowHeights()
  }
}
</script>

<style lang="scss">
.AgGridHeader-wrap {
  .ag-header-cell-label .ag-header-cell-text {
    white-space: normal !important;
  }
}
</style>
