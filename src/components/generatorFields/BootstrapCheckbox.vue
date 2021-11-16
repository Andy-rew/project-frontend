<template>
  <b-form-checkbox
    :type="schema.inputType"
    v-model="value"
    :disabled="disabled"
    :required="schema.required"
    v-bind="bootstrapAttrs"
  >
    {{ schema.text }}
    <span v-if="schema.helpText" :title="schema.helpText">
      <font-awesome-icon :icon="['fas', 'question-circle']" />
    </span>
  </b-form-checkbox>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import { GenField } from 'vue-form-generator'
import _ from 'lodash'

@Component
export default class BootstrapCheckboxGroup extends Mixins(abstractField) {
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
