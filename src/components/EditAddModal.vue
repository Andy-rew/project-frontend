<template>
  <b-modal
    size="lg"
    :id="editUserModalId"
    :title="title"
    @hidden="onHidden"
    @ok="onSaveCallback"
  >
    <vue-form-generator :schema="modalSchema_" :model="userModel" />
    <b-badge variant="danger" />
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button @click="ok()" variant="primary">
        {{ textButton }}
      </b-button>
      <b-button @click="cancel()"> Отмена </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import { FormSchema } from 'vue-form-generator'
import UserFactory from '@/factories/userFactory'
import UserAPI from '@/api/requests/user'

@Component
export default class EditAddModal extends Vue {
  @Prop({ type: String, default: 'Редактирование участника' })
  readonly title!: string
  @Prop(String) editUserModalId!: string
  @Prop(String) type?: 'add' | 'edit'

  private textButton = 'Добавить'

  private userModel = UserFactory.emptyPerson()

  public openEditModal(params: any) {
    this.userModel = params
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
        model: 'surname',
        label: 'Фамилия',
        placeholder: 'Иванов',
      },
      {
        type: 'bootstrap',
        inputType: 'text',
        model: 'name',
        label: 'Имя',
        placeholder: 'Иван',
      },
      {
        type: 'bootstrap',
        inputType: 'text',
        model: 'midname',
        label: 'Отчество',
        placeholder: 'Иванович',
      },
      {
        type: 'bootstrap',
        inputType: 'text',
        model: 'address',
        label: 'Адрес',
        placeholder: 'Адрес',
      },
      {
        type: 'bootstrap',
        inputType: 'number',
        model: 'convictNum',
        label: 'Число судимостей',
      },
    ],
  }

  private async onSaveCallback() {
    if (this.userModel?.id !== 0 && this.type === 'edit') {
      await UserAPI.setPerson(this.userModel, this.userModel?.id)
    } else {
      await UserAPI.createPerson(this.userModel)
    }
    this.$emit('reload')
  }

  private onHidden() {
    this.userModel = UserFactory.emptyPerson()
  }
}
</script>
<style scoped lang="scss"></style>
