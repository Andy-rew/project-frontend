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
          <b-button
            @click="updateTableWithDate"
            variant="primary"
            class="ml-auto"
            >Добавить происшествие</b-button
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
    </div>

    <div class="mt-5">
      <h4>Список участников</h4>
      <b-form inline>
        <b-button @click="openAddEditModal" variant="primary" class="ml-auto"
          >Добавить участника</b-button
        >
      </b-form>

      <div class="tableWrapper mt-3">
        <ag-grid-vue
          :columnDefs="columnDefsPeople"
          :gridOptions="gridOptionsPeople"
          :rowData="rowDataPeople"
          class="ag-theme-alpine h-100"
        />
      </div>
    </div>
    <ShowNumberModal modal-id="countModal" :text="textOfModal.text">
    </ShowNumberModal>

    <EditAddModal
      editUserModalId="addUser"
      title="Приглашение пользователя"
      type="add"
      @reload="reDrawTable"
    ></EditAddModal>
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
import ShowNumberModal from '@/components/ShowNumberModal.vue'
import UserFactory from '@/factories/userFactory'
import EditAddModal from '@/components/EditAddModal.vue'

const Mapper = Vue.extend({
  computed: {
    ...mobileWidthMapper.mapState(['isMobile']),
  },
})

@Component({
  components: { AgGridVue, ActionRenderer, ShowNumberModal, EditAddModal },
})
export default class DevelopmentPage extends Mapper {
  private gridApi?: GridApi
  private startDate = ''
  private endDate = ''

  private textOfModal = UserFactory.emptyText()

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
    const people = await UserAPI.getPeople()
    this.rowDataPeople = people.data?.people
    this.gridApi?.setRowData(this.rowDataPeople)
  }

  private openAddEditModal() {
    this.$bvModal.show('addUser')
  }

  private columnDefsPeople = [
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
      headerName: 'Адрес',
      field: 'address',
      colId: 'address',
      filterParams: {
        buttons: ['reset'],
        suppressAndOrCondition: true,
      },
    },
    {
      headerName: 'Число судимостей',
      field: 'convictNum',
      colId: 'convictNum',
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
          onInfo: async (e: any) => {
            const res = await UserAPI.getAccidentOfPerson(e.data?.id)
            this.textOfModal.text = _.toString(res.data.count)
            this.$bvModal.show('countModal')
          },
          onDelete: async (e: any) => {
            await UserAPI.deletePerson(e.data?.id)
            await this.reDrawTable()
          },
        },
        width: 140,
        maxWidth: 140,
      }),
    },
  ]

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
      const response1 = await UserAPI.getPeople()
      if (response) {
        this.rowData = response.data.accidents
        this.gridApi.setRowData(this.rowData)
      }
      if (response1) {
        this.rowDataPeople = response1.data.people
        this.gridApi.setRowData(this.rowDataPeople)
      }
    }
  }

  private onGridReady({ api }: { api: any }) {
    api.setRowData(this.rowData)
    this.gridApi = api
  }

  private onGridReadyPeople({ api }: { api: any }) {
    api.setRowData(this.rowDataPeople)
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

  private gridOptionsPeople = {
    ...AgGridFactory.getDefaultGridOptions(),
    defaultColDef: {
      editable: false,
      sortable: true,
      filter: true,
      resizable: true,
    },
    pagination: true,
    paginationPageSize: 15,
    onGridReady: this.onGridReadyPeople,
    components: {
      AgGridFactory,
    },
    frameworkComponents: {
      ActionRenderer,
    },
  }
  private rowDataPeople = []
  private rowData = []

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
