<template>
  <div>
    <div>
      <h4>Происшествия</h4>
      <div class="mb-3 mt-4">
        <b-form inline>
          <label class="mr-2">Дата начала:</label>
          <b-form-input
            id="inlineStartDate"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Введите дату"
            type="date"
            v-model="startDate"
          ></b-form-input>

          <label class="ml-5 mr-2">Дата окончания:</label>
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              id="inlineEndDate"
              placeholder="Введите дату"
              type="date"
              v-model="endDate"
            ></b-form-input>
          </b-input-group>

          <b-button @click="updateTableWithDate" variant="primary"
            >Обновить таблицу</b-button
          >
        </b-form>
      </div>
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
import UserAPI from '@/api/requests/user'
import _ from 'lodash'
import moment from 'moment'
import { GridApi } from 'ag-grid-community'

const Mapper = Vue.extend({
  computed: {
    ...mobileWidthMapper.mapState(['isMobile']),
  },
})

@Component({ components: { AgGridVue, ActionRenderer } })
export default class DevelopmentPage extends Mapper {
  private gridApi?: GridApi
  private startDate = ''
  private endDate = ''

  private async updateTableWithDate() {
    if (this.startDate === '' || this.endDate === '') {
      this.rowData = (await UserAPI.getAccidents(null)).data?.accidents
      this.gridApi?.setRowData(this.rowData)
    } else {
      this.rowData = (
        await UserAPI.getAccidentsDate(this.startDate, this.endDate)
      ).data?.accidents
      this.gridApi?.setRowData(this.rowData)
    }
  }

  private async created() {
    const accidents = await UserAPI.getAccidents(null)
    this.rowData = accidents.data?.accidents
    this.gridApi?.setRowData(this.rowData)
  }

  // ================ Start Table ================
  // private columnDefs = [
  //   {
  //     headerName: 'Фамилия',
  //     field: 'surname',
  //     colId: 'surname',
  //     filterParams: {
  //       buttons: ['reset'],
  //       suppressAndOrCondition: true,
  //     },
  //   },
  //   {
  //     headerName: 'Имя',
  //     field: 'name',
  //     colId: 'name',
  //     filterParams: {
  //       buttons: ['reset'],
  //       suppressAndOrCondition: true,
  //     },
  //   },
  //   {
  //     headerName: 'Отчество',
  //     field: 'midname',
  //     colId: 'midname',
  //     filterParams: {
  //       buttons: ['reset'],
  //       suppressAndOrCondition: true,
  //     },
  //   },
  //   {
  //     ...AgGridFactory.getActionColumn({
  //       cellRendererParams: {
  //         onEdit: (e: any) => {
  //           console.log(e)
  //         },
  //         onDelete: (e: any) => {
  //           console.log(e)
  //         },
  //         onInfo: (e: any) => {
  //           console.log(e)
  //         },
  //       },
  //       width: 140,
  //       maxWidth: 140,
  //     }),
  //   },
  // ]

  private columnDefs = [
    {
      headerName: 'Информация',
      field: 'info',
      colId: 'info',
      filterParams: {
        buttons: ['reset'],
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: 'Решение',
      field: 'solution',
      colId: 'solution',
      filterParams: {
        buttons: ['reset'],
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: 'Дата регистрации',
      field: 'registerDate',
      colId: 'registerDate',
      filter: 'agDateColumnFilter',
      filterParams: {
        buttons: ['reset'],
      },
      valueFormatter(params: any) {
        if (_.isEmpty(params.value)) {
          return 'Не указано'
        } else {
          return moment(params.value).format('DD.MM.YYYY')
        }
      },
    },
    {
      ...AgGridFactory.getActionColumn({
        cellRendererParams: {
          onEdit: (e: any) => {
            console.log(e)
          },
          onDelete: async (e: any) => {
            await UserAPI.deleteAccident(e.data?.accidentId)
            this.reDrawTable()
          },
        },
        width: 140,
        maxWidth: 140,
      }),
    },
  ]

  private async reDrawTable() {
    if (this.gridApi) {
      const response = await UserAPI.getAccidents(null)
      if (response) {
        this.rowData = response.data.accidents
        this.gridApi.setRowData(this.rowData)
      }
    }
  }

  private onGridReady({ api }: { api: any }) {
    api.setRowData(this.rowData)
    this.gridApi = api
  }

  private gridOptions = {
    ...AgGridFactory.getDefaultGridOptions(),
    defaultColDef: {
      editable: false,
      sortable: true,
      filter: true,
      resizable: true,
    },
    pagination: true,
    paginationPageSize: 15,
    onGridReady: this.onGridReady,
    components: {
      AgGridFactory,
    },
    frameworkComponents: {
      ActionRenderer,
    },
  }
  // private rowData = [
  //   {
  //     surname: 'Иванов',
  //     name: 'Владимир',
  //     midname: 'Сергеевич',
  //   },
  //   {
  //     surname: 'Ковынев',
  //     name: 'Максим',
  //     midname: 'Владимирович',
  //   },
  // ]
  private rowData = []

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
