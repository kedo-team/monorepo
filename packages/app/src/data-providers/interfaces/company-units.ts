import type { Ref } from 'vue'
import { IDataProviderResult } from './common'
import type { ICompanyUnit, ICompanyUnitInfo } from '@kedo-team/data-model'

export interface ICompanyUnitDataProvider {
  getUnits(): IDataProviderResult<ICompanyUnit[]>
  getUnitInfo(unitId: Ref<string> | string): IDataProviderResult<ICompanyUnitInfo>
}