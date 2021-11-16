<template>
  <b-form-textarea
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
export default class BootstrapTextArea extends Mixins(abstractField) {
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
      'rows',
      'max-rows',
      'wrap',
      'no-resize',
      'no-auto-shrink',
    ])
  }
}
</script>
