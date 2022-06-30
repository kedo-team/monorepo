import { IRequest } from '@kedo-team/data-model'
import { Body, Controller, Post, Logger } from '@nestjs/common'
import { Public, AuthenticatedUser } from 'nest-keycloak-connect'
import { RequestController } from './request.controller.service'
import { UserDTO } from './dto/user.dto'


@Controller('request')
export class WebController {
    constructor(private _wfController: RequestController) {}

    private readonly logger = new Logger(WebController.name)

    @Post()
    @Public(false)
    async create(@Body() body: IRequest, @AuthenticatedUser() user: UserDTO) {
        const reqObj:IRequest = {...body, ...{ownerUserId: user.sub}}
        const instance = await this._wfController.create(reqObj)
        return { status: 'ok',
                 request: instance
               }
    }
}
