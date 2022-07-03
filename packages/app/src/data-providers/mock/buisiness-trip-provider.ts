import { IBuisinessTripRequest } from '@kedo-team/data-model'
import { notify } from 'src/decorators/notify'
import { IBuisinessTripDataProvider } from '../interfaces'

export class MockBuisinessTripProvider implements IBuisinessTripDataProvider {
  @notify()
  sendRequest(request: IBuisinessTripRequest) {
    return
  }

}