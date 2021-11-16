<template>
  <MultiSelect
    v-model="value"
    :options="schema.options"
    :taggable="schema.taggable"
    :disabled="disabled"
    :label="schema.multiselectLabel"
    v-bind="options"
    @tag="addTag"
    @select="select"
    @remove="remove"
  >
    <template v-slot:noOptions> Список пуст </template>
    <template v-slot:noResult> Ничего не найдено </template>
    <template v-slot:maxElements>
      Выбрано максимальное количество результатов
    </template>
  </MultiSelect>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import MultiSelect from 'vue-multiselect'
import _ from 'lodash'
import { schemaAttributes } from '@/config/fields/schema'
import { GenField } from 'vue-form-generator'
import ruMultiselect from '@/config/translation/multiselect'
import ruMultiselectMobile from '@/config/translation/multiselectMobile'
import { mobileWidthMapper } from '@/store/modules/mobileWidth'

const Mapper = Vue.extend({
  computed: {
    ...mobileWidthMapper.mapState(['isMobile']),
  },
})

@Component({ components: { MultiSelect }, mixins: [abstractField] })
export default class MultiselectField extends Mapper {
  schema!: GenField
  value!: any

  get options() {
    return {
      ...(this.isMobile ? ruMultiselectMobile : ruMultiselect),
      ..._.omit(this.schema, [...schemaAttributes, 'methods']),
    }
  }

  addTag(newTag: string) {
    if (this.schema.addTag) {
      return this.schema.addTag(newTag)
    } else {
      if (this.value) {
        this.value = [...this.value, newTag]
      } else {
        this.value = [newTag]
      }
    }
  }

  select(obj: any) {
    if (this.schema.select) {
      this.schema.select(obj)
    }
  }

  remove(obj: any) {
    if (this.schema.remove) {
      this.schema.remove(obj)
    }
  }
}
</script>
