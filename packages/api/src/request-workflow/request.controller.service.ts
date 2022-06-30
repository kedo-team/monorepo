import { Injectable } from '@nestjs/common'
import { IRequest } from '@kedo-team/data-model'
import { PostgresProvider } from './providers/postgres.provider'

@Injectable()
export class RequestController {
  constructor(private _db: PostgresProvider) {}

  async create( request: IRequest): Promise<IRequest> {
    console.log('sending to db', request)
    return await this._db.query<IRequest>('SELECT * FROM app_private.createRequestWorkflow($1)',
                                                  [request])
  }
}
