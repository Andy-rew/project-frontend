<template>
  <b-form-datepicker
    v-model="value"
    :disabled="disabled"
    :required="schema.required"
    :initial-date="schema.default"
    v-bind="bootstrapAttrs"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import _ from 'lodash'
import { schemaAttributes } from '@/config/fields/schema'
import { GenField } from 'vue-form-generator'

@Component
export default class BootstrapDatepicker extends Mixins(abstractField) {
  schema!: GenField

  public get bootstrapAttrs() {
    return _.omit(this.schema, schemaAttributes)
  }
}
</script>
