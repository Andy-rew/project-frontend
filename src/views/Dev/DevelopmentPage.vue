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
          <b-button @click="addAccident" variant="primary" class="ml-auto"
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
      title="Добавление участника"
      type="add"
      @reload="reDrawTable"
    ></EditAddModal>

    <EditAddModal
      ref="EditAddModal"
      editUserModalId="editUser"
      title="Редактирование участника"
      type="edit"
      :edit-model="editUserModel"
      @reload="reDrawTable"
    ></EditAddModal>

    <AddEditAccidentModal
      editAccidentModalId="addAccident"
      title="Добавление происшествия"
      type="add"
      @reload="reDrawTable"
    ></AddEditAccidentModal>

    <AddEditAccidentModal
      ref="EditAccidentModal"
      editAccidentModalId="editAccident"
      title="Добавление происшествия"
      type="edit"
      @reload="reDrawTable"
    ></AddEditAccidentModal>
    <h4 class="mt-3">Участник - происшествие</h4>
    <AccidentPersonForm></AccidentPersonForm>
    <ProtokolModal ref="Protokol"></ProtokolModal>
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
import UserAPI from '@/api/requests/user'
import _ from 'lodash'
import moment from 'moment'
import { GridApi } from 'ag-grid-community'
import ShowNumberModal from '@/components/ShowNumberModal.vue'
import UserFactory from '@/factories/userFactory'
import EditAddModal from '@/components/EditAddModal.vue'
import AddEditAccidentModal from '@/components/AddEditAccidentModal.vue'
import AccidentPersonForm from '@/components/AccidentPersonForm.vue'
import ProtokolModal from '@/components/ProtokolModal.vue'
import { rolesTranslation } from '@/config/roles/roles'

const Mapper = Vue.extend({
  computed: {
    ...mobileWidthMapper.mapState(['isMobile']),
  },
})

@Component({
  components: {
    AgGridVue,
    ActionRenderer,
    ShowNumberModal,
    EditAddModal,
    AddEditAccidentModal,
    AccidentPersonForm,
    ProtokolModal,
  },
})
export default class DevelopmentPage extends Mapper {
  $refs!: {
    EditAddModal: EditAddModal
    EditAccidentModal: AddEditAccidentModal
    Protokol: ProtokolModal
  }

  private gridApi?: GridApi
  private startDate = ''
  private endDate = ''
  private textOfModal = UserFactory.emptyText()
  private editUserModel: any

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
    this.reDrawTable()
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

  private addAccident() {
    this.$bvModal.show('addAccident')
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
            this.$refs.EditAddModal.openEditModal(e.data)
            this.$bvModal.show('editUser')
          },
          onInfo: async (e: any) => {
            const res = await UserAPI.getAccidentOfPerson(e.data?.id)
            this.textOfModal.text =
              ` ${e.data.name}` +
              ` ${e.data.surname}` +
              ` ${e.data.midname}` +
              ' упомянут(-а) в ' +
              _.toString(res.data.count) +
              ' происшествии(-ях)'
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
          onInfo: async (e: any) => {
            const res = await UserAPI.getProtocol(e.data?.accidentId)
            ;(res.data.registerDate as string) = moment(
              res.data.registerDate
            ).format('DD.MM.YYYY')
            res.data.people.map(
              (data: any) => (data.role = rolesTranslation[data.role])
            )
            this.$refs.Protokol.openModal(res.data)
            this.$bvModal.show('protocolModalId')
          },
          onEdit: (e: any) => {
            this.$refs.EditAccidentModal.openModal(e.data)
            ;(e.data.registerDate as string) = moment(
              e.data.registerDate
            ).format('DD.MM.YYYY')
            this.$bvModal.show('editAccident')
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
}
</script>

<style scoped lang="scss">
.tableWrapper {
  height: 50vh;
  width: 100%;
}
</style>
