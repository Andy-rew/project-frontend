<template>
  <div>
    <b-card>
      <vue-form-generator :schema="modalSchema_" :model="selectModel" />
      <b-form inline>
        <b-button @click="onSaveCallback" variant="primary" class="ml-auto mt-4"
          >Добавить связь</b-button
        >
      </b-form>
    </b-card>
    <b-toast id="toast" variant="success" title="Успешно">
      Связь добавлена
    </b-toast>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FormSchema } from 'vue-form-generator'
import UserFactory from '@/factories/userFactory'
import UserAPI from '@/api/requests/user'
import { rolesTranslation } from '@/config/roles/roles'

@Component
export default class AccidentPersonForm extends Vue {
  private selectModel = UserFactory.emptySelects()
  private sendModel = UserFactory.sendSelects()

  private async created() {
    const accidents = await UserAPI.getAccidents(null)
    const people = await UserAPI.getPeople()
    this.modalSchema_.fields!.find((item) => item.model === 'people')!.options =
      people.data.people

    this.modalSchema_.fields!.find(
      (item) => item.model === 'accidents'
    )!.options = accidents.data.accidents
  }

  private listRoles = Object.keys(rolesTranslation).map((key) => ({
    text: rolesTranslation[key],
    value: key,
  }))

  private modalSchema_: FormSchema = {
    fields: [
      {
        type: 'multiselect',
        inputType: 'text',
        model: 'people',
        placeholder: 'Выберите участника происшествия',
        trackBy: 'id',
        options: [],
        multiple: false,
        customLabel({ name, surname, midname }: any) {
          return name + ' ' + surname + ' ' + midname
        },
        styleClasses: 'col-md-4',
      },
      {
        type: 'multiselect',
        model: 'accidents',
        placeholder: 'Выберите происшествия',
        options: [],
        trackBy: 'accidentId',
        multiple: true,
        customLabel({ info }: any) {
          return info
        },
        styleClasses: 'col-md-6',
      },
      {
        type: 'multiselect',
        model: 'roles',
        placeholder: 'Выберите роли',
        options: this.listRoles,
        multiple: false,
        customLabel({ text }: any) {
          return text
        },
        styleClasses: 'col-md-2',
      },
    ],
  }

  private async onSaveCallback() {
    this.sendModel.role = (this.selectModel.roles as any).value
    this.sendModel.person = (this.selectModel.people as any).id
    this.sendModel.accidents = this.selectModel.accidents.map(
      (ac: any) => ac.accidentId
    )
    await UserAPI.setPersonAccidents(this.sendModel)
    this.$bvToast.show('toast')
  }
}
</script>
<style scoped lang="scss"></style>
