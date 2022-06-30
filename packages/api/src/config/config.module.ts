import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak-config.service'
// import { ConfigModule as AppConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [KeycloakConfigService],
  // imports: [AppConfigModule.forRoot()],
  exports: [KeycloakConfigService],
})
export class ConfigModule {}