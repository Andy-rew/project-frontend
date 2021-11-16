<template>
  <div>
    <div>
      <h5>Table sample</h5>
      <div class="tableWrapper">
        <ag-grid-vue
          :columnDefs="columnDefs"
          :gridOptions="gridOptions"
          :rowData="rowData"
          class="ag-theme-alpine h-100"
        />
      </div>
      <hr />
      <h5>{{ `isMobile: ${isMobile}` }}</h5>
      <hr />
      <div>
        <h5>vue-form-generator</h5>
        <b-row>
          <b-col cols="6">
            <b-card>
              <vue-form-generator :schema="schema" :model="model" />
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card>
              <pre>{{ JSON.stringify(model, null, 4) }}</pre>
            </b-card>
          </b-col>
        </b-row>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
// Vue
import { Vue, Component } from 'vue-property-decorator'
// Table
import { AgGridVue } from 'ag-grid-vue'
import ActionRenderer from '@/components/table/ActionRenderer.vue'
// Mixin
import { mobileWidthMapper } from '@/store/modules/mobileWidth'
import AgGridFactory from '@/factories/agGridFactory'
import { FormSchema } from 'vue-form-generator'
import { userMapper } from '@/store/modules/user'

const Mapper = Vue.extend({
  computed: {
    ...mobileWidthMapper.mapState(['isMobile']),
  },
})

@Component({ components: { AgGridVue, ActionRenderer } })
export default class DevelopmentPage extends Mapper {
  // ================ Start Table ================
  private columnDefs = [
    {
      headerName: 'Фамилия',
      field: 'surname',
      colId: 'surname',
      filterParams: {
        buttons: ['reset'],
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: 'Имя',
      field: 'name',
      colId: 'name',
      filterParams: {
        buttons: ['reset'],
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: 'Отчество',
      field: 'midname',
      colId: 'midname',
      filterParams: {
        buttons: ['reset'],
        suppressAndOrCondition: true,
      },
    },
    {
      ...AgGridFactory.getActionColumn({
        cellRendererParams: {
          onEdit: (e: any) => {
            console.log(e)
          },
          onDelete: (e: any) => {
            console.log(e)
          },
          onInfo: (e: any) => {
            console.log(e)
          },
        },
        width: 140,
        maxWidth: 140,
      }),
    },
  ]
  private gridOptions = {
    ...AgGridFactory.getDefaultGridOptions(),
    pagination: true,
    paginationPageSize: 15,
  }
  private rowData = [
    {
      surname: 'Иванов',
      name: 'Владимир',
      midname: 'Сергеевич',
    },
    {
      surname: 'Ковынев',
      name: 'Максим',
      midname: 'Владимирович',
    },
  ]
  // ================ End Table ================

  private model = {
    greeting: ['hello'],
    greetingRadio: 'hello',
    texteditors: 'notepad++',
    text: 'Hello world!',
    year: 2020,
    rowData: this.rowData,
    date: '',
    skills: '',
    multiselectFIO: '',
  }

  private schema: FormSchema = {
    fields: [
      {
        type: 'bootstrapRadioGroup',
        model: 'greetingRadio',
        label: 'Language Greeting',
        values: ['hello', 'hola', 'привет'],
      },
      {
        type: 'multiselect',
        inputType: 'text',
        model: 'texteditors',
        label: 'Editor',
        options: ['vim', 'emacs', 'notepad++'],
        styleClasses: 'w-50 pr-2',
        tagPlaceholder: '',
      },
      {
        type: 'bootstrap',
        inputType: 'text',
        model: 'text',
        styleClasses: 'w-50',
        label: 'Sample label',
        placeholder: 'Sample placeholder',
      },
      {
        type: 'bootstrap',
        inputType: 'number',
        label: 'Year',
        model: 'year',
        min: 2000,
        max: 2100,
        number: true,
      },
      {
        type: 'agGrid',
        model: 'rowData',
        wrapHeader: true,
        noAddButton: false,
        buttonToolbar: true,
        required: true,
        disabled: false,
        noCloneButton: true,
        columnDefs: [
          {
            headerName: 'Фамилия',
            field: 'surname',
            width: 150,
          },
          {
            headerName: 'Имя',
            field: 'name',
            width: 150,
          },
          {
            headerName: 'Отчество',
            field: 'midname',
            width: 150,
          },
        ],
        gridOptions: {
          ...AgGridFactory.getDefaultGridOptions(),
          stopEditingWhenGridLosesFocus: true,
          domLayout: 'autoHeight',
          defaultColDef: {
            cellClass: 'cell-wrap-text',
            autoHeight: true,
            editable: true,
          },
        },
      },
      {
        type: 'bootstrapTextArea',
        label: 'TextArea',
        model: 'text',
        required: true,
        hint: 'Sample hint',
      },
      {
        type: 'datepicker',
        label: 'Date',
        model: 'date',
        styleClasses: 'w-50 pr-2',
      },
      {
        type: 'bootstrapCheckboxGroup',
        model: 'greeting',
        label: 'Language Greeting',
        styleClasses: 'w-50 pr-2',
        values: ['hello', 'hola', 'привет'],
        disabled: false,
      },
      {
        type: 'bootstrapSelect',
        label: 'Skills',
        model: 'skills',
        options: ['Javascript', 'VueJS', 'CSS3', 'HTML5'],
      },
      {
        type: 'multiselect',
        inputType: 'text',
        model: 'multiselectFIO',
        label: 'User FIO',
        options: this.rowData,
        styleClasses: 'w-100',
        customLabel({ surname, name, midname }: any) {
          if (surname) {
            return `${surname} ${name} ${midname} - человек`
          }
          return 'Выберите значение'
        },
        onChanged: (model: any, newV: any) => {
          model.multiselectFIO = newV.surname
        },
      },
    ].map((field) => ({
      ...field,
      required: true,
    })),
  }
}
</script>

<style scoped lang="scss">
.tableWrapper {
  height: 50vh;
  width: 100%;
}
</style>
