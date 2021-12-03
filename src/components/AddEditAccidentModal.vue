<template>
  <b-modal
    size="lg"
    :id="editAccidentModalId"
    :title="title"
    @hidden="onHidden"
    @ok="onSaveCallback"
  >
    <vue-form-generator :schema="modalSchema_" :model="accidentModel" />
    <b-badge variant="danger" />
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button @click="ok()" variant="primary">
        {{ textButton }}
      </b-button>
      <b-button @click="cancel()"> Отмена </b-button>
    </template>
  </b-modal>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import { FormSchema } from 'vue-form-generator'
import UserFactory from '@/factories/userFactory'
import UserAPI from '@/api/requests/user'
import moment from 'moment'
import dateFormat from '@/config/dateFormat'

@Component
export default class AddEditAccidentModal extends Vue {
  @Prop({ type: String, default: 'Редактирование происшествия' })
  readonly title!: string
  @Prop(String) editAccidentModalId!: string
  @Prop(String) type?: 'add' | 'edit'

  private textButton = 'Добавить'

  private accidentModel = UserFactory.emptyAccident()

  public openModal(params: any) {
    this.accidentModel = params
  }

  private created() {
    if (this.type === 'edit') {
      this.textButton = 'Сохранить изменения'
    }
  }

  private modalSchema_: FormSchema = {
    fields: [
      {
        type: 'bootstrap',
        inputType: 'text',
        model: 'info',
        label: 'Информация',
        placeholder: 'Информация о происшествии',
      },
      {
        type: 'bootstrap',
        inputType: 'text',
        model: 'solution',
        label: 'Решение',
        placeholder: 'Вынесенное решение',
      },
      {
        type: 'datepicker',
        model: 'registerDate',
        label: 'Дата регистрации',
      },
    ],
  }

  private async onSaveCallback() {
    ;(this.accidentModel.registerDate as string) = moment(
      this.accidentModel.registerDate,
      dateFormat.date.localFormat
    ).format()
    if (this.type === 'add' && this.accidentModel.accidentId === 0) {
      await UserAPI.createAccident(this.accidentModel)
    } else {
      await UserAPI.setAccident(
        this.accidentModel,
        this.accidentModel?.accidentId
      )
    }
    this.$emit('reload')
  }

  private onHidden() {
    this.accidentModel = UserFactory.emptyAccident()
  }
}
</script>
