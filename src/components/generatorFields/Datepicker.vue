<template>
  <date-picker
    v-model="value"
    v-bind="attrs"
    class="w-100"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import _ from 'lodash'

import { GenField } from 'vue-form-generator'
import { schemaAttributes } from '@/config/fields/schema'

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ru'

@Component({ components: { DatePicker } })
export default class DatepickerField extends Mixins(abstractField) {
  schema!: GenField

  public get attrs() {
    return {
      format: 'DD.MM.YYYY',
      'value-type': 'format',
      type: this.schema.inputType ?? 'date',
      ..._.omit(this.schema, [...schemaAttributes, 'styleClasses']),
    }
  }
}
</script>
