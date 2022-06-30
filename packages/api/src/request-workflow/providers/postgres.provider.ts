import { Injectable } from '@nestjs/common'
import { Pool } from 'pg'


@Injectable()
export class PostgresProvider{
    private _pool: Pool;

    constructor() {
        this._pool = new Pool({
          // TODO: изменить на ssl
          host:     process.env.KEDO_DB_HOST,
          database: process.env.KEDO_DB_NAME,
          user:     process.env.KEDO_WF_API_USER_NAME,
          password: process.env.KEDO_WF_API_USER_PASSWORD,
          port:     Number.parseInt(process.env.KEDO_DB_PORT_EXPOSE)
        })
    }

    async query<T>(queryString: string, params: any[]): Promise<T> {
        await this._pool.query('BEGIN')
        const { rows } = await this._pool.query(queryString, params)
        await this._pool.query('COMMIT')

        // returning the first result of the first field
        // because pg shaping the result
        const retValue = rows[0][Object.keys(rows[0])[0]]
        
        // TODO: Дичайший хак из-за того что хранимки возвращают хуй знает что. Кто json, кто dataset с json
        if (retValue.length > 0)
            return retValue[0]
        else return retValue;
    }

    async pureQuery(queryString: string, params: any[]): Promise<any> {
        return await this._pool.query(queryString, params);
    }
}
