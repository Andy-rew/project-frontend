<template>
  <b-modal size="md" :id="modalId" title="Количество происшествий">
    <div>
      {{ text }}
    </div>
    <template v-slot:modal-footer="{ ok }">
      <b-button @click="ok()" variant="primary"> Ок </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ShowNumberModal extends Vue {
  @Prop(String) modalId!: string
  @Prop(String) text!: string
}
</script>

<style scoped></style>
