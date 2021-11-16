<template>
  <b-form-input
    :type="schema.inputType"
    v-model="value"
    :disabled="disabled"
    :required="schema.required"
    :default="schema.default"
    v-bind="bootstrapAttrs"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import { GenField } from 'vue-form-generator'
import _ from 'lodash'

@Component
export default class BootstrapInput extends Mixins(abstractField) {
  schema!: GenField

  public get bootstrapAttrs() {
    return _.pick(this.schema, [
      'size',
      'readonly',
      'plaintext',
      'autocomplete',
      'placeholder',
      'formatter',
      'lazy-formatter',
      'lazy',
      'debounce',
      'no-wheel',
      'min',
      'max',
      'step',
      'list',
      'number',
    ])
  }
}
</script>
