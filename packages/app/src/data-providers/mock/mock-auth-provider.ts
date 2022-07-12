import { IUserViewModel } from 'src/view-model';
import { computed } from 'vue'
import { IAuthProvider } from '../interfaces';
import anton from './data/user-anton'

export class MockAuthProvider implements IAuthProvider {
  init(): Promise<void> {
    return
  }
  getJwt(): string {
    return 'abcdfr'
  }
  getSubject(): string {
    return 'mock-id'
  }

  public currentUser = computed(
    () => anton
  )
}