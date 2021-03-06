import type {Ref, ComputedRef } from 'vue'
export type MaybeRef<T> = Ref<T> | ComputedRef<T> | T

export * from './auth-provider'
export * from './common'
export * from './request-data-provider'
export * from './user-task-data-provider'
export * from './vacation-data-provider'
export * from './payslip-data-provider'
export * from './business-trip-data-provider'
export * from './company-units'
export * from './user-data-provider'
