<template>
  <b-form-file
    v-model="value"
    :state="schema.required ? Boolean(value) : null"
    browse-text="Выбрать"
    placeholder="Выберите файл..."
    drop-placeholder="Перенесите файл..."
    :disabled="disabled"
    :required="schema.required"
    v-bind="bootstrapAttrs"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import { GenField } from 'vue-form-generator'
import _ from 'lodash'

@Component
export default class BootstrapFile extends Mixins(abstractField) {
  schema!: GenField

  public get bootstrapAttrs() {
    return _.pick(this.schema, ['form', 'size', 'plain', 'multiple'])
  }
}
</script>
