import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
// import { AppController } from './app.controller'
// import { AppService } from './app.service';
import { ConfigModule } from './config/config.module'
import { KeycloakConfigService } from './config/keycloak-config.service'
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard, KeycloakConnectModule,
  ResourceGuard,
  RoleGuard
} from 'nest-keycloak-connect';
import { ConfigModule as AppConfigModule, ConfigService } from '@nestjs/config'
import { PostgraphileModule } from './postgraphile/posgraphile.module';
import { RequestWorkflowModule } from './request-workflow/request-workflow.module';


@Module({
  imports: [ 
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule]
    }),
    //AppConfigModule.forRoot({isGlobal: true}),
    CatsModule,
    PostgraphileModule,
    RequestWorkflowModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard 
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard 
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard 
    }
  ],

  exports: []

})
export class AppModule {}
