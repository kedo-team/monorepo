import { computed, ref } from 'vue'
import { IAuthProvider } from '../interfaces';
import cfg from 'src/config'

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


  private _id = ref('ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47')
  public get id() {
    return this._id.value
  }
  public set id(newId: string) {
    this._id.value = newId
  }


  public current = computed(()=> {
      const user = cfg.providers.user.getUserInfo(this._id).result
      return user
    }
  )
}