/// <reference types="node" />

declare module 'vue-form-generator' {
  import { PluginObject } from 'vue'

  export type validatorFn = (
    value: any,
    field: GenField,
    model: any,
    messages: { [key: string]: string }
  ) => string[] | null

  export type localedValidtorFn = (
    value: any,
    field: GenField,
    model: any
  ) => string[] | null

  export interface GenField {
    type: string
    label?: string
    model: string
    id?: any

    inputName?: string
    featured?: boolean
    visible?: boolean | ((model: any) => boolean)
    disabled?: boolean
    required?: boolean
    multi?: boolean
    default?: any
    hint?: string
    help?: string
    validator?: localedValidtorFn | string | (string | localedValidtorFn)[]
    validateDebounceTime?: number
    buttons?: any[]
    attributes?: any

    onChanged?: (model: any, newVal: any, oldVal: any, field: any) => void
    onValidated?: (model: any, errors: any, field: any) => void

    [key: string]: any
  }

  export type ValidationResults = {
    field: GenField
    error: string
    index?: number
  }[]

  export interface Group {
    legend: string
    fields: GenField[]
  }

  export interface FormSchema {
    fields?: GenField[]
    groups?: Group[]
  }

  export interface FormOptions {
    validateAfterLoad?: boolean
    validateAfterChanged?: boolean
    fieldIdPrefix?: string
    validateAsync?: boolean
    validationErrorClass?: string
    validationSuccessClass?: string
    validateDebounceTime?: number
  }

  export const abstractField: any

  export type buildInValidator = validatorFn & {
    locale: (messages: { [key: string]: string }) => localedValidtorFn
  }

  export const validators: {
    [key: string]: buildInValidator
  }

  const VueFormGenerator: PluginObject<any>
  export default VueFormGenerator
}
