import { reactiveFuncWrapper } from './reactive-func-wrapper'
import type { MaybeRef } from '../interfaces';
import type { IUserDataProvider } from '../interfaces/user-data-provider'
import users from './data/users'

export class MockUserDataProvider implements IUserDataProvider {

  getUserInfo = reactiveFuncWrapper(
    (id: MaybeRef<string>) => {
      return users.find(u => u.id == id)
    }
  )

}