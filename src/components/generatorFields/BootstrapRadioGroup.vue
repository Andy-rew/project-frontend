<template>
  <b-radio-group
    :type="schema.inputType"
    v-model="value"
    :disabled="disabled || schema.readonly"
    :required="schema.required"
    :options="schema.values"
    v-bind="bootstrapAttrs"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import { GenField } from 'vue-form-generator'
import _ from 'lodash'

@Component
export default class BootstrapRadioGroup extends Mixins(abstractField) {
  schema!: GenField

  public get bootstrapAttrs() {
    return {
      buttons: this.schema.buttons_,
      ..._.pick(this.schema, [
        'form',
        'stacked',
        'plain',
        'button-variant',
        'value-field',
        'text-field',
        'html-field',
        'disabled-field',
        'size',
      ]),
    }
  }
}
</script>
