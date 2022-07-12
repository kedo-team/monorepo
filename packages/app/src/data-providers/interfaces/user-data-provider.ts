import type { IUserViewModel } from 'src/view-model'
import type { IDataProviderResult, MaybeRef } from './'

export interface IUserDataProvider {
  getUserInfo(id: MaybeRef<string>): IDataProviderResult<IUserViewModel>
}