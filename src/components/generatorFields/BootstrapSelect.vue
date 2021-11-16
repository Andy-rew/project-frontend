<template>
  <b-form-select
    v-model="value"
    :disabled="disabled"
    :required="schema.required"
    :options="schema.options"
    v-bind="bootstrapAttrs"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import { GenField } from 'vue-form-generator'
import _ from 'lodash'

@Component
export default class BootstrapSelect extends Mixins(abstractField) {
  schema!: GenField

  public get bootstrapAttrs() {
    return _.pick(this.schema, [
      'form',
      'size',
      'plain',
      'options',
      'value-field',
      'text-field',
      'html-field',
      'disabled-field',
      'label-field',
      'option-field',
      'multiple',
      'select-size',
    ])
  }
}
</script>
