<template>
  <b-modal size="lg" id="protocolModalId" title="Протокол" @hidden="onHidden">
    <strong>Информация о происшествии: </strong> {{ this.protocolModel.info }}
    <br />
    <strong>Дата регистрации</strong> {{ this.protocolModel.registerDate }}
    <br />
    <strong>Вынесенное решение: </strong> {{ this.protocolModel.solution }}
    <br />
    <strong>Участники происшествия: </strong>
    <br />
    <div v-for="(value, index) in protocolModel.people" :key="index">
      {{
        value.person.name +
        ' ' +
        value.person.surname +
        ' ' +
        value.person.midname +
        ' - ' +
        value.role
      }}
    </div>
    <template v-slot:modal-footer="{ ok }">
      <b-button @click="ok()" variant="primary"> Ок </b-button>
    </template>
  </b-modal>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserFactory from '@/factories/userFactory'

@Component
export default class ProtokolModal extends Vue {
  private protocolModel = UserFactory.emptyProtocol()
  private text = ''

  public openModal(params: any) {
    this.protocolModel = params
  }

  private created() {
    this.text += `<strong>Информация: </strong> ${this.protocolModel.info}`
  }

  private onHidden() {
    this.protocolModel = UserFactory.emptyProtocol()
  }
}
</script>
