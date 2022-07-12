// it's from vueuse collection. I don't want to bring here whole dependecie
// docs: https://github.com/vueuse/vueuse/blob/main/packages/shared/reactify/index.ts

import { ref, computed, unref } from 'vue'
import type { IDataProviderResult,  MaybeRef } from '../interfaces'

// export type Reactify<T> = T extends (...args: infer A) => infer R
//   ? (...args: { [K in keyof A]: MaybeRef<A[K]> }) => ComputedRef<R>
//   : never

/**
 * Converts plain function into a reactive function.
 * The converted function accepts refs as it's arguments
 * and returns a ComputedRef, with proper typing.
 *
 * @param fn - Source function
//  */
// export function reactify<T extends Function>(fn: T): Reactify<T> {
//   return function (this: any, ...args: any[]) {
//     return computed(() => fn.apply(this, args.map(i => unref(i))))
//   } as Reactify<T>
// }
/********************************************/
export type ReactivityFunc<T> = T extends (...args: infer A) => infer R  ?
                                (...args: { [K in keyof A]: MaybeRef<A[K]> }) => IDataProviderResult<R>
                                : never

// eslint-disable-next-line
export function reactiveFuncWrapper<T extends Function>(fn: T): ReactivityFunc<T> {
  return function (this: any, ...args: any[]) {
    const loading = ref(false),
          error = ref<string>(null)
    const result = computed(() => {
      loading.value = true
      const retValue = fn.apply(this, args.map(i => unref(i)))
      loading.value = false
      return retValue
    })

    return {
      result,
      loading,
      error
    }
  } as ReactivityFunc<T>
}
