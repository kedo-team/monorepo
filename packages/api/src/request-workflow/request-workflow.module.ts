import { Module } from "@nestjs/common";
import { WebController } from './web.controller'
import { RequestController } from './request.controller.service'
import { PostgresProvider } from "./providers/postgres.provider"

@Module({
    controllers: [ WebController ],
    providers:   [ RequestController, 
                   PostgresProvider ]
})
export class RequestWorkflowModule {}