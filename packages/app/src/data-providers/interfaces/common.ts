import type { Ref } from 'vue'

export interface IDataProviderResult<T> {
  result: Ref<T>,
  loading: Ref<boolean>,
  error: Ref<string | null>
}
