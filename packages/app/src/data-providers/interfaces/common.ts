import type { ComputedRef, Ref } from 'vue'

export interface IDataProviderResult<T> {
  result: Ref<T> | ComputedRef<T>,
  loading: Ref<boolean>,
  error: Ref<string | null>
}
